import React, { useState, useEffect, useRef } from 'react'

export default function Portfolio() {
  var [works, setWorks] = useState([])
  var [filter, setFilter] = useState('all')
  var [visible, setVisible] = useState(false)
  var [ready, setReady] = useState(false)
  var ref = useRef(null)

  // Fetch works data
  useEffect(function() {
    fetch('/works.json')
      .then(function(res) { return res.json() })
      .then(function(data) {
        setWorks(data)
        setReady(true)
        // Cards are in view on initial load — show immediately
        setVisible(true)
      })
      .catch(function() {})
  }, [])

  // Hide SSR AFTER React has committed its render to the DOM
  // useEffect runs post-commit — guaranteed React cards already visible
  useEffect(function() {
    if (!ready || works.length === 0) return
    var ssr = document.getElementById('portfolio-ssr')
    if (!ssr) return

    // Wait one frame to ensure React's painting is fully flushed
    // then fade SSR out
    var raf = window.requestAnimationFrame(function() {
      ssr.classList.add('ssr-fade-out')
      // Remove from layout after CSS transition completes
      var timer = setTimeout(function() {
        if (ssr.parentNode) ssr.style.display = 'none'
      }, 300)
      return function() { clearTimeout(timer) }
    })
    return function() { window.cancelAnimationFrame(raf) }
  }, [ready, works])

  // Intersection observer for entrance animation
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
