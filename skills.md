---
layout: default
title: Skills
---

<style>
/* ── Skills page overwrites ── */
.skills-page {
  max-width: 980px;
  margin: 0 auto;
  padding: 60px 24px 100px;
}

.skills-header {
  text-align: center;
  margin-bottom: 60px;
}

.skills-header h1 {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 600;
  line-height: 1.0625;
  letter-spacing: -0.224px;
  color: var(--text);
  margin-bottom: 12px;
}

.skills-header .skills-subtitle {
  font-size: 21px;
  font-weight: 400;
  line-height: 1.19048;
  letter-spacing: 0.231px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.skills-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--canvas);
}

.stat-badge strong {
  color: var(--text);
  font-weight: 600;
}

/* ── Category section ── */
.category-section {
  margin-bottom: 48px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--hairline-soft);
}

.category-header h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--text);
  text-transform: capitalize;
}

.category-count {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--canvas-alt);
  padding: 2px 10px;
  border-radius: var(--radius-pill);
}

/* ── Skill grid ── */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

@media (max-width: 640px) {
  .skills-grid { grid-template-columns: 1fr; }
}

.skill-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  background: var(--canvas);
  border: 1px solid var(--hairline-soft);
  transition: border-color 0.2s ease, background 0.2s ease;
  cursor: default;
}

.skill-item:hover {
  border-color: var(--hairline);
  background: var(--canvas-alt);
}

.skill-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
  font-family: var(--font-display);
}

.skill-body {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-desc {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.skill-meta {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--text-tertiary);
  font-weight: 500;
  opacity: 0.6;
  margin-top: 2px;
}

/* ── Search ── */
.skills-search {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 40px;
  position: relative;
}

.skills-search input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-family: var(--font-body);
  color: var(--text);
  background: var(--canvas);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.skills-search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.skills-search .search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--text-tertiary);
  pointer-events: none;
}

/* ── Score badge integration ── */
.skill-score {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 6px;
  vertical-align: middle;
}

.score-high { background: #e8f5e9; color: #2e7d32; }
.score-mid  { background: #fff3e0; color: #e65100; }
.score-low  { background: #fce4ec; color: #c62828; }

/* ── Score legend ── */
.score-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
  flex-wrap: wrap;
}

.score-legend span {
  font-size: 11px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.score-legend .dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 4px;
}
</style>

<section class="skills-page">
  <div class="skills-header reveal">
    <h1>Agent Skills</h1>
    <p class="skills-subtitle">My Hermes Agent skill library</p>
    <div class="skills-stats" id="skills-stats">
      <span class="stat-badge"><strong id="total-skills">—</strong> Skills</span>
      <span class="stat-badge"><strong id="total-categories">—</strong> Categories</span>
    </div>
  </div>

  <div class="skills-search reveal" style="transition-delay:0.1s">
    <span class="search-icon">⌕</span>
    <input type="text" id="skill-search" placeholder="Search skills..." oninput="filterSkills(this.value)">
  </div>

  <div id="skills-container"></div>

  <!-- Score legend (hidden by default, unhide with scores data) -->
  <div class="score-legend reveal" id="score-legend" style="display:none">
    <span><span class="dot" style="background:#2e7d32"></span> Strong (≥60)</span>
    <span><span class="dot" style="background:#e65100"></span> Medium (45-59)</span>
    <span><span class="dot" style="background:#c62828"></span> Weak (<45)</span>
  </div>
</section>

<script>
// Load skill data
let SKILLS_DATA = [];
let SCORE_MAP = {};

async function loadData() {
  try {
    const res1 = await fetch('/assets/hermes-skills-data.json');
    SKILLS_DATA = await res1.json();
    
    const res2 = await fetch('/_data/hermes-skill-scores.json');
    const scores_raw = await res2.json();
    scores_raw.forEach(s => { SCORE_MAP[s.n] = s.s; });
  } catch (e) {
    console.warn('Score data not loaded:', e);
  }
  
  document.getElementById('total-skills').textContent = SKILLS_DATA.reduce((a, c) => a + c.skills.length, 0);
  document.getElementById('total-categories').textContent = SKILLS_DATA.length;
  renderCategories();
}

function getScore(name) {
  const s = SCORE_MAP[name] || SCORE_MAP[name.replace('-', '/')];
  return s !== undefined ? s : null;
}

function scoreClass(score) {
  if (score === null) return '';
  if (score >= 60) return 'score-high';
  if (score >= 45) return 'score-mid';
  return 'score-low';
}

function iconChar(name) {
  return name.charAt(0).toUpperCase();
}

function renderCategories(filter = '') {
  const container = document.getElementById('skills-container');
  container.innerHTML = '';
  
  const q = filter.toLowerCase().trim();
  let hasResults = false;

  SKILLS_DATA.forEach(cat => {
    const matched = cat.skills.filter(s => 
      s.n.toLowerCase().includes(q) || s.d.toLowerCase().includes(q)
    );
    if (q && matched.length === 0) return;
    if (!q) matched.length = cat.skills.length;
    hasResults = true;

    const section = document.createElement('div');
    section.className = 'category-section';

    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
      <h2>${cat.c.replace(/-/g, ' ')}</h2>
      <span class="category-count">${matched.length}</span>
    `;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'skills-grid';

    matched.forEach(s => {
      const score = getScore(s.n);
      const sc = scoreClass(score);
      const scoreHtml = score !== null ? `<span class="skill-score ${sc}">${score}</span>` : '';

      const item = document.createElement('div');
      item.className = 'skill-item';
      item.innerHTML = `
        <div class="skill-icon">${iconChar(s.n)}</div>
        <div class="skill-body">
          <div class="skill-name">${s.n}${scoreHtml}</div>
          <div class="skill-desc">${s.d || '—'}</div>
        </div>
        <div class="skill-meta">${s.l} lines</div>
      `;
      grid.appendChild(item);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });

  if (!hasResults) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-tertiary);padding:60px 0;">No skills match your search.</p>';
  }
}

function filterSkills(val) {
  renderCategories(val);
}

// Start
loadData();</script>

