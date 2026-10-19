import * as THREE from 'three'

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vHeight;
  varying float vFade;

  void main() {
    vec3 p = position;
    // Layered sine swells plus a bump that rises under the pointer.
    float h = sin(p.x * 0.45 + uTime * 0.9) * 0.45
            + sin(p.z * 0.6 + uTime * 0.7) * 0.35
            + sin((p.x + p.z) * 0.25 + uTime * 0.5) * 0.4;
    float d = distance(p.xz, uPointer);
    h += exp(-d * d * 0.12) * 1.1;
    p.y += h;
    vHeight = h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + aSeed * 1.6) * uPixelRatio * (14.0 / -mv.z);
    // Fade toward the far edge and the sides so the field has no hard border.
    vFade = smoothstep(-26.0, -8.0, mv.z) * (1.0 - smoothstep(10.0, 16.0, abs(p.x)));
  }
`

const fragment = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform float uOpacity;
  varying float vHeight;
  varying float vFade;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.1, r);
    vec3 color = mix(uLow, uHigh, clamp(vHeight * 0.45 + 0.5, 0.0, 1.0));
    gl_FragColor = vec4(color, soft * vFade * uOpacity);
  }
`

/**
 * A field of particles rolling like a 3D wave, with a swell that follows the pointer.
 * Owns its renderer and loop; call `dispose()` when the canvas goes away.
 */
export class Wave {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  private material: THREE.ShaderMaterial
  private points: THREE.Points
  private clock = new THREE.Clock(false)
  private pointer = new THREE.Vector2(0, 100)
  private target = new THREE.Vector2(0, 100)
  private running = false
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement, { reduced = false, low = '#4b4ee8', high = '#5aa9f7', opacity = 0.9 } = {}) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const cols = 110
    const rows = 60
    const positions = new Float32Array(cols * rows * 3)
    const seeds = new Float32Array(cols * rows)
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const k = i * rows + j
        positions[k * 3] = (i / (cols - 1) - 0.5) * 32
        positions[k * 3 + 1] = 0
        positions[k * 3 + 2] = -(j / (rows - 1)) * 22 + 4
        seeds[k] = Math.random()
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: reduced ? 2 : 0 },
        uPointer: { value: this.pointer },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
        uLow: { value: new THREE.Color(low) },
        uHigh: { value: new THREE.Color(high) },
        uOpacity: { value: opacity },
      },
    })
    this.points = new THREE.Points(geometry, this.material)
    this.scene.add(this.points)

    this.camera.position.set(0, 4.2, 9)
    this.camera.lookAt(0, 0, -6)
    this.resize()
  }

  /** Pointer in -1..1 canvas coordinates; moves the swell across the field. */
  setPointer(x: number, y: number) {
    this.target.set(x * 12, -4 - y * 8)
  }

  resize() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.render()
  }

  start() {
    if (this.running) return
    this.running = true
    this.clock.start()
    this.renderer.setAnimationLoop(() => this.render())
  }

  stop() {
    this.running = false
    this.clock.stop()
    this.renderer.setAnimationLoop(null)
  }

  private render() {
    if (this.running) {
      this.material.uniforms.uTime.value += Math.min(this.clock.getDelta(), 0.05)
      this.pointer.lerp(this.target, 0.06)
    }
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.stop()
    this.points.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }
}
