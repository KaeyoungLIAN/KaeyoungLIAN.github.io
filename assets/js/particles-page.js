(function() {
'use strict';

// ── Scene ──
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 6);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0d0d0f);
document.getElementById('c').appendChild(renderer.domElement);

var dpr = renderer.getPixelRatio();

// ── Particle Variables ──
var N = 3000;
var geometry = new THREE.BufferGeometry();
var positions = new Float32Array(N * 3);
var sizes = new Float32Array(N);
var phases = new Float32Array(N);
var origins = new Float32Array(N * 3);

for (var i = 0; i < N; i++) {
  var cluster = Math.floor(Math.random() * 6);
  var angleOff = (cluster / 6) * Math.PI * 2 + Math.random() * 0.5;
  var cx = Math.cos(angleOff) * (0.5 + Math.random());
  var cy = (Math.random() - 0.5) * 1.5;
  var cz = Math.sin(angleOff) * (0.5 + Math.random());

  var theta = Math.random() * Math.PI * 2;
  var phi = Math.acos(2 * Math.random() - 1);
  var r = Math.pow(Math.random(), 1.3) * 1.8;

  positions[i*3]   = cx + Math.sin(phi) * Math.cos(theta) * r;
  positions[i*3+1] = cy + Math.cos(phi) * r * 0.6;
  positions[i*3+2] = cz + Math.sin(phi) * Math.sin(theta) * r;

  sizes[i] = 0.02 + Math.random() * 0.08;
  phases[i] = Math.random() * Math.PI * 2;
  origins[i*3] = positions[i*3];
  origins[i*3+1] = positions[i*3+1];
  origins[i*3+2] = positions[i*3+2];
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

// ── Shader Material ──
var vertexShader = [
  'attribute float size;',
  'attribute float phase;',
  '',
  'uniform float uTime;',
  'uniform float uDpr;',
  '',
  'varying vec3 vColor;',
  '',
  'float hash(vec3 p) {',
  '  p = fract(p * 0.3183099 + 0.1);',
  '  p *= 17.0;',
  '  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));',
  '}',
  '',
  'float noise3d(vec3 p) {',
  '  vec3 i = floor(p);',
  '  vec3 f = fract(p);',
  '  f = f*f*(3.0-2.0*f);',
  '  float a = hash(i);',
  '  float b = hash(i + vec3(1,0,0));',
  '  float c = hash(i + vec3(0,1,0));',
  '  float d = hash(i + vec3(1,1,0));',
  '  float e = hash(i + vec3(0,0,1));',
  '  float f_ = hash(i + vec3(1,0,1));',
  '  float g = hash(i + vec3(0,1,1));',
  '  float h = hash(i + vec3(1,1,1));',
  '  return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y), mix(mix(e,f_,f.x), mix(g,h,f.x), f.y), f.z);',
  '}',
  '',
  'void main() {',
  '  vec3 p = position;',
  '  float t = uTime * 0.15;',
  '',
  '  float n  = noise3d(p * 0.5 + t + phase);',
  '  float nx = noise3d(p * 0.5 + t + phase + vec3(0.3,0,0));',
  '  float ny = noise3d(p * 0.5 + t + phase + vec3(0,0.3,0));',
  '  float nz = noise3d(p * 0.5 + t + phase + vec3(0,0,0.3));',
  '',
  '  float drift = 0.15;',
  '  p.x += (nx - n) * drift;',
  '  p.y += (ny - n) * drift * 0.5;',
  '  p.z += (nz - n) * drift;',
  '',
  '  float orbit = uTime * 0.005;',
  '  p.x += sin(orbit + phase) * 0.08;',
  '  p.y += cos(orbit * 0.7 + phase * 1.3) * 0.04;',
  '  p.z += sin(orbit * 0.8 + phase * 0.7) * 0.08;',
  '',
  '  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);',
  '  gl_Position = projectionMatrix * mvPosition;',
  '',
  '  float dist = length(mvPosition.xyz);',
  '  float s = size * uDpr * (8.0 / dist);',
  '  s *= 0.8 + 0.2 * sin(t * 0.5 + phase);',
  '  gl_PointSize = s;',
  '',
  '  float d = length(p) / 3.0;',
  '  float cm = smoothstep(0.0, 1.0, d + 0.3 * noise3d(p * 0.3 + uTime * 0.1));',
  '  vColor = mix(vec3(0.161,0.592,1.0), vec3(0.655,0.545,0.980), cm);',
  '  vColor = mix(vColor, vec3(0.404,0.910,0.976), 0.5*(1.0-d));',
  '  vColor += 0.1 * noise3d(p * 1.5 + uTime * 0.05);',
  '}'
].join('\n');

var fragmentShader = [
  'varying vec3 vColor;',
  'void main() {',
  '  vec2 c = gl_PointCoord - 0.5;',
  '  float d = length(c);',
  '  float alpha = 1.0 - smoothstep(0.0, 0.5, d);',
  '  alpha = pow(alpha, 1.5);',
  '  float core = exp(-d*d*40.0);',
  '  vec3 color = vColor + core * 0.3;',
  '  float glow = exp(-d*d*8.0);',
  '  color += vColor * glow * 0.15;',
  '  if (alpha < 0.01) discard;',
  '  gl_FragColor = vec4(color, alpha);',
  '}'
].join('\n');

var uniforms = {
  uTime: { value: 0 },
  uDpr: { value: dpr },
};

var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

var points = new THREE.Points(geometry, material);
scene.add(points);

// ── Connection Lines ──
(function() {
  var count = 300;
  var idxSet = new Set();
  while (idxSet.size < count) idxSet.add(Math.floor(Math.random() * N));
  var arr = Array.from(idxSet);
  var lp = [], lc = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i+1; j < arr.length; j++) {
      var a = arr[i], b = arr[j];
      var dx = positions[a*3] - positions[b*3];
      var dy = positions[a*3+1] - positions[b*3+1];
      var dz = positions[a*3+2] - positions[b*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 0.9) {
        lp.push(positions[a*3], positions[a*3+1], positions[a*3+2],
                positions[b*3], positions[b*3+1], positions[b*3+2]);
        lc.push(0.161, 0.592, 1.0, 0.404, 0.910, 0.976);
      }
    }
  }
  if (lp.length > 0) {
    var lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lp), 3));
    lg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lc), 3));
    var lm = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.15,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    var lines = new THREE.LineSegments(lg, lm);
    lines.name = 'lines';
    scene.add(lines);
  }
})();

// ── Rings ──
for (var i = 0; i < 3; i++) {
  var rg = new THREE.RingGeometry(0.8+i*0.4, 0.808+i*0.4, 64);
  var rm = new THREE.MeshBasicMaterial({
    color: 0x2997ff, transparent: true, opacity: 0.04+i*0.015,
    side: THREE.DoubleSide, depthWrite: false,
  });
  var ring = new THREE.Mesh(rg, rm);
  ring.position.y = (i-1)*0.7;
  ring.rotation.x = Math.PI/2;
  ring._idx = i;
  scene.add(ring);
}

// ── Mouse ──
var mouseX = 0, mouseY = 0;
var followX = 0, followY = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ── Resize ──
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Animate ──
var time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.016;

  uniforms.uTime.value = time;

  followX += (mouseX * 0.2 - followX) * 0.012;
  followY += (mouseY * 0.15 - followY) * 0.012;

  var ox = Math.sin(time * 0.05) * 0.3;
  var oz = Math.cos(time * 0.035) * 0.3;
  camera.position.x = followX + ox;
  camera.position.y = 0.5 + followY * 0.4 + Math.sin(time * 0.03) * 0.06;
  camera.position.z = 6 + oz * 0.15;
  camera.lookAt(0, 0, 0);

  points.rotation.y = time * 0.01;
  points.rotation.x = Math.sin(time * 0.006) * 0.03;

  // Rotate lines with points
  scene.children.forEach(function(child) {
    if (child.name === 'lines') {
      child.rotation.y = time * 0.01;
      child.rotation.x = Math.sin(time * 0.006) * 0.03;
    }
  });

  // Rings
  scene.children.forEach(function(child) {
    if (child.isMesh && child.geometry && child.geometry.type === 'RingGeometry') {
      var i = child._idx || 0;
      child.rotation.z = time * (0.04 + i * 0.015);
      child.rotation.x = Math.PI/2 + Math.sin(time * 0.025 + i) * 0.12;
    }
  });

  renderer.render(scene, camera);
}

animate();

})();
