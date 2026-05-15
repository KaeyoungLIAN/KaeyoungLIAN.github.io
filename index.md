---
layout: default
---

<section class="hero">
  <h1>Kaeyoung</h1>
  <p class="subtitle">Building things. Occasionally finishing them.</p>
  <span class="hero-accent"></span>
</section>

<!-- Server-rendered portfolio — visible immediately, hidden when React takes over -->
<div id="portfolio-ssr">
  {% if site.works.size > 0 %}
  <div class="filter-bar" data-ssr>
    <button class="filter-btn active" disabled>All</button>
    {% assign all_tags = site.works | map: "tags" | join: "," | split: "," | uniq | sort %}
    {% for tag in all_tags %}
      {% assign trimmed = tag | strip %}
      {% if trimmed != "" %}
      <button class="filter-btn" disabled>{{ trimmed }}</button>
      {% endif %}
    {% endfor %}
  </div>

  <div class="portfolio-grid">
    {% for work in site.works %}
    <a href="{{ work.url | relative_url }}" class="portfolio-card" style="animation-delay: {{ forloop.index0 | times: 70 }}ms">
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

<!-- React mounts here — replaces SSR when ready -->
<div id="portfolio-root"></div>

<script src="{{ '/assets/js/bundle.js' | relative_url }}"></script>
