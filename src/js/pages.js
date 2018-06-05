(function(fds, pages, win, doc, log) {
  pages.options = {
    scrollThreshhold: 0.2
  }

  pages.initialize = function(containerSelector, pageSelector, clearElementSelector) {
    pages.container = doc.querySelector(containerSelector)
    pages.pages = doc.querySelectorAll(pageSelector)
    pages.currentPage = pages.pages[0]
    pages.clearElement = doc.querySelector(clearElementSelector)
    pages.clearElementHeight = pages.clearElement.clientHeight
    pages.container.style.height = pages.calculateContainerSize()
  }

  pages.getCurrentPage = function() {
    // if we have no current page, then the first page should be currentPage
    return pages.currentPage || pages.pages[0]
  }

  pages.setCurrentPage = function(pageEl) {
    pages.oldCurrentPage = pages.currentPage
    pages.currentPage = pageEl
    return pageEl
  }

  pages.onScroll = function(scrollY, scrollDir, wh, didResize) {

    var currentPage = pages.getCurrentPage()
    var pageRect = currentPage.getBoundingClientRect()
    var shouldTriggerTopBar = false
    var count = pages.pages.length
    var marginTop = currentPage.style.marginTop ? parseInt(currentPage.style.marginTop) : 0

    if(currentPage && currentPage.classList.contains('in-viewport')) {
      if(scrollDir === 'down') {
        shouldTriggerTopBar = pageRect.top - marginTop < pages.clearElementHeight
      } else {
        shouldTriggerTopBar = pageRect.top - marginTop + pageRect.height > -1 * pages.clearElementHeight
      }
      pages.triggerTopBarEvents(currentPage)
    }

    // loop through pages, we can eventually filter out doing stuff to pages that are offscreen
    for( var i = 0; i < count; i++) {

      var page = pages.pages[i]
      marginTop = page.style.marginTop ? parseInt(page.style.marginTop) : 0
      pageRect = page.getBoundingClientRect()
      var pageTopAboveViewportBottom = pageRect.top + marginTop < pageRect.height
      var pageTopBelowViewportBottom = pageRect.top + marginTop > pageRect.height
      var pageBottomBelowViewportTop = pageRect.top + marginTop + pageRect.height > 0
      var pageBottomAboveViewportTop = pageRect.top + marginTop + pageRect.height < 0
      var pageTopAboveViewportTop = pageRect.top < 0
      // if(page.id == 'c1p3') console.log(pageRect.top, pageRect.height, marginTop);//pageOffset, pageHeight, parseInt(page.style.marginTop))
      if(scrollDir === 'down') {
        if (pageBottomAboveViewportTop){
          // page is now offscreen
          pages.pageLeftViewport(page)
        } else if (pageTopAboveViewportBottom) {
          // page is enntering viewport
          pages.pageEnteredViewport(page)
        }
      } else if (scrollDir === 'up'){
        // this is implied with else, but easier to read this way
        if(pageTopAboveViewportTop && pageBottomBelowViewportTop) {
          pages.pageEnteredViewport(page)
        } else if (pageTopBelowViewportBottom ) {
          pages.pageLeftViewport(page)
        }
      }
    }
  }

  pages.pageLeftViewport = function(page) {
    if(page.classList.contains('in-viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'leave' }
      }))
    }
  }

  pages.pageEnteredViewport = function(page) {
    if(!page.classList.contains('in-viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'enter' }
      }))
    }
  }

  pages.triggerTopBarEvents = function(page) {
      if (page.classList.contains('invert-top-bar') &&  !fds.topBar.el.classList.contains('inverted-top-bar')) {
        page.dispatchEvent(new CustomEvent('topBarEvent', {
          bubbles: true,
          detail: { action: 'invert' }
        }, { passive: true }))
      } else {
        page.dispatchEvent(new CustomEvent('topBarEvent', {
          bubbles: true,
          detail: { action: 'reset' }
        }, { passive: true }))
      }

  }

  pages.calculateContainerSize = function() {
    var pageCount = pages.pages.length
    var coverCount = pages.pages.length
    return (100 * (pageCount - coverCount)) + 'vh'
  }

  // For performance reasons we group our event handlers and create custom evennts
  doc.addEventListener('pageEvent', function(e) {

//    console.log('pageEvent »', e.detail.action, e.detail.action == 'enter')
    switch(e.detail.action) {
      case 'enter':
        // console.log(`|» ${e.target.id} entered viewport`)
        e.target.classList.add('in-viewport')
        pages.setCurrentPage(e.target)
        break
      case 'leave':
        // console.log(`|» ${e.target.id} left viewport`)
        e.target.classList.remove('in-viewport')
        break
      case 'reachTop':
        e.target.classList.add('pinned')
        break
      case 'release':
        e.target.classList.remove('pinned')
        break
      default:
        console.log('Unknown page event?', e.target, e.detail)
        break
    }
  }, {passive: true})

}(window.fds = window.fds || {}, window.fds.pages = window.fds.pages || {}, window, document, console.log));