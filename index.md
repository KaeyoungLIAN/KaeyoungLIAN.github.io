---
layout: default
---

<section class="hero-section">
  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      Full-stack Developer
    </div>
    <h1 class="hero-name">Kaeyoung</h1>
    <p class="hero-subtitle">Building things. Occasionally finishing them.</p>
    <div class="hero-actions">
      <a href="https://github.com/KaeyoungLIAN" class="btn-primary" target="_blank" rel="noopener">
        View GitHub
      </a>
      <a href="mailto:kaeyounglk@outlook.com" class="btn-secondary">
        Get in Touch
      </a>
    </div>
  </div>
</section>

<section class="section-alt">
  <div class="tile-content">
    <div class="section-header reveal">
      <h2>Projects</h2>
      <p class="section-sub">Things I&rsquo;ve built and shipped</p>
    </div>

    {% assign works_sorted = site.works | sort: "date" | reverse %}
    <div class="portfolio-grid">
      {% for work in works_sorted %}
      {% assign delay = forloop.index0 | modulo: 4 | plus: 1 %}
      <a href="{{ work.url | relative_url }}" class="store-card reveal reveal-delay-{{ delay }}">
        <div class="card-img-wrap">
          {% if work.image %}
          <img src="{{ work.image }}" alt="{{ work.title }}" class="card-img" loading="lazy">
          {% else %}
          <div class="card-img-placeholder">{{ work.title }}</div>
          {% endif %}
        </div>
        {% if work.tags.size > 0 %}
        <div class="card-tags">
          {% for tag in work.tags limit:3 %}
          <span class="card-tag">{{ tag }}</span>
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
  </div>
</section>
