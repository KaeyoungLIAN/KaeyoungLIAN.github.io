---
layout: default
---

<section class="tile-light hero-tile">
  <div class="tile-content">
    <h1>Kaeyoung</h1>
    <p class="subtitle">Building things. Occasionally finishing them.</p>
    <div class="hero-actions">
      <a href="https://github.com/KaeyoungLIAN" class="btn-primary" target="_blank" rel="noopener">GitHub</a>
      <a href="mailto:kaeyounglk@outlook.com" class="btn-secondary">Email</a>
    </div>
  </div>
</section>

<section class="tile-dark">
  <div class="tile-content">
    <div class="section-header">
      <h2>Work</h2>
    </div>

    {% if site.works.size > 0 %}
    <div class="portfolio-grid">
      {% for work in site.works %}
      <a href="{{ work.url | relative_url }}" class="store-card">
        <div class="card-img-wrap">
          <div class="card-img-placeholder">{{ work.title }}</div>
        </div>
        {% if work.tech.size > 0 %}
        <div class="card-tags">
          {% for tech in work.tech limit:3 %}
          <span class="card-tag">{{ tech }}</span>
          {% endfor %}
        </div>
        {% endif %}
        <h3 class="card-title">{{ work.title }}</h3>
        {% if work.description %}
        <p class="card-desc">{{ work.description }}</p>
        {% endif %}
        <span class="card-footer-link">View Project →</span>
      </a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</section>
