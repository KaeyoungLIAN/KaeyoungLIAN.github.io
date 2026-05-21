import * as THREE from 'three';

// ── Setup ──
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 6);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0d0d0f);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ── Color Palettes ──
const palettes = [
  [0x1a365d, 0x2563eb, 0x2997ff, 0x7dd3fc, 0xffffff],
  [0x1e1b4b, 0x4338ca, 0x6366f1, 0xa78bfa, 0xc4b5fd],
  [0x0f172a, 0x0ea5e9, 0x38bdf8, 0x7dd3fc, 0xe0f2fe],
];

let currentPal = 0;
let nextPal = 1;
let paletteLerp = 0;

function getPaletteColors(idx) {
  return palettes[idx].map(h => new THREE.Color(h));
}

function lerpPalette(t) {
  const a = palettes[currentPal];
  const b = palettes[nextPal];
  const result = [];
  for (let i = 0; i < a.length; i++) {
    const ca = new THREE.Color(a[i]);
    const cb = new THREE.Color(b[i]);
    result.push(ca.lerp(cb, t));
  }
  return result;
}

// ── Particle System ──
const N = 3000;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(N * 3);
const sizes = new Float32Array(N);
const phases = new Float32Array(N);
const origins = new Float32Array(N * 3);

for (let i = 0; i < N; i++) {
  // Spherical distribution with clusters
  const cluster = Math.floor(Math.random() * 6);
  const angleOff = (cluster / 6) * Math.PI * 2 + Math.random() * 0.5;
  const cx = Math.cos(angleOff) * (0.5 + Math.random() * 1.0);
  const cy = (Math.random() - 0.5) * 1.5;
  const cz = Math.sin(angleOff) * (0.5 + Math.random() * 1.0);

  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = Math.pow(Math.random(), 1.3) * 1.8;

  pos[i * 3]     = cx + Math.sin(phi) * Math.cos(theta) * r;
  pos[i * 3 + 1] = cy + Math.cos(phi) * r * 0.6;
  pos[i * 3 + 2] = cz + Math.sin(phi) * Math.sin(theta) * r;

  sizes[i] = 0.02 + Math.random() * 0.08;
  phases[i] = Math.random() * Math.PI * 2;
  origins[i*3] = pos[i*3];
  origins[i*3+1] = pos[i*3+1];
  origins[i*3+2] = pos[i*3+2];
}

geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
geo.setAttribute('origin', new THREE.BufferAttribute(origins, 3));

// ── Custom Shader Material ──
const vertexShader = `
  attribute float size;
  attribute float phase;
  attribute vec3 origin;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;

  // Simplex-like noise approximation
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = hash(i);
    float b = hash(i + vec3(1,0,0));
    float c = hash(i + vec3(0,1,0));
    float d = hash(i + vec3(1,1,0));
    float e = hash(i + vec3(0,0,1));
    float f_ = hash(i + vec3(1,0,1));
    float g = hash(i + vec3(0,1,1));
    float h = hash(i + vec3(1,1,1));
    float ux = mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
    float vx = mix(mix(e,f_,f.x), mix(g,h,f.x), f.y);
    return mix(ux, vx, f.z);
  }

  void main() {
    vec3 p = position;
    float t = uTime * 0.15;

    // Curl-like drift using noise derivatives
    float n = noise(p * 0.5 + t + phase);
    float nx = noise(p * 0.5 + t + phase + vec3(0.3, 0, 0));
    float ny = noise(p * 0.5 + t + phase + vec3(0, 0.3, 0));
    float nz = noise(p * 0.5 + t + phase + vec3(0, 0, 0.3));

    float drift = 0.15;
    p.x += (nx - n) * drift;
    p.y += (ny - n) * drift * 0.5;
    p.z += (nz - n) * drift;

    // Gentle orbital drift
    float orbit = uTime * 0.005;
    float ox = sin(orbit + phase) * 0.08;
    float oy = cos(orbit * 0.7 + phase * 1.3) * 0.04;
    float oz = sin(orbit * 0.8 + phase * 0.7) * 0.08;
    p += vec3(ox, oy, oz);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vec4 projected = projectionMatrix * mvPosition;

    gl_Position = projected;

    // Soft size
    float dist = length(mvPosition.xyz);
    float s = size * uPixelRatio * (8.0 / dist);
    s *= 0.8 + 0.2 * sin(t * 0.5 + phase);
    gl_PointSize = s;

    // Color from distance to center + noise
    float d = length(p) / 3.0;
    float colorMix = smoothstep(0.0, 1.0, d + 0.3 * noise(p * 0.3 + uTime * 0.1));
    vColor = mix(vec3(0.161, 0.592, 1.0), vec3(0.655, 0.545, 0.980), colorMix);
    vColor = mix(vColor, vec3(0.404, 0.910, 0.976), 0.5 * (1.0 - d));
    vColor += 0.1 * vec3(noise(p * 1.5 + uTime * 0.05));
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);

    // Soft glow circle
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 1.5);

    // Bright core
    float core = exp(-dist * dist * 40.0);
    vec3 color = vColor + core * 0.3;

    // Outer glow
    float glow = exp(-dist * dist * 8.0);
    color += vColor * glow * 0.15;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

const uniforms = {
  uTime: { value: 0 },
  uPixelRatio: { value: renderer.getPixelRatio() },
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const points = new THREE.Points(geo, material);
scene.add(points);

// ── Connection Lines ──
const LINE_COUNT = 300;
const lineIdx = new Set();
while (lineIdx.size < LINE_COUNT) lineIdx.add(Math.floor(Math.random() * N));
const arr = [...lineIdx];

const lp = [], lc = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    const a = arr[i], b = arr[j];
    const dx = pos[a*3]-pos[b*3], dy = pos[a*3+1]-pos[b*3+1], dz = pos[a*3+2]-pos[b*3+2];
    if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 0.9) {
      lp.push(pos[a*3], pos[a*3+1], pos[a*3+2], pos[b*3], pos[b*3+1], pos[b*3+2]);
      lc.push(0.161, 0.592, 1.0, 0.404, 0.910, 0.976);
    }
  }
}

const lg = new THREE.BufferGeometry();
lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lp), 3));
lg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lc), 3));
const lm = new THREE.LineBasicMaterial({
  vertexColors: true, transparent: true, opacity: 0.15,
  blending: THREE.AdditiveBlending, depthWrite: false,
});
const lines = new THREE.LineSegments(lg, lm);
scene.add(lines);

// ── Floating Rings ──
for (let i = 0; i < 3; i++) {
  const rg = new THREE.RingGeometry(0.8 + i * 0.4, 0.808 + i * 0.4, 64);
  const rm = new THREE.MeshBasicMaterial({
    color: 0x2997ff, transparent: true, opacity: 0.04 + i * 0.015,
    side: THREE.DoubleSide, depthWrite: false,
  });
  const ring = new THREE.Mesh(rg, rm);
  ring.position.y = (i - 1) * 0.7;
  ring.rotation.x = Math.PI / 2;
  ring.userData = { idx: i };
  scene.add(ring);
}

// ── Mouse ──
const mouse = { x: 0, y: 0 };
const follow = { x: 0, y: 0 };
document.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ── Color rotation ──
setInterval(() => {
  currentPal = nextPal;
  nextPal = (nextPal + 1) % palettes.length;
  paletteLerp = 0;
}, 20000);

// ── Resize ──
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.uPixelRatio.value = renderer.getPixelRatio();
});

// ── Animate ──
let t = 0;

function animate() {
  requestAnimationFrame(animate);
  t += 0.016; // ~60fps in seconds

  uniforms.uTime.value = t;

  // Mouse follow
  follow.x += (mouse.x * 0.2 - follow.x) * 0.012;
  follow.y += (mouse.y * 0.15 - follow.y) * 0.012;

  // Camera
  const ox = Math.sin(t * 0.05) * 0.3;
  const oz = Math.cos(t * 0.035) * 0.3;
  camera.position.x = follow.x + ox;
  camera.position.y = 0.5 + follow.y * 0.4 + Math.sin(t * 0.03) * 0.06;
  camera.position.z = 6 + oz * 0.15;
  camera.lookAt(0, 0, 0);

  // Slow rotation
  points.rotation.y = t * 0.01;
  points.rotation.x = Math.sin(t * 0.006) * 0.03;
  lines.rotation.y = t * 0.01;
  lines.rotation.x = Math.sin(t * 0.006) * 0.03;

  // Rings
  scene.children.forEach(child => {
    if (child.isMesh && child.geometry.type === 'RingGeometry') {
      const i = child.userData.idx || 0;
      child.rotation.z = t * (0.04 + i * 0.015);
      child.rotation.x = Math.PI / 2 + Math.sin(t * 0.025 + i) * 0.12;
    }
  });

  renderer.render(scene, camera);
}

animate();
