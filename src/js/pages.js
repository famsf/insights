(function (fds, win) {
  var doc = win.document;
  var pages = {
    debug: false
  };
  fds.pages = pages;

  pages.initialize = function (containerSelector, pageSelector, clearElementSelector) {
    var locHash = window.location.hash.substr(1);
    var hashes = {};
    var params;
    var hashKey;
    var hashVal;
    var hashCount = 0;
    var param;
    var i;
    var startPage;
    pages.container = doc.querySelector(containerSelector);
    pages.pages = doc.querySelectorAll(pageSelector);

    if (!pages.container || !pages.pages.length) {
      console.log('Warning: Failed to initialize pages, check your selectors, but maybe you`re just prototyping isolated components');
      return;
    }

    pages.currentPage = pages.pages[0];
    pages.clearElement = doc.querySelector(clearElementSelector);
    pages.clearElementHeight = pages.clearElement.clientHeight;

    if (locHash.length > 1) {
      params = locHash.split('&');
      if (Array.isArray(params) && locHash.indexOf('=') > -1) {
        hashCount = params.length;
        for (i = 0; i < hashCount; i++) {
          param = params[i].split('=');
          hashKey = param[0];
          hashVal = param[1];
          hashes[hashKey] = hashVal;
        }
      }
      else {
        hashes.currentPage = locHash;
      }
      if (hashes.currentPage) {
        startPage = doc.getElementById(hashes.currentPage);
        pages.snapScroll(startPage);
      }
    }
    pages.calculateEdgeThreshhold(win.innerHeight);
  };

  pages.getCurrentPage = function () {
    return pages.currentPage || pages.pages[0];
  };

  pages.setCurrentPage = function (pageEl) {
    if (pages.currentPage) {
      pages.oldCurrentPage = pages.currentPage;
      pages.oldCurrentPage.classList.remove('current');
    }
    pages.currentPage = pageEl;
    fds.chapterNav.setActiveItem(pageEl.parentElement);
    pages.currentPage.classList.add('current');
    window.location.hash = '&chapter=' + pageEl.parentElement.id + '&page=' + pageEl.id;
    return pageEl;
  };

  pages.calculateEdgeThreshhold = function (wh) {
    fds.snapDownThreshhold = wh * 0.25;
    fds.topBarDownThreshhold = wh * 0.4;
    fds.edgeDownThreshHold = -1 * wh * 0.1;
    fds.snapUpThreshhold = wh * 0.75;
    fds.topBarUpThreshhold = wh * 0.6;
    fds.edgeUpThreshHold = wh * 0.1;
  };

  pages.onScroll = function (scrollY, scrollDir, wh, didResize) {
    var currentPage = pages.getCurrentPage();
    var shouldTriggerTopBar = false;
    var count = pages.pages.length;
    var pageNearEdge;
    var pageTopAboveViewportBottom;
    var pageTopBelowViewportBottom;
    var pageBottomBelowViewportTop;
    var pageBottomAboveViewportTop;
    var pageTopAboveViewportTop;
    var shouldAdvance;
    var shouldStabilize;
    var page;
    var pageRect;
    var pageIterator;
    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    for (pageIterator = 0; pageIterator < count; pageIterator++) {
      page = pages.pages[pageIterator];
      pageRect = page.getBoundingClientRect();
      pageTopAboveViewportBottom = pageRect.top <= pageRect.height;
      pageTopBelowViewportBottom = pageRect.top > pageRect.height;
      pageBottomBelowViewportTop = pageRect.top + pageRect.height > 0;
      pageBottomAboveViewportTop = pageRect.top + pageRect.height < 0;
      pageTopAboveViewportTop = pageRect.top < 0;
      shouldAdvance = false;
      shouldStabilize = false;

      if (didResize) {
        pages.calculateEdgeThreshhold(wh, scrollDir);
      }

      if (scrollDir === 'down') {
        pageNearEdge = pageRect.top >= fds.edgeDownThreshHold;
        shouldTriggerTopBar = pageNearEdge && (pageRect.top <= fds.topBarDownThreshhold && pageRect.bottom > 0);
        shouldAdvance = pageNearEdge && pageRect.top <= fds.snapDownThreshhold;
        if (!shouldAdvance && pageRect.top >= wh) {
          page.classList.remove('triggered');
        }
      }
      else if (scrollDir === 'up') {
        pageNearEdge = pageRect.bottom >= wh - fds.edgeUpThreshHold;
        shouldTriggerTopBar = pageNearEdge && (pageRect.top <= fds.topBarUpThreshhold && pageRect.top < wh);
        shouldAdvance = pageRect.top < 0 && pageRect.bottom >= fds.snapUpThreshhold && pageRect.bottom > 0;
        if (!shouldAdvance && pageRect.top >= wh) {
          page.classList.remove('triggered');
        }
      }
      if (shouldTriggerTopBar) {
        pages.triggerTopBarEvents(page);
      }
      if (page !== currentPage && shouldAdvance && !fds.scrollLock) {
        if (pages.debug) pages.debugLog(page, pageRect, scrollDir);
        pages.snapScroll(page, scrollDir, wh);
      }
    }
  };

  pages.debugLog = function (page, pageRect, scrollDir) {
    /*
      Please leave this in here for now, very useful for debugging
    */
    console.log('');
    console.log('»» Snapping to: ', page.id);
    console.log('  top:', pageRect.top);
    console.log('  bottom:', pageRect.bottom);
    console.log('  scroll.y:', fds.scroll.y);
    console.log('  fds.scrollLock:', scrollDir);
    if (scrollDir === 'down') {
      console.log('  thresshold', fds.snapDownThreshhold);
    }
    else if (scrollDir === 'up') {
      console.log('  thresshold', fds.snapUpThreshhold);
    }
    console.log('');
  };

  pages.snapScroll = function (el, scrollDir, wh) {
    var scrollTo;
    var isPage;
    if (fds.scrollLock || el === pages.getCurrentPage()) return;
    fds.scrollLock = true;
    document.body.style.overflow = 'hidden';
    isPage = el.classList.contains('page');
    if (isPage) {
      pages.setCurrentPage(el);
      scrollTo = (scrollDir === 'down') ? el.parentElement.offsetTop + el.offsetTop : (el.parentElement.offsetTop + el.offsetTop + el.clientHeight) - wh;
    }
    else {
      pages.setCurrentPage(el.querySelector('.page'));
      scrollTo = el.offsetTop;
    }
    fds.performantScrollTo(scrollTo, function () {
      if (isPage) {
        el.classList.add('triggered');
      }
      setTimeout(function () {
        fds.scrollLock = false;
        document.body.style.overflow = 'auto';
      }, 250);
    }, 475);
  };

  pages.triggerTopBarEvents = function (page) {
    if (page.classList.contains('dark')) {
      doc.body.classList.add('dark');
    }
    else {
      doc.body.classList.remove('dark');
    }
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
}(window.fds = window.fds || {}, window));
