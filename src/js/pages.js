(function (fds, win, $) {
  var doc = win.document;
  var pages = {
    debugLog: true
  };
  fds.pages = pages;
  fds.pages.hashes = {};
  fds.pages.byId = {};

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
    pages.calculateThreshholds(win.innerHeight);

    pages.populatePagesById();

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
      }
      else {
        startPage = pages.currentPage;
      }
      pages.snapScroll(startPage);
    }
  };

  pages.populatePagesById = function () {
    /*
      Both for performance in accessing data, and to possibly allow us
      to pull the active page out of the chapter dom eleemnt for scroll-stikcyness
      smooth solution.
      If that happens, we'll be able to update relationships and re-cache.
    */
    var i;
    var pageEl;
    var chapter;
    var ambientVideo;
    var embeddedVideo;
    var count = pages.pages.length;
    for (i = 0; i < count; i++) {
      pageEl = pages.pages[i];
      chapter = pageEl.parentElement;
      ambientVideo = pageEl.querySelector('.ambient_video .plyr_target');
      embeddedVideo = pageEl.querySelector('.video--embed .plyr_target');
      pages.byId[pageEl.id] = {
        id: pageEl.id,
        el: pageEl,
        chapter: chapter,
        chapterIndex: chapter.dataset.chapterIndex,
        chapterId: chapter.id,
        nextPage: pageEl.nextElementSibling,
        index: pageEl.dataset.pageIndex,
        ambientVideoEl: ambientVideo,
        embeddedVideoEl: embeddedVideo
      };
    }
  };

  pages.getCurrentPage = function () {
    return pages.currentPage || pages.byId[pages.pages[0].id];
  };

  pages.nextPage = function (page) {
    pages.snapScroll(page.el.nextElementSibling, 'down', win.innerHeight);
  };

  pages.setCurrentPage = function (page) {
    var pageEl = page.el;
    console.log('setCurrentPage', page.el.classList);
    pages.oldCurrentPage = pages.currentPage;
    if (pages.oldCurrentPage && pages.oldCurrentPage.el) {
      pages.oldCurrentPage.el.classList.remove('current');
    }
    pages.currentPage = page;
    fds.chapterNav.setActiveItem(page.chapter);
    pages.currentPage.el.classList.add('current');
    window.location.hash = '&chapter=' + page.chapterId + '&page=' + pageEl.id;
    pages.hashes.page = pageEl.id;
    pages.hashes.chapter = page.chapterId;
    return page;
  };

  pages.calculateThreshholds = function () {
    var wh = win.innerHeight;
    fds.snapDownthreshhold = wh * 0.25;
    fds.topBarDownthreshhold = wh * 0.4;
    fds.edgeDownthreshhold = -1 * wh * 0.1;
    fds.snapUpthreshhold = wh * 0.75;
    fds.topBarUpthreshhold = wh * 0.6;
    fds.edgeUpthreshhold = wh * 0.1;
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
    var pageEl;

    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    for (pageIterator = 0; pageIterator < count; pageIterator++) {
      pageEl = pages.pages[pageIterator];
      page = pages.byId[pageEl.id];
      pageRect = pageEl.getBoundingClientRect();
      pageTopAboveViewportBottom = pageRect.top <= pageRect.height;
      pageTopBelowViewportBottom = pageRect.top > pageRect.height;
      pageBottomBelowViewportTop = pageRect.top + pageRect.height > 0;
      pageBottomAboveViewportTop = pageRect.top + pageRect.height < 0;
      pageTopAboveViewportTop = pageRect.top < 0;
      shouldAdvance = false;
      shouldStabilize = false;

      if (didResize) {
        pages.calculateThreshholds(wh, scrollDir);
      }

      if (scrollDir === 'down') {
        pageNearEdge = pageRect.top >= fds.edgeDownthreshhold;
        otherCondition = pageRect.top <= fds.topBarDownthreshhold;
        shouldTriggerTopBar = pageNearEdge && otherCondition;
        shouldAdvance = pageNearEdge && pageRect.top <= fds.snapDownthreshhold;
        if (!shouldAdvance && (pageRect.top >= wh || pageRect.bottom <= 0)) {
          pageEl.classList.remove('triggered');
          pages.untriggerVideo(pageEl);
        }
      }
      else if (scrollDir === 'up') {
        pageNearEdge = pageRect.bottom >= wh - fds.edgeUpthreshhold;
        otherCondition = pageRect.top <= fds.topBarUpthreshhold && pageRect.top < wh;
        shouldTriggerTopBar = pageNearEdge && otherCondition;
        shouldAdvance =
          pageRect.top < 0 &&
          pageRect.bottom >= fds.snapUpthreshhold &&
          pageRect.bottom > 0;
        if (!shouldAdvance && (pageRect.top >= wh || pageRect.bottom <= 0)) {
          pageEl.classList.remove('triggered');
          pages.untriggerVideo(pageEl);
        }
      }
      if (shouldTriggerTopBar) {
        pages.triggerTopBarEvents(pageEl);
        if (pages.debug) pages.debugLog(pageEl, pageRect, scrollDir);
        pages.snapScroll(page, scrollDir, wh);
      }
    }
  };

  pages.debugLog = function (pageEl, pageRect, scrollDir) {
    /*
      Please leave this in here for now, very useful for debugging
    */
    console.log('');
    console.log('»» Snapping to: ', pageEl.id);
    console.log('  top:', pageRect.top);
    console.log('  bottom:', pageRect.bottom);
    console.log('  scroll.y:', fds.scroll.y);
    console.log('  fds.scrollLock:', scrollDir);
    if (scrollDir === 'down') {
      console.log('  thresshold', fds.snapDownthreshhold);
    }
    else if (scrollDir === 'up') {
      console.log('  thresshold', fds.snapUpthreshhold);
    }
    console.log('');
  };

  pages.snapScroll = function (page, scrollDir, wh) {
    var scrollTo;
    var pageEl = page.el;
    var chapter = page.chapter;
    if (fds.scrollLock || page === pages.getCurrentPage() || !page) return;
    fds.scrollLock = true;
    document.body.style.overflow = 'hidden';
    pages.setCurrentPage(page);
    if (scrollDir === 'down') {
      scrollTo = chapter.offsetTop + pageEl.offsetTop;
    }
    else {
      scrollTo = (chapter.offsetTop + pageEl.offsetTop + pageEl.clientHeight) - wh;
    }
    fds.performantScrollTo(scrollTo, function () {
      pages.triggerPage(page);
      setTimeout(function () {
        fds.scrollLock = false;
        document.body.style.overflow = 'auto';
      }, 250);
    }, 475);
  };

  pages.triggerPage = function (page) {
    var pageEl = page.el;
    pageEl.classList.add('triggered');
    pages.triggerVideo(page);
  };

  pages.triggerVideo = function (page) {
    var plyr;
    var pageEl = page.el;
    if (page.ambientVideoEl) {
      if (!page.embeddedVideo) {
        plyr = new Plyr(page.ambientVideoEl, {
          hideControls: 'true'
        });
        plyr.on('ready', function (e) {
          e.detail.plyr.muted = true;
          e.detail.plyr.play();
        });
        page.ambientVideo = plyr;
      }
    }
    if (page.embeddedVideoEl) {
      if (!page.embeddedVideo) {
        plyr = new Plyr(page.embeddedVideoEl, {
          hideControls: 'false',
          controls: ['play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'pip', 'fullscreen']
        });
        plyr.on('ready', function (e) {
          page.embeddedVideo = plyr;
        });
      }
    }
  };

  pages.untriggerVideo = function (page) {
    var plyr;
    var pageEl = page.el;
    if (page.ambientVideo) {
      plyr = page.ambientVideo;
      if (plyr) {
        plyr.stop();
      }
    }
    if (page.embeddedVideo) {
      plyr = page.embeddedVideo;
      if (plyr) {
        plyr.stop();
      }
    }
  };

  pages.triggerTopBarEvents = function (pageEl) {
    if (pageEl.classList.contains('dark')) {
      doc.body.classList.add('dark');
    }
    else {
      doc.body.classList.remove('dark');
    }
    if (pageEl.classList.contains('invert-top-bar') && !fds.topBar.el.classList.contains('inverted-top-bar')) {
      pageEl.dispatchEvent(new CustomEvent('topBarEvent', {
        bubbles: true,
        detail: { action: 'invert' }
      }, { passive: true }));
    }
    else {
      pageEl.dispatchEvent(new CustomEvent('topBarEvent', {
        bubbles: true,
        detail: { action: 'reset' }
      }, { passive: true }));
    }
  };
}(window.fds = window.fds || {}, window, jQuery));
