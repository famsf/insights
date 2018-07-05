(function (fds, win, $) {
  var doc = win.document;
  var pages = {
    debug: true,
    ambientVideos: {},
    embeddedVideos: {},
    snapThreshhold: 100,
    hashes: {},
    lastSnap: 0
  };
  fds.pages = pages;

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
        pages.snapToPage(startPage);
      }
      else {
        pages.snapToPage(pages.currentPage);
      }
    }
    pages.calculateThreshholds(win.innerHeight);
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

  pages.calculateThreshholds = function (wh) {
    fds.snapDownThreshhold = wh * 0.44;
    fds.snapUpThreshhold = wh * 0.55;
    fds.topBarUpThreshhold = wh * 0.55;
    fds.topBarDownThreshhold = wh * 0.45;
    fds.edgeDownThreshHold = -1 * wh * 0.1;
    fds.edgeUpThreshHold = wh * 0.1;
  };

  pages.onScroll = function (scrollDir, scrollDiff, wh, didResize) {
    var scrollY = win.pageYOffset;
    var currentPage = pages.getCurrentPage();
    var shouldTriggerTopBar = false;
    var count = pages.pages.length;
    var pageTopBelowViewportBottom;
    var pageBottomBelowViewportTop;
    var pageBottomAboveViewportTop;
    var pageTopAboveViewportTop;
    var isNotUnpinned;
    var shouldAdvance;
    var shouldUnlockScrolling = false;
    var snap = false;
    var page;
    var pageRect;
    var pageIterator;
    var otherCondition;

    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    for (pageIterator = 0; pageIterator < count; pageIterator++) {
      page = pages.pages[pageIterator];
      pageRect = page.getBoundingClientRect();
      // pageTopAboveViewportBottom = pageRect.top <= pageRect.height;
      pageTopBelowViewportBottom = pageRect.top > pageRect.height;
      pageBottomBelowViewportTop = pageRect.top + pageRect.height > 0;
      pageBottomAboveViewportTop = pageRect.top + pageRect.height < 0;
      pageTopAboveViewportTop = pageRect.top < 0;
      shouldAdvance = false;

      if (didResize) {
        pages.calculateThreshholds(wh, scrollDir);
      }

      if (scrollDir === 'down') {
        otherCondition = pageRect.top <= fds.topBarDownThreshhold && pageRect.bottom > 0;
        shouldTriggerTopBar = otherCondition;
        shouldAdvance = pageRect.top <= fds.snapDownThreshhold && !page.classList.contains('unpinned');
        if (!shouldAdvance && (pageRect.top >= wh && pageRect.bottom <= 0)) {
          page.classList.remove('triggered');
          pages.deTriggerVideo(page);
        }
      }
      else if (scrollDir === 'up') {
        otherCondition = pageRect.top <= fds.topBarUpThreshhold && pageRect.top < wh;
        shouldTriggerTopBar = otherCondition;
        shouldAdvance =
          // pageRect.top < 0 &&
          pageRect.bottom >= fds.snapUpThreshhold &&
          pageRect.bottom > 0 &&
          !page.classList.contains('unpinned');
        if (!shouldAdvance && (pageRect.top >= wh && pageRect.bottom <= 0)) {
          page.classList.remove('triggered');
          pages.deTriggerVideo(page);
        }
      }

      snap = Math.abs(scrollY - fds.pages.lastSnap) > pages.snapThreshhold;
      shouldUnlockScrolling = snap && fds.scrollLock;
      if (page === pages.getCurrentPage() && shouldUnlockScrolling) {
        console.log(page.id, 'shouldUnlockScrolling');
        pages.unlockScrolling();
      }

      if (page !== pages.getCurrentPage() && shouldAdvance) {
        console.log(':: advanced »»', page.id);
      }

      if (page !== pages.getCurrentPage() && shouldAdvance && !fds.scrollLock) {
        if (pages.debug) pages.debugLog(page, pageRect, scrollDir);
        pages.triggerTopBarEvents(page);
        pages.setCurrentPage(page);
        pages.snapToPage(page);
      }
    }
  };

  pages.debugLog = function (page, pageRect, scrollDir) {
    /*
      Please leave this in here for now, very useful for debugging
    */
    console.log('');
    console.log('»» Snapping from: ', pages.getCurrentPage().id, 'to', page.id);
    console.log('  top:', pageRect.top);
    console.log('  bottom:', pageRect.bottom);
    console.log('  win.pageYOffset:', win.pageYOffset);
    console.log('  fds.scrollLock:', fds.scrollLock);
    console.log('  fds.scrollDir:', scrollDir);
    if (scrollDir === 'down') {
      console.log('  thresshold', fds.snapDownThreshhold);
    }
    else if (scrollDir === 'up') {
      console.log('  thresshold', fds.snapUpThreshhold);
    }
    console.log('');
  };

  pages.snapToPage = function (el) {
    var scrollTo;

    if (fds.scrollLock) {
      return;
    }
    console.log('snapToPage', el.id);
    fds.scrollLock = true;
    scrollTo = el.parentElement.offsetTop + el.offsetTop;
    console.log('scrollTo » ', scrollTo);
    fds.performantScrollTo(scrollTo, function () {
      pages.lockScrolling();
      el.classList.add('triggered');
      // console.log(":::", win.pageYOffset, scrollTo);
      pages.lastSnap = win.pageYOffset;
      pages.getCurrentPage().classList.add('pinned');
      pages.triggerVideo(el);
    }, 475);
  };

  pages.lockScrolling = function () {
    fds.scrollLock = true;
    // document.body.style.overflow = 'hidden';
    console.log('lock scrolling', pages.getCurrentPage().id);
  };

  pages.unlockScrolling = function () {
    var pinnedEl = pages.container.querySelector('.pinned');
    fds.scrollLock = false;
    console.log('unlock scrolling for', pinnedEl);
    document.body.style.overflow = 'auto';
    // win.scrollTo({
    //   top: pages.lastSnap,
    //   behavior: 'instant'
    // });
    if (pinnedEl) {
      pinnedEl.classList.add('unpinned');
      pinnedEl.classList.remove('pinned');
      console.log('-==-=-=-=-=-=-=');
    }
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

  pages.deTriggerVideo = function (page) {
    var plyr;
    var vidElement = page.querySelector('.ambient_video .plyr_embed');
    var embeddedVideo = page.querySelector('.video--embed .plyr_target');
    console.log('| deTriggerVideo | » |', page.id, vidElement, embeddedVideo);
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
