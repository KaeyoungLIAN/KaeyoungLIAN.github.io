import React, { useState, useEffect, useRef } from 'react'

export default function Portfolio() {
  var [works, setWorks] = useState([])
  var [filter, setFilter] = useState('all')
  var [visible, setVisible] = useState(false)
  var [ready, setReady] = useState(false)
  var ref = useRef(null)

  useEffect(function() {
    fetch('/works.json')
      .then(function(res) { return res.json() })
      .then(function(data) {
        // Step 1: Schedule React render with data
        setWorks(data)
        setReady(true)

        // Step 2: Hide SSR AFTER React has committed to the DOM
        // requestAnimationFrame defers to the next paint cycle,
        // by which time React has already rendered its cards.
        window.requestAnimationFrame(function() {
          var ssr = document.getElementById('portfolio-ssr')
          if (ssr) {
            ssr.classList.add('ssr-fade-out')
            // Fully remove from layout after transition completes
            setTimeout(function() {
              if (ssr && ssr.classList.contains('ssr-fade-out')) {
                ssr.style.display = 'none'
              }
            }, 300)
          }
        })
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
