import React, { useState, useEffect, useRef } from 'react'

export default function Portfolio() {
  const [works, setWorks] = useState([])
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const ref = useRef(null)

  useEffect(function() {
    fetch('/works.json')
      .then(function(res) { return res.json() })
      .then(function(data) {
        setWorks(data)
        // Hide SSR content once React has data
        var ssr = document.getElementById('portfolio-ssr')
        if (ssr) ssr.style.display = 'none'
        setReady(true)
      })
      .catch(function() {})
  }, [])

  useEffect(function() {
    if (!ref.current) return
    var obs = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return function() { obs.disconnect() }
  }, [])

  // Collect unique tags
  var allTags = [...new Set(works.flatMap(function(w) { return w.tags || [] }))]
  var filtered = filter === 'all'
    ? works
    : works.filter(function(w) { return (w.tags || []).includes(filter) })

  if (!ready || !works.length) return null

  return (
    <div ref={ref}>
      {allTags.length > 0 && (
        <div className="filter-bar">
          <button
            className={'filter-btn' + (filter === 'all' ? ' active' : '')}
            onClick={function() { setFilter('all') }}
          >All</button>
          {allTags.map(function(t) {
            return (
              <button
                key={t}
                className={'filter-btn' + (filter === t ? ' active' : '')}
                onClick={function() { setFilter(t) }}
              >{t}</button>
            )
          })}
        </div>
      )}

      <div className="portfolio-grid">
        {filtered.map(function(work, i) {
          return (
            <a
              key={work.title}
              href={work.url}
              className="portfolio-card"
              style={{
                animationDelay: visible ? (i * 70) + 'ms' : '0ms',
                animationPlayState: visible ? 'running' : 'paused'
              }}
            >
              {work.tech && work.tech.length > 0 && (
                <div className="card-tags">
                  {work.tech.slice(0, 3).map(function(t) {
                    return <span key={t} className="card-tag">{t}</span>
                  })}
                </div>
              )}

              <h3 className="card-title">{work.title}</h3>

              {work.description && (
                <p className="card-desc">{work.description}</p>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
