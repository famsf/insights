(function (fds, win, $) {
  var doc = win.document;
  var pages = {
    debugLog: true
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
    pages.calculateThreshholds(win.innerHeight);
    pages.cachePageRelativesAsDataAttributes();

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
      console.log('startPage = ', startPage);
      pages.snapScroll(startPage);
    }
  };

  pages.cachePageRelativesAsDataAttributes = function (pageElements) {
    var pageEls = pages.pages;
    var i;
    var page;
    var count = pageEls.length;
    for (i = 0; i < count; i++) {
      page = pageEls[i];
      page.setAttribute('data-parent-element', page.parentElement);
      page.setAttribute('data-next-sibling', page.nextElementSibling);
    }
  };

  pages.getCurrentPage = function () {
    return pages.currentPage || pages.pages[0];
  };

  pages.nextPage = function (el) {
    pages.snapScroll(el.nextElementSibling, 'down', win.innerHeight);
  };

  pages.setCurrentPage = function (page) {
    var parent = page.getAttribute('data-parent-element');
    var chapterId = parent.id;
    if (pages.currentPage) {
      pages.oldCurrentPage = pages.currentPage;
      pages.oldCurrentPage.classList.remove('current');
    }
    pages.currentPage = page;
    fds.chapterNav.setActiveItem(parent);
    pages.currentPage.classList.add('current');
    window.location.hash = '&chapter=' + chapterId + '&page=' + page.id;
    pages.hashes.page = page.id;
    pages.hashes.chapter = chapterId;
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
        pages.calculateThreshholds(wh, scrollDir);
      }

      if (scrollDir === 'down') {
        pageNearEdge = pageRect.top >= fds.edgeDownthreshhold;
        otherCondition = pageRect.top <= fds.topBarDownthreshhold;
        shouldTriggerTopBar = pageNearEdge && otherCondition;
        shouldAdvance = pageNearEdge && pageRect.top <= fds.snapDownthreshhold;
        if (!shouldAdvance && (pageRect.top >= wh || pageRect.bottom <= 0)) {
          page.classList.remove('triggered');
          pages.untriggerVideo(page);
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
          page.classList.remove('triggered');
          pages.untriggerVideo(page);
        }
      }
      if (shouldTriggerTopBar) {
        pages.triggerTopBarEvents(page);
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
      console.log('  thresshold', fds.snapDownthreshhold);
    }
    else if (scrollDir === 'up') {
      console.log('  thresshold', fds.snapUpthreshhold);
    }
    console.log('');
  };

  pages.snapScroll = function (el, scrollDir, wh) {
    var scrollTo;
    var parent = el.getAttribute('data-parent-element');
    if (fds.scrollLock || el === pages.getCurrentPage() || !el) return;
    fds.scrollLock = true;
    document.body.style.overflow = 'hidden';
    pages.setCurrentPage(el);
    if (scrollDir === 'down') {
      scrollTo = el.getAttribute('data-parent-element').offsetTop + el.offsetTop;
    }
    else {
      scrollTo = (parent.offsetTop + el.offsetTop + el.clientHeight) - wh;
    }
    fds.performantScrollTo(scrollTo, function () {
      el.classList.add('triggered');
      pages.triggerVideo(el);
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
          pages.embeddedVideos[embeddedVideo.id] = plyr;
        });
      }
    }
  };

  pages.untriggerVideo = function (page) {
    var plyr;
    var vidElement = page.querySelector('.ambient_video .plyr_embed');
    var embeddedVideo = page.querySelector('.video--embed .plyr_target');
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
