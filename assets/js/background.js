import * as THREE from 'three';

// ── Scene Setup ──
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

const container = document.getElementById('bg-canvas');
container.appendChild(renderer.domElement);

// ── Constants ──
const PARTICLE_COUNT = 1800;
const CLOUD_RADIUS = 5.5;
const CLOUD_HEIGHT = 4;

// ── Color Palette ──
const COLORS = [
  new THREE.Color('#2997ff'),  // accent blue
  new THREE.Color('#40a9ff'),  // lighter blue
  new THREE.Color('#7ec8f0'),  // sky blue
  new THREE.Color('#a78bfa'),  // soft purple
  new THREE.Color('#67e8f9'),  // cyan
  new THREE.Color('#ffffff'),  // white
];

// ── Create Particle Geometry ──
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const colors = new Float32Array(PARTICLE_COUNT * 3);
const sizes = new Float32Array(PARTICLE_COUNT);
const phases = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Cloud distribution: clustered in a few spherical groups
  const clusterIdx = Math.floor(Math.random() * 4);
  const cx = (Math.random() - 0.5) * CLOUD_RADIUS * 0.6;
  const cy = (Math.random() - 0.5) * CLOUD_HEIGHT * 0.5;
  const cz = (Math.random() - 0.5) * CLOUD_RADIUS * 0.6;

  // Local cluster offset
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = Math.pow(Math.random(), 1.5) * 2.0;

  positions[i * 3] = cx + Math.sin(phi) * Math.cos(theta) * r;
  positions[i * 3 + 1] = cy + Math.cos(phi) * r * 0.8;
  positions[i * 3 + 2] = cz + Math.sin(phi) * Math.sin(theta) * r;

  // Color: pick from palette with some randomness
  const color = COLORS[Math.floor(Math.random() * COLORS.length)].clone();
  // Vary brightness
  const brightness = 0.6 + Math.random() * 0.4;
  colors[i * 3] = color.r * brightness;
  colors[i * 3 + 1] = color.g * brightness;
  colors[i * 3 + 2] = color.b * brightness;

  // Size: small to medium dots
  sizes[i] = 0.02 + Math.random() * 0.06;

  // Phase for animation
  phases[i] = Math.random() * Math.PI * 2;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

// ── Particle Material ──
const material = new THREE.PointsMaterial({
  size: 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// ── Connection Lines (tech feel: constellation network) ──
// Random subset of lines between nearby particles
const LINE_PARTICLE_COUNT = 400;
const lineIndices = new Set();
while (lineIndices.size < LINE_PARTICLE_COUNT) {
  lineIndices.add(Math.floor(Math.random() * PARTICLE_COUNT));
}
const lineParticles = [...lineIndices];

const linePositions = [];
const lineColors = [];
const CONNECT_DIST = 1.2;

for (let i = 0; i < lineParticles.length; i++) {
  for (let j = i + 1; j < lineParticles.length; j++) {
    const idxA = lineParticles[i];
    const idxB = lineParticles[j];

    const ax = positions[idxA * 3], ay = positions[idxA * 3 + 1], az = positions[idxA * 3 + 2];
    const bx = positions[idxB * 3], by = positions[idxB * 3 + 1], bz = positions[idxB * 3 + 2];

    const dx = ax - bx, dy = ay - by, dz = az - bz;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (dist < CONNECT_DIST && Math.random() < 0.15) {
      linePositions.push(ax, ay, az, bx, by, bz);

      const c1r = colors[idxA * 3], c1g = colors[idxA * 3 + 1], c1b = colors[idxA * 3 + 2];
      const c2r = colors[idxB * 3], c2g = colors[idxB * 3 + 1], c2b = colors[idxB * 3 + 2];
      // Dim lines
      lineColors.push(c1r * 0.4, c1g * 0.4, c1b * 0.4, c2r * 0.4, c2g * 0.4, c2b * 0.4);
    }
  }
}

const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
lineGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));

const lineMat = new THREE.LineBasicMaterial({
  vertexColors: true,
  transparent: true,
  opacity: 0.3,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const lines = new THREE.LineSegments(lineGeo, lineMat);
scene.add(lines);

// ── Center Glow (subtle light orb) ──
const glowGeo = new THREE.SphereGeometry(0.15, 16, 16);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0x2997ff,
  transparent: true,
  opacity: 0.15,
});
const glow = new THREE.Mesh(glowGeo, glowMat);
glow.position.set(0, 0.2, 0);
scene.add(glow);

// ── Mouse Tracking ──
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ── Resize ──
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Animation ──
let time = 0;

function animate() {
  requestAnimationFrame(animate);

  time += 0.003;

  // Smooth mouse follow (slow, subtle)
  target.x += (mouse.x * 0.3 - target.x) * 0.02;
  target.y += (mouse.y * 0.2 - target.y) * 0.02;

  // Camera gentle orbit
  const orbitX = Math.sin(time * 0.08) * 0.4;
  const orbitZ = Math.cos(time * 0.06) * 0.4;
  camera.position.x = target.x + orbitX;
  camera.position.y = 1.5 + target.y + Math.sin(time * 0.05) * 0.1;
  camera.position.z = 8 + orbitZ * 0.3;
  camera.lookAt(0, 0.3, 0);

  // Particle drift (very slow)
  const pos = particles.geometry.attributes.position.array;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const phase = phases[i];
    const drift = 0.0003;
    pos[i3] += Math.sin(time * 0.3 + phase) * drift;
    pos[i3 + 1] += Math.sin(time * 0.2 + phase * 1.3) * drift * 0.5;
    pos[i3 + 2] += Math.cos(time * 0.25 + phase * 0.7) * drift;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // Slow rotation of entire system
  particles.rotation.y = time * 0.015;
  particles.rotation.x = Math.sin(time * 0.01) * 0.05;
  lines.rotation.y = time * 0.015;
  lines.rotation.x = Math.sin(time * 0.01) * 0.05;

  // Pulsing center glow
  glow.material.opacity = 0.1 + Math.sin(time * 0.5) * 0.05;
  glow.scale.setScalar(1 + Math.sin(time * 0.4) * 0.2);

  renderer.render(scene, camera);
}

animate();
