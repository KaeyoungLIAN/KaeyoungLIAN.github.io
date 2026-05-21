(function() {
'use strict';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 8);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

document.getElementById('bg-canvas').appendChild(renderer.domElement);

var N = 1500;
var geo = new THREE.BufferGeometry();
var pos = new Float32Array(N * 3);
var col = new Float32Array(N * 3);
var siz = new Float32Array(N);
var phs = new Float32Array(N);

var palette = [
  [0.161, 0.592, 1.0],
  [0.251, 0.663, 1.0],
  [0.655, 0.545, 0.980],
  [0.404, 0.910, 0.976],
];

for (var i = 0; i < N; i++) {
  var cluster = Math.floor(Math.random() * 4);
  var a = (cluster / 4) * Math.PI * 2 + Math.random() * 1.0;
  var cx = Math.cos(a) * (0.3 + Math.random() * 0.8);
  var cy = (Math.random() - 0.5) * 2.0;
  var cz = Math.sin(a) * (0.3 + Math.random() * 0.8);

  var theta = Math.random() * Math.PI * 2;
  var phi = Math.acos(2 * Math.random() - 1);
  var r = Math.pow(Math.random(), 1.5) * 2.5;

  pos[i*3]   = cx + Math.sin(phi) * Math.cos(theta) * r;
  pos[i*3+1] = cy + Math.cos(phi) * r * 0.5;
  pos[i*3+2] = cz + Math.sin(phi) * Math.sin(theta) * r;

  var c = palette[Math.floor(Math.random() * palette.length)];
  var bt = 0.5 + Math.random() * 0.5;
  col[i*3]   = c[0] * bt;
  col[i*3+1] = c[1] * bt;
  col[i*3+2] = c[2] * bt;

  siz[i] = 0.015 + Math.random() * 0.045;
  phs[i] = Math.random() * Math.PI * 2;
}

geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

var mat = new THREE.PointsMaterial({
  size: 0.06,
  vertexColors: true,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
});

var particles = new THREE.Points(geo, mat);
scene.add(particles);

var posAttr = geo.attributes.position;
var origPos = new Float32Array(posAttr.array);

var mouseX = 0, mouseY = 0;
var followX = 0, followY = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

var t = 0;

function animate() {
  requestAnimationFrame(animate);
  t += 0.002;

  followX += (mouseX * 0.3 - followX) * 0.02;
  followY += (mouseY * 0.2 - followY) * 0.02;

  var ox = Math.sin(t * 0.08) * 0.4;
  var oz = Math.cos(t * 0.06) * 0.4;
  camera.position.x = followX + ox;
  camera.position.y = 1.5 + followY + Math.sin(t * 0.05) * 0.1;
  camera.position.z = 8 + oz * 0.3;
  camera.lookAt(0, 0.3, 0);

  var p = posAttr.array;
  for (var i = 0; i < N; i++) {
    var i3 = i * 3;
    var phase = phs[i];
    p[i3]   = origPos[i3]   + Math.sin(t * 0.3 + phase) * 0.0003;
    p[i3+1] = origPos[i3+1] + Math.sin(t * 0.2 + phase * 1.3) * 0.00015;
    p[i3+2] = origPos[i3+2] + Math.cos(t * 0.25 + phase * 0.7) * 0.0003;
  }
  posAttr.needsUpdate = true;

  particles.rotation.y = t * 0.015;
  particles.rotation.x = Math.sin(t * 0.01) * 0.05;

  renderer.render(scene, camera);
}

animate();

})();
