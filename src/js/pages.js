(function (fds, win, $) {
  var doc = win.document;
  var pages = {
    debug: false
  };
  fds.pages = pages;
  fds.pages.ambientVideos = {};
  fds.pages.embeddedVideos = {};
  fds.pages.hashes = {};

  pages.initialize = function (containerSelector, pageSelector, clearElementSelector) {
    var locHash = window.location.hash.substr(1);
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
          pages.hashes[hashKey] = hashVal;
        }
      }
      else {
        pages.hashes.currentPage = locHash;
      }
      if (pages.hashes.currentPage) {
        startPage = doc.getElementById(pages.hashes.currentPage);
        $('.tooltip').foundation('hide');
        pages.snapScroll(startPage);
      }
      else {
        pages.snapScroll(pages.currentPage);
      }
    }
    pages.calculateEdgeThreshhold(win.innerHeight);
  };

  pages.getCurrentPage = function () {
    return pages.currentPage || pages.pages[0];
  };

  pages.setCurrentPage = function (pageEl) {
    var chapterId = pageEl.parentElement.id;
    if (pages.currentPage) {
      pages.oldCurrentPage = pages.currentPage;
      pages.oldCurrentPage.classList.remove('current');
    }
    pages.currentPage = pageEl;
    fds.chapterNav.setActiveItem(pageEl.parentElement);
    pages.currentPage.classList.add('current');
    window.location.hash = '&chapter=' + chapterId + '&page=' + pageEl.id;
    pages.hashes.page = pageEl.id;
    pages.hashes.chapter = chapterId;
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
    var otherCondition;

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
        otherCondition = pageRect.top <= fds.topBarDownThreshhold && pageRect.bottom > 0;
        shouldTriggerTopBar = pageNearEdge && otherCondition;
        shouldAdvance = pageNearEdge && pageRect.top <= fds.snapDownThreshhold;
        if (!shouldAdvance && (pageRect.top >= wh || pageRect.bottom <= 0)) {
          console.log('okdeokdoekodkeokdoekodkeokdokeo', page.id)
          page.classList.remove('triggered');
          pages.untriggerVideo(page);
        }
      }
      else if (scrollDir === 'up') {
        pageNearEdge = pageRect.bottom >= wh - fds.edgeUpThreshHold;
        otherCondition = pageRect.top <= fds.topBarUpThreshhold && pageRect.top < wh;
        shouldTriggerTopBar = pageNearEdge && otherCondition;
        shouldAdvance =
          pageRect.top < 0 &&
          pageRect.bottom >= fds.snapUpThreshhold &&
          pageRect.bottom > 0;
        if (!shouldAdvance && (pageRect.top >= wh || pageRect.bottom <= 0)) {
          console.log('okdeokdoekodkeokdoekodkeokdokeo', page.id)
          page.classList.remove('triggered');
          pages.untriggerVideo(page);
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
        pages.triggerVideo(el);
      }
      setTimeout(function () {
        fds.scrollLock = false;
        document.body.style.overflow = 'auto';
      }, 250);
    }, 475);
  };

  pages.triggerVideo = function (page) {
    var vidElement = page.querySelector('.ambient_video .plyr_target');
    var embeddedVideo = page.querySelector('.video--embed .plyr_target');
    var plyr;

    if (vidElement) {
      if (!pages.ambientVideos[vidElement.id]) {
        plyr = new Plyr(vidElement, {
          hideControls: 'true'
        });
        plyr.on('ready', function (e) {
          e.detail.plyr.muted = true;
          e.detail.plyr.play();
          console.log('ambientVideo!!!!!', e.detail.plyr);
        });
        pages.ambientVideos[vidElement.id] = plyr;
      }
    }

    if (embeddedVideo) {
      if (!pages.embeddedVideos[embeddedVideo.id]) {
        plyr = new Plyr(embeddedVideo, {
          hideControls: 'false',
          controls: ['play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'pip', 'fullscreen']
        });
        plyr.on('ready', function (e) {
          console.log('embeddedVideo!!!!!', e.detail.plyr);
          pages.embeddedVideopls[embeddedVideo.id] = plyr;
        });
      }
    }
  };

  pages.untriggerVideo = function (page) {
    console.log('untriggerVideo', page.id)
    var vidElement = page.querySelector('.ambient_video .plyr_embed');
    var embeddedVideo = page.querySelector('.video--embed .plyr_target');
    var plyr;
    if (vidElement) {
      plyr = pages.ambientVideo[vidElement.id];
      if (plyr) {
        plyr.stop();
      }
    }
    if (embeddedVideo) {
      plyr = pages.embeddedVideos[embeddedVideo.id];
      if (plyr) {
        plyr.stop();
      }
    }
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
}(window.fds = window.fds || {}, window, jQuery));
