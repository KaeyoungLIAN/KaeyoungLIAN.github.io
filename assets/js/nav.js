(function() {
  'use strict'

  var pageContent = document.getElementById('page-content')
  var portfolioRoot = document.getElementById('portfolio-root')
  var isTransitioning = false

  function getPage(url) {
    return window.fetch(url)
      .then(function(r) { return r.text() })
      .then(function(html) {
        var parser = new DOMParser()
        var doc = parser.parseFromString(html, 'text/html')
        var newContent = doc.querySelector('#page-content')
        var newTitle = doc.querySelector('title')
        if (newContent) return { content: newContent.innerHTML, title: newTitle && newTitle.textContent || '', url: url }
        return null
      })
  }

  function isHomePage(url) {
    var path = url.replace(window.location.origin, '').split('?')[0].split('#')[0]
    return path === '/' || path === ''
  }

  function navigateTo(url) {
    if (isTransitioning || !pageContent) return
    isTransitioning = true

    getPage(url).then(function(result) {
      if (!result) {
        window.location.href = url
        return
      }

      // Fade out
      pageContent.style.opacity = '0'
      pageContent.style.transform = 'translateY(-4px)'

      setTimeout(function() {
        // Swap content
        pageContent.innerHTML = result.content
        if (result.title) document.title = result.title

        // Update active nav link
        var links = document.querySelectorAll('.nav-link')
        var path = result.url.replace(window.location.origin, '').split('?')[0].split('#')[0] || '/'
        for (var i = 0; i < links.length; i++) {
          var href = links[i].getAttribute('href')
          links[i].classList.toggle('active', href === path)
        }

        window.scrollTo(0, 0)

        // Reset and fade in
        pageContent.style.transition = 'none'
        pageContent.style.opacity = '0'
        pageContent.style.transform = 'translateY(8px)'
        pageContent.offsetHeight
        pageContent.style.transition = ''
        pageContent.style.opacity = ''
        pageContent.style.transform = ''

        isTransitioning = false

        // Signal React to re-check SSR after content swap
        window.dispatchEvent(new CustomEvent('hermes:navigate', { detail: { url: result.url } }))
      }, 200)
    }).catch(function() {
      window.location.href = url
      isTransitioning = false
    })
  }

  // Intercept internal link clicks
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a')
    if (!link) return

    var href = link.getAttribute('href')
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.hasAttribute('download') || link.hasAttribute('target')) return

    if (link.origin && link.origin !== window.location.origin) return

    e.preventDefault()

    var url = link.href
    if (url === window.location.href) return

    navigateTo(url)
    window.history.pushState({ url: url }, '', url)
  })

  // Handle browser back/forward
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.url) {
      getPage(e.state.url).then(function(result) {
        if (!result) return
        pageContent.innerHTML = result.content
        if (result.title) document.title = result.title
        pageContent = document.getElementById('page-content')
        window.scrollTo(0, 0)
        window.dispatchEvent(new CustomEvent('hermes:navigate', { detail: { url: e.state.url } }))
      })
    } else {
      window.location.reload()
    }
  })
})()
