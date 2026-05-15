import React, { useState, useEffect, useRef } from 'react'

export default function Portfolio() {
  const [works, setWorks] = useState([])
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetch('/works.json')
      .then(res => res.json())
      .then(data => setWorks(data))
      .catch(() => {}) // Jekyll-generated JSON — fail silently if dev env
  }, [])

  // Intersection observer for entrance animation
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Collect unique tags
  const allTags = [...new Set(works.flatMap(w => w.tags || []))]
  const filtered = filter === 'all' ? works : works.filter(w => (w.tags || []).includes(filter))

  if (!works.length) return null

  return (
    <div ref={ref}>
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <TagBtn active={filter === 'all'} onClick={() => setFilter('all')}>全部</TagBtn>
          {allTags.map(t => (
            <TagBtn key={t} active={filter === t} onClick={() => setFilter(t)}>{t}</TagBtn>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="portfolio-grid">
        {filtered.map((work, i) => (
          <Card key={work.title} work={work} index={i} visible={visible} />
        ))}
      </div>
    </div>
  )
}

function TagBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--accent-dim)' : 'var(--surface)',
        border: active ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border)',
        color: active ? 'var(--accent)' : 'var(--text-tertiary)',
        padding: '0.3rem 0.7rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: active ? 500 : 400,
        letterSpacing: '0.02em'
      }}
    >
      {children}
    </button>
  )
}

function Card({ work, index, visible }) {
  return (
    <a
      href={work.url}
      className="portfolio-card"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        animationDelay: visible ? `${index * 60}ms` : '0ms',
        animationPlayState: visible ? 'running' : 'paused'
      }}
    >
      <div className="card-glow" />

      {/* Tags */}
      {work.tech && work.tech.length > 0 && (
        <div className="card-tags">
          {work.tech.slice(0, 3).map(t => (
            <span key={t} className="card-tag">{t}</span>
          ))}
        </div>
      )}

      <h3 className="card-title">{work.title}</h3>

      {work.description && (
        <p className="card-desc">{work.description}</p>
      )}

      <span className="card-arrow">→</span>
    </a>
  )
}
