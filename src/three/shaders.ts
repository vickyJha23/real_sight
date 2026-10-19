// Iris fibres: each point keeps its normalised position along a fibre (aT), so the
// pupil can dilate and contract without the outer edge of the iris moving.
export const irisVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPupil;
  uniform float uOuter;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aT;
  attribute float aAngle;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float r = mix(uPupil, uOuter, aT);
    float wave = sin(aAngle * 9.0 + uTime * 0.7 + aSeed * 6.2831) * 0.03 * aT;
    float angle = aAngle + uTime * 0.025 * (1.0 - aT) + sin(uTime * 0.5 + aSeed * 12.0) * 0.004;
    float z = (aSeed - 0.5) * 0.35 * aT + sin(uTime * 0.9 + aSeed * 30.0) * 0.035;
    vec3 pos = vec3(cos(angle) * (r + wave), sin(angle) * (r + wave), z);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aSeed * 0.9) / -mv.z;

    float twinkle = 0.7 + 0.3 * sin(uTime * 1.6 + aSeed * 40.0);
    vColor = aColor;
    vAlpha = twinkle * mix(1.0, 0.55, smoothstep(0.9, 1.0, aT));
  }
`

export const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.3 + aSeed * 20.0) * 0.12;
    pos.x += cos(uTime * 0.25 + aSeed * 14.0) * 0.12;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.4 + aSeed) / -mv.z;
    vColor = vec3(0.29, 0.31, 0.91);
    vAlpha = 0.14 + 0.08 * sin(uTime * 0.8 + aSeed * 50.0);
  }
`

export const pointFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.12, d) * vAlpha);
  }
`
