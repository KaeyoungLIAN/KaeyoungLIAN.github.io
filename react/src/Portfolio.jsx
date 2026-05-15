import React, { useState, useEffect, useRef } from 'react'

export default function Portfolio() {
  const [works, setWorks] = useState([])
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const ref = useRef(null)

  // Fetch works data
  useEffect(() => {
    fetch('/works.json')
      .then((res) => res.json())
      .then((data) => {
        setWorks(data)
        setReady(true)
        // Cards are in view on initial load — show immediately
        setVisible(true)
      })
      .catch(() => {})
  }, [])

  // Hide SSR after React has committed its render
  useEffect(() => {
    if (!ready || works.length === 0) return
    hideSsr()
  }, [ready, works])

  // Listen for AJAX navigation
  useEffect(() => {
    if (!ready) return
    const onNavigate = () => hideSsr()
    window.addEventListener('hermes:navigate', onNavigate)
    return () => window.removeEventListener('hermes:navigate', onNavigate)
  }, [ready])

  function hideSsr() {
    const ssr = document.getElementById('portfolio-ssr')
    if (!ssr || ssr.style.display === 'none') return

    ssr.classList.remove('ssr-fade-out')
    ssr.style.display = ''
    ssr.offsetHeight

    requestAnimationFrame(() => {
      ssr.classList.add('ssr-fade-out')
      setTimeout(() => {
        if (ssr.parentNode) ssr.style.display = 'none'
      }, 250)
    })
  }

  // Intersection observer for entrance animation fallback
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const allTags = [...new Set(works.flatMap((w) => w.tags || []))]
  const filtered = filter === 'all'
    ? works
    : works.filter((w) => (w.tags || []).includes(filter))

  if (!ready || !works.length) return null

  return (
    <div ref={ref}>
      {allTags.length > 0 && (
        <div className="filter-bar">
          <button
            className={'filter-btn' + (filter === 'all' ? ' active' : '')}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              className={'filter-btn' + (filter === t ? ' active' : '')}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="portfolio-grid">
        {filtered.map((work, i) => (
          <a
            key={work.title}
            href={work.url}
            className="portfolio-card"
            style={{
              animationDelay: visible ? `${i * 40}ms` : '0ms',
              animationPlayState: visible ? 'running' : 'paused'
            }}
          >
            {work.tech && work.tech.length > 0 && (
              <div className="card-tags">
                {work.tech.slice(0, 3).map((t) => (
                  <span key={t} className="card-tag">{t}</span>
                ))}
              </div>
            )}

            <h3 className="card-title">{work.title}</h3>

            {work.description && (
              <p className="card-desc">{work.description}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
