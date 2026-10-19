import * as THREE from 'three'
import { dustVertex, irisVertex, pointFragment } from './shaders'

const PUPIL = 0.62
const OUTER = 2.6
const FIBRES = 240
const IRIS_POINTS = 18000
const DUST_POINTS = 900

// Colour along a fibre, from the pupil edge (0) to the limbal ring (1).
const STOPS: [number, string][] = [
  [0, '#2a238f'],
  [0.12, '#4b4ee8'],
  [0.34, '#8f8cf8'],
  [0.46, '#6c63f0'],
  [0.66, '#5aa9f7'],
  [0.88, '#b9c6f5'],
  [1, '#dfe4f2'],
]

// The shaders write colours straight to the screen, so keep the hex values as-is.
const raw = (hex: string) => new THREE.Color().setStyle(hex, THREE.LinearSRGBColorSpace)
const stopColors = STOPS.map(([t, hex]) => [t, raw(hex)] as const)

function colorAt(t: number, out: THREE.Color) {
  for (let i = 1; i < stopColors.length; i++) {
    const [t1, c1] = stopColors[i]
    if (t <= t1) {
      const [t0, c0] = stopColors[i - 1]
      return out.copy(c0).lerp(c1, (t - t0) / (t1 - t0))
    }
  }
  return out.copy(stopColors[stopColors.length - 1][1])
}

function buildIris() {
  const t = new Float32Array(IRIS_POINTS)
  const angle = new Float32Array(IRIS_POINTS)
  const seed = new Float32Array(IRIS_POINTS)
  const color = new Float32Array(IRIS_POINTS * 3)
  const c = new THREE.Color()
  for (let i = 0; i < IRIS_POINTS; i++) {
    const fibre = Math.floor(Math.random() * FIBRES)
    // Most points sit on fibres; a denser band near 0.38 forms the collarette.
    const collarette = Math.random() < 0.18
    const ti = collarette ? 0.34 + (Math.random() - 0.5) * 0.1 : Math.pow(Math.random(), 0.85)
    t[i] = ti
    angle[i] = (fibre / FIBRES) * Math.PI * 2 + (Math.random() - 0.5) * (collarette ? 0.05 : 0.014)
    seed[i] = Math.random()
    colorAt(Math.min(1, Math.max(0, ti + (Math.random() - 0.5) * 0.08)), c)
    if (Math.random() < 0.08) c.lerp(raw('#a5b4fc'), 0.6)
    c.toArray(color, i * 3)
  }
  const geo = new THREE.BufferGeometry()
  // `position` is required by three.js; the shader computes the real one.
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(IRIS_POINTS * 3), 3))
  geo.setAttribute('aT', new THREE.BufferAttribute(t, 1))
  geo.setAttribute('aAngle', new THREE.BufferAttribute(angle, 1))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
  geo.setAttribute('aColor', new THREE.BufferAttribute(color, 3))
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), OUTER * 1.6)
  return geo
}

function buildDust() {
  const pos = new Float32Array(DUST_POINTS * 3)
  const seed = new Float32Array(DUST_POINTS)
  for (let i = 0; i < DUST_POINTS; i++) {
    const r = 3.2 + Math.random() * 2.6
    const a = Math.random() * Math.PI * 2
    pos.set([Math.cos(a) * r, Math.sin(a) * r * 0.8, (Math.random() - 0.5) * 4], i * 3)
    seed[i] = Math.random()
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
  return geo
}

function orbit(radius: number, tilt: THREE.Euler, dotColor: string) {
  const g = new THREE.Group()
  g.rotation.copy(tilt)
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(radius - 0.006, radius + 0.006, 160),
    new THREE.MeshBasicMaterial({ color: '#0b1220', transparent: true, opacity: 0.08, side: THREE.DoubleSide }),
  )
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshBasicMaterial({ color: dotColor }))
  dot.position.x = radius
  const spinner = new THREE.Group()
  spinner.add(dot)
  g.add(ring, spinner)
  return { group: g, spinner }
}

/**
 * A particle iris that watches the pointer. Owns its renderer and render loop;
 * call `dispose()` when the canvas goes away.
 */
export class Iris {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  private root = new THREE.Group()
  private eye = new THREE.Group()
  private irisMat: THREE.ShaderMaterial
  private dustMat: THREE.ShaderMaterial
  private pupil: THREE.Mesh
  private rim: THREE.Mesh
  private glints = new THREE.Group()
  private orbits: { group: THREE.Group; spinner: THREE.Group }[]
  private clock = new THREE.Clock()
  private target = new THREE.Vector2()
  private look = new THREE.Vector2()
  private pulse = 0
  private lastPointer = -Infinity
  private scroll = 0
  private running = false
  private canvas: HTMLCanvasElement
  private reduced: boolean
  /** Camera distance; larger shows the eye smaller within the canvas. */
  private distance: number

  /**
   * `minimal` keeps only the particle iris and faint rings (no pupil, glints or
   * orbiting dots), for use as a quiet background behind text.
   */
  constructor(canvas: HTMLCanvasElement, { reduced = false, distance = 9.5, minimal = false } = {}) {
    this.canvas = canvas
    this.reduced = reduced
    this.distance = distance
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.camera.position.z = distance

    const shared = {
      transparent: true,
      depthWrite: false,
      fragmentShader: pointFragment,
    }
    this.irisMat = new THREE.ShaderMaterial({
      ...shared,
      vertexShader: irisVertex,
      uniforms: {
        uTime: { value: 0 },
        uPupil: { value: PUPIL },
        uOuter: { value: OUTER },
        uSize: { value: 24 },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
      },
    })
    this.dustMat = new THREE.ShaderMaterial({
      ...shared,
      vertexShader: dustVertex,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30 },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
      },
    })

    this.pupil = new THREE.Mesh(new THREE.CircleGeometry(1, 64), new THREE.MeshBasicMaterial({ color: '#0b1220' }))
    this.pupil.position.z = -0.01
    this.rim = new THREE.Mesh(
      new THREE.RingGeometry(1, 1.045, 96),
      new THREE.MeshBasicMaterial({ color: '#4b4ee8', transparent: true, opacity: 0.5 }),
    )
    const glint = (r: number, x: number, y: number, opacity: number) => {
      const m = new THREE.Mesh(
        new THREE.CircleGeometry(r, 32),
        new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity }),
      )
      m.position.set(x, y, 0.2)
      return m
    }
    this.glints.add(glint(0.16, 0.34, 0.36, 0.95), glint(0.07, 0.58, 0.12, 0.7))

    this.eye.add(new THREE.Points(buildIris(), this.irisMat))
    if (!minimal) this.eye.add(this.pupil, this.rim, this.glints)

    this.orbits = [
      orbit(3.05, new THREE.Euler(1.15, 0.2, 0), '#4b4ee8'),
      orbit(3.45, new THREE.Euler(-0.9, 0.5, 0.4), '#5aa9f7'),
    ]
    if (minimal) this.orbits.forEach((o) => (o.spinner.visible = false))
    this.root.add(this.eye, new THREE.Points(buildDust(), this.dustMat), ...this.orbits.map((o) => o.group))
    this.scene.add(this.root)

    this.resize()
  }

  /** Pointer position relative to the eye, roughly -1..1 on each axis. */
  setPointer(x: number, y: number) {
    this.target.set(THREE.MathUtils.clamp(x, -1.4, 1.4), THREE.MathUtils.clamp(y, -1.4, 1.4))
    this.lastPointer = performance.now()
  }

  /** 0 at the top of the hero, 1 once it has scrolled out. */
  setScroll(p: number) {
    this.scroll = p
    if (!this.running) this.render()
  }

  /** Startle: the pupil snaps small, then relaxes. */
  blink() {
    this.pulse = 1
  }

  resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    // Keep the whole iris and its orbits in frame on narrow canvases.
    this.camera.position.z = w / h < 1 ? this.distance / (w / h) : this.distance
    this.camera.updateProjectionMatrix()
    this.render()
  }

  start() {
    if (this.running || this.reduced) return
    this.running = true
    this.clock.start()
    this.renderer.setAnimationLoop(() => this.render())
  }

  stop() {
    this.running = false
    this.renderer.setAnimationLoop(null)
  }

  private render() {
    const time = this.reduced ? 12 : this.clock.getElapsedTime()
    this.irisMat.uniforms.uTime.value = time
    this.dustMat.uniforms.uTime.value = time

    // With no pointer around (touch screens, or a still mouse) the eye wanders on its own.
    if (performance.now() - this.lastPointer > 2500) {
      this.target.set(Math.sin(time * 0.45) * 0.7, Math.sin(time * 0.31) * 0.45)
    }
    this.look.lerp(this.target, 0.06)
    this.pulse *= 0.94

    // The pupil breathes, widens as the page scrolls, and contracts on a startle.
    const pupil = PUPIL * (1 + Math.sin(time * 0.9) * 0.05 + this.scroll * 0.7 - this.pulse * 0.4)
    this.irisMat.uniforms.uPupil.value = pupil
    this.pupil.scale.setScalar(pupil)
    this.rim.scale.setScalar(pupil)
    this.glints.position.set(this.look.x * 0.08, this.look.y * 0.08, 0)

    // The eye turns to follow the pointer.
    this.eye.rotation.set(-this.look.y * 0.38, this.look.x * 0.48, 0)
    this.eye.position.set(this.look.x * 0.22, this.look.y * 0.16, 0)

    this.root.rotation.z = Math.sin(time * 0.15) * 0.04
    this.root.scale.setScalar(1 + this.scroll * 0.35)
    this.orbits.forEach((o, i) => {
      o.spinner.rotation.z = time * (i ? -0.22 : 0.3)
    })

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.stop()
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose()
        ;(obj.material as THREE.Material).dispose()
      }
    })
    this.renderer.dispose()
  }
}
