(function (fds, doc) {
  var pages = fds.pages = {};

  pages.options = {
    scrollThreshhold: 0.175
  };

  pages.initialize = function (containerSelector, pageSelector, clearElementSelector) {
    pages.container = doc.querySelector(containerSelector);
    pages.pages = doc.querySelectorAll(pageSelector);
    if (!pages.container || !pages.pages) {
      console.log('Warning: Failed to initialize pages, check your selectors, but maybe you`re just prototyping isolated components');
      return;
    }
    pages.currentPage = pages.pages[0];
    pages.clearElement = doc.querySelector(clearElementSelector);
    pages.clearElementHeight = pages.clearElement.clientHeight;
  };

  pages.getCurrentPage = function () {
    // if we have no current page, then the first page should be currentPage
    return pages.currentPage || pages.setCurrentPage(pages.pages[0]);
  };

  pages.setCurrentPage = function (pageEl) {
    pages.oldCurrentPage = pages.currentPage;
    pages.oldCurrentPage.classList.remove('current');
    pages.currentPage = pageEl;
    pages.currentPage.classList.add('current');
    return pageEl;
  };

  pages.onScroll = function (scrollY, scrollDir, wh, didResize) {
    var currentPage = pages.getCurrentPage();
    var pageRect = currentPage.getBoundingClientRect();
    var shouldTriggerTopBar = false;
    var count = pages.pages.length;
    var marginTop = currentPage.style.marginTop ? parseInt(currentPage.style.marginTop) : 0;

    var pageTopAboveOrAtViewportTop = pageRect.top <= 0;
    var pageTopPastScrollThreshhold = pageRect.top < -1 * (wh * pages.options.scrollThreshhold);

    // console.log( currentPage.id, '?» ', scrollY, currentPage.offsetTop, currentPage.getBoundingClientRect().top, fds.getParentEl(currentPage, '.chapter').getBoundingClientRect().top )
    if (currentPage && currentPage.classList.contains('in_viewport')) {
      if (scrollDir === 'down') {
        shouldTriggerTopBar = pageRect.top - marginTop < pages.clearElementHeight;
      }
      else {
        shouldTriggerTopBar = pageRect.top - marginTop + pageRect.height > -1 * pages.clearElementHeight;
      }

      if (currentPage.classList.contains('pinned') && pageTopPastScrollThreshhold) {
        pages.releasePinned(currentPage);
      }

      pages.triggerTopBarEvents(currentPage);
    }

    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    for (var i = 0; i < count; i++) {
      var page = pages.pages[i];
      marginTop = page.style.marginTop ? parseInt(page.style.marginTop) : 0;
      pageRect = page.getBoundingClientRect();
      var pageTopAboveViewportBottom = pageRect.top + marginTop < pageRect.height;

      var pageTopBelowViewportBottom = pageRect.top + marginTop > pageRect.height;
      var pageBottomBelowViewportTop = pageRect.top + marginTop + pageRect.height > 0;
      var pageBottomAboveViewportTop = pageRect.top + marginTop + pageRect.height < 0;
      var pageTopAboveViewportTop = pageRect.top < 0;

      if (scrollDir === 'down') {
        shouldTriggerTopBar = pageRect.top - marginTop < pages.clearElementHeight;

        if (pageBottomAboveViewportTop) {
          // Page is now offscreen.
          pages.pageLeftViewport(page);
        }
        else if (pageTopAboveViewportBottom) {
          // Page is enntering viewport.
          pages.pageEnteredViewport(page);
        }

        if (shouldTriggerTopBar) {
          pages.triggerPage(page);
        }
      }
      else if (scrollDir === 'up') {
        shouldTriggerTopBar = pageRect.top - marginTop + pageRect.height > -1 * pages.clearElementHeight;

        // This is implied with else, but easier to read this way.
        if (pageTopAboveViewportTop && pageBottomBelowViewportTop) {
          pages.pageEnteredViewport(page);
        }
        else if (pageTopBelowViewportBottom) {
          pages.pageLeftViewport(page);
        }

        if (shouldTriggerTopBar) {
          pages.triggerPage(page);
        }
      }
    }
  };

  pages.triggerPage = function (page) {
    if (page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'trigger' }
      }));
    }
  };

  pages.pageLeftViewport = function (page) {
    if (page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'leave' }
      }));
    }
  };

  pages.pageReachedTop = function (page) {
    if (!page.classList.contains('pinned') && page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'reachTop' }
      }));
    }
  };

  pages.releasePage = function (page) {
    if (page.classList.contains('pinned')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'release' }
      }));
    }
  };

  pages.pageHalfWayIn = function (page) {
    if (page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'makeActive' }
      }));
    }
  };

  pages.pageEnteredViewport = function (page) {
    if (!page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'enter' }
      }));
    }
  };

  pages.triggerTopBarEvents = function (page) {
    if (page.classList.contains('invert-top-bar') && !fds.topBar.el.classList.contains('inverted-top-bar')) {
      page.dispatchEvent(new CustomEvent('topBarEvent', {
        bubbles: true,
        detail: { action: 'invert' }
      }, { passive: true }));
    }
    else {
      page.dispatchEvent(new CustomEvent('topBarEvent', {
        bubbles: true,
        detail: { action: 'reset' }
      }, { passive: true }));
    }
  };

  // For performance reasons we group our event handlers and create custom evennts
  doc.addEventListener('pageEvent', function (e) {
    console.log('| pageEvent » |', e.target.id, e.detail.action);
    switch (e.detail.action) {
      case 'enter':
        e.target.classList.add('in_viewport');
        break;

      case 'leave':
        e.target.classList.remove('in_viewport');
        break;

      case 'trigger':
        console.log('| » | trigger » |', e.target.id);
        pages.setCurrentPage(e.target);
        e.target.classList.add('trigger');
        break;

      case 'reachTop':
        // console.log('| » |  reached the top | » ', e.target.id )
        e.target.classList.add('pinned');
        break;

      case 'release':
        // console.log('| » |  release | » ', e.target.id )
        e.target.classList.remove('pinned');
        break;

      default:
        console.log('Unknown page event?', e.target, e.detail);
        break;
    }
  }, { passive: true });
}(window.fds = window.fds || {}, document));
