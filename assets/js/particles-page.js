// ── Scene Setup ──
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.8, 7);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0d0d0f);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ── Constants ──
const N = 2200;
const RADIUS = 4.5;
const HEIGHT = 3.5;

// ── Palette ──
const PALETTE = [
  [0.161, 0.592, 1.0],    // #2997ff
  [0.251, 0.663, 1.0],    // #40a9ff
  [0.494, 0.784, 0.941],  // #7ec8f0
  [0.655, 0.545, 0.980],  // #a78bfa
  [0.404, 0.910, 0.976],  // #67e8f9
  [1.0,   1.0,   1.0],    // white
];

// ── Geometry ──
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(N * 3);
const col = new Float32Array(N * 3);
const siz = new Float32Array(N);
const phs = new Float32Array(N);

for (let i = 0; i < N; i++) {
  const cluster = Math.floor(Math.random() * 5);
  const angleOffset = (cluster / 5) * Math.PI * 2;
  const radiusOffset = 0.5 + Math.random() * 1.5;

  const theta = angleOffset + Math.random() * 1.2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = Math.pow(Math.random(), 1.2) * radiusOffset;

  const cx = Math.cos(angleOffset) * 0.8;
  const cy = (Math.random() - 0.5) * 0.5;
  const cz = Math.sin(angleOffset) * 0.8;

  pos[i * 3]     = cx + Math.sin(phi) * Math.cos(theta) * r * 1.2;
  pos[i * 3 + 1] = cy + Math.cos(phi) * r * 0.7;
  pos[i * 3 + 2] = cz + Math.sin(phi) * Math.sin(theta) * r * 1.2;

  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const bt = 0.55 + Math.random() * 0.45;
  col[i * 3]     = c[0] * bt;
  col[i * 3 + 1] = c[1] * bt;
  col[i * 3 + 2] = c[2] * bt;

  siz[i] = 0.025 + Math.random() * 0.065;
  phs[i] = Math.random() * Math.PI * 2;
}

geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

const mat = new THREE.PointsMaterial({
  size: 0.09,
  vertexColors: true,
  transparent: true,
  opacity: 0.95,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
});

const points = new THREE.Points(geo, mat);
scene.add(points);

// ── Connection lines ──
const LINE_N = 350;
const lineIdx = new Set();
while (lineIdx.size < LINE_N) lineIdx.add(Math.floor(Math.random() * N));
const arr = [...lineIdx];

const lp = [], lc = [];
const MAX_DIST = 1.0;

for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    const a = arr[i], b = arr[j];
    const dx = pos[a*3]-pos[b*3], dy = pos[a*3+1]-pos[b*3+1], dz = pos[a*3+2]-pos[b*3+2];
    const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
    if (d < MAX_DIST) {
      lp.push(pos[a*3], pos[a*3+1], pos[a*3+2], pos[b*3], pos[b*3+1], pos[b*3+2]);
      const w = 0.3;
      lc.push(col[a*3]*w, col[a*3+1]*w, col[a*3+2]*w, col[b*3]*w, col[b*3+1]*w, col[b*3+2]*w);
    }
  }
}

const lg = new THREE.BufferGeometry();
lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lp), 3));
lg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lc), 3));
const lm = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false });
const lines = new THREE.LineSegments(lg, lm);
scene.add(lines);

// ── Center glow ──
const gg = new THREE.SphereGeometry(0.12, 16, 16);
const gm = new THREE.MeshBasicMaterial({ color: 0x2997ff, transparent: true, opacity: 0.12 });
const glow = new THREE.Mesh(gg, gm);
scene.add(glow);

// ── Floating tech rings ──
function createRing(radius, yPos, color, opacity) {
  const rg = new THREE.RingGeometry(radius - 0.008, radius, 64);
  const rm = new THREE.MeshBasicMaterial({
    color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false,
  });
  const ring = new THREE.Mesh(rg, rm);
  ring.position.y = yPos;
  ring.rotation.x = Math.PI / 2;
  return ring;
}

const rings = [];
for (let i = 0; i < 4; i++) {
  const r = createRing(1.2 + i * 0.5, (i - 1.5) * 0.8, 0x2997ff, 0.06 + i * 0.02);
  scene.add(r);
  rings.push(r);
}

// ── Mouse ──
const mouse = { x: 0, y: 0 };
const follow = { x: 0, y: 0 };
document.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ── Resize ──
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Animate ──
let t = 0;
const posAttr = points.geometry.attributes.position;
const origPos = new Float32Array(posAttr.array);

function animate() {
  requestAnimationFrame(animate);
  t += 0.002;

  follow.x += (mouse.x * 0.25 - follow.x) * 0.015;
  follow.y += (mouse.y * 0.2 - follow.y) * 0.015;

  // Camera gentle orbit
  const ox = Math.sin(t * 0.06) * 0.3;
  const oz = Math.cos(t * 0.04) * 0.3;
  camera.position.x = follow.x + ox;
  camera.position.y = 0.8 + follow.y * 0.5 + Math.sin(t * 0.04) * 0.08;
  camera.position.z = 7 + oz * 0.2;
  camera.lookAt(0, 0, 0);

  // Particle drift
  const p = posAttr.array;
  for (let i = 0; i < N; i++) {
    const i3 = i * 3;
    const phase = phs[i];
    const drift = 0.00025;
    p[i3]     = origPos[i3]     + Math.sin(t * 0.2 + phase) * drift;
    p[i3 + 1] = origPos[i3 + 1] + Math.sin(t * 0.15 + phase * 1.3) * drift * 0.5;
    p[i3 + 2] = origPos[i3 + 2] + Math.cos(t * 0.18 + phase * 0.7) * drift;
  }
  posAttr.needsUpdate = true;

  // Slow rotation
  points.rotation.y = t * 0.012;
  points.rotation.x = Math.sin(t * 0.008) * 0.04;
  lines.rotation.y = t * 0.012;
  lines.rotation.x = Math.sin(t * 0.008) * 0.04;

  // Rings rotation
  rings.forEach((r, i) => {
    r.rotation.z = t * (0.05 + i * 0.02);
    r.rotation.x = Math.PI / 2 + Math.sin(t * 0.03 + i) * 0.15;
  });

  // Glow pulse
  glow.material.opacity = 0.08 + Math.sin(t * 0.4) * 0.06;
  glow.scale.setScalar(1 + Math.sin(t * 0.3) * 0.25);

  renderer.render(scene, camera);
}

animate();
