---
layout: default
---

<!-- Apple Hero Tile (light) -->
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

<!-- Server-rendered portfolio — visible immediately, hidden when React takes over -->
<section class="tile-dark" id="portfolio-ssr">
  <div class="tile-content">
    <div class="section-header">
      <h2>Work</h2>
    </div>
    {% if site.works.size > 0 %}
    <div class="filter-bar" data-ssr>
      <button class="filter-chip active">All</button>
      {% assign all_tags = site.works | map: "tags" | join: "," | split: "," | uniq | sort %}
      {% for tag in all_tags %}
        {% assign trimmed = tag | strip %}
        {% if trimmed != "" %}
        <button class="filter-chip">{{ trimmed }}</button>
        {% endif %}
      {% endfor %}
    </div>

    <div class="portfolio-grid">
      {% for work in site.works %}
      <a href="{{ work.url | relative_url }}" class="store-card" style="animation-delay: {{ forloop.index0 | times: 70 }}ms">
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
      </a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</section>

<!-- React mounts here into the layout-provided #portfolio-root -->
