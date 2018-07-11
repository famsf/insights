(function (fds, win, $) {
  var doc = win.document;
  var pages = {};
  fds.pages = pages;
  fds.pages.hashes = {};
  fds.pages.byId = {};
  fds.pages.oldScrollY = null;
  fds.pages.snapThreshhold = 24;

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
      console.log(':::::: Warning: Failed to initialize pages, check your selectors, but maybe you`re just prototyping isolated components');
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
      pages.snapScroll(pages.byId[startPage.id]);
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

  pages.nextPage = function (nextPageEl) {
    pages.snapScroll(pages.byId[nextPageEl.id], 'down', win.innerHeight);
  };

  pages.setCurrentPage = function (page) {
    var pageEl = page.el;
    pages.oldCurrentPage = pages.currentPage;
    if (pages.oldCurrentPage && pages.oldCurrentPage.el) {
      pages.oldCurrentPage.el.classList.remove('current');
    }
    pages.currentPage = page;
    // console.log('pages.setCurrentPage', page.id, page.chapter);
    fds.chapterNav.setActiveItem(page.chapter);
    fds.mobileNav.setActiveItem(page.chapter);
    pages.currentPage.el.classList.add('current');
    window.location.hash = '&chapter=' + page.chapterId + '&page=' + pageEl.id;
    pages.hashes.page = pageEl.id;
    pages.hashes.chapter = page.chapterId;
    return page;
  };

  pages.calculateThreshholds = function () {
    var wh = win.innerHeight;
    fds.snapDownthreshhold = wh * 0.45;
    fds.topBarDownthreshhold = wh * 0.45;
    fds.edgeDownthreshhold = -1 * wh * 0.1;
    fds.snapUpthreshhold = wh * 0.55;
    fds.topBarUpthreshhold = wh * 0.55;
    fds.edgeUpthreshhold = wh * 0.1;
  };

  pages.onScroll = function (scrollY, scrollDir, wh, didResize) {
    var currentPage = pages.getCurrentPage();
    var scrollDiff;
    var count = pages.pages.length;
    var page;
    var pageEl;
    var pageTop;
    var pageMarginTop;
    var pageIterator;
    var pageRect;
    var pageNearEdge;
    var pageTopAboveViewportTop;
    var shouldTrigger = false;
    var otherCondition;
    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    if (currentPage.pinned === true && !fds.scrollLock) {
      scrollDiff = Math.abs(scrollY - pages.oldScrollY || 0);
      pages.oldScrollY = scrollY;
      if (scrollDiff > pages.snapThreshhold) {
        pages.unpinPage(currentPage);
      }
    }
    else if (!fds.scrollLock) {
      for (pageIterator = 0; pageIterator < count; pageIterator++) {
        pageEl = pages.pages[pageIterator];
        page = pages.byId[pageEl.id];
        if (!page.pinned) {
          pageRect = pageEl.getBoundingClientRect();
          pageMarginTop = parseInt(pageEl.style.marginTop, 10);
          if (pageMarginTop) {
            pageTop = Number(pageRect.top) + pageMarginTop;
          }
          else {
            pageTop = pageRect.top;
          }
          pageTopAboveViewportTop = pageTop < 0;
          if (didResize) {
            pages.calculateThreshholds(wh, scrollDir);
          }
          if (scrollDir === 'down') {
            pageNearEdge = pageTop >= fds.edgeDownthreshhold;
            otherCondition = pageTop <= fds.topBarDownthreshhold;
            shouldTrigger = pageNearEdge && otherCondition;
            if (!shouldTrigger && (pageTop >= wh || pageRect.bottom <= 0)) {
              pages.untriggerPage(page);
            }
          }
          else if (scrollDir === 'up') {
            pageNearEdge = pageRect.bottom >= wh - fds.edgeUpthreshhold;
            otherCondition = pageTop <= fds.topBarUpthreshhold && pageTop < wh;
            shouldTrigger = pageNearEdge && otherCondition;
            if (!shouldTrigger && (pageTopAboveViewportTop >= wh || pageRect.bottom <= 0)) {
              pages.untriggerPage(page);
            }
          }
          if (shouldTrigger && pages.lastPinned !== page) {
            pages.triggerTopBarEvents(pageEl);
            pages.snapScroll(page, scrollDir, wh);
          }
        }
      }
    }
  };

  pages.snapScroll = function (page, scrollDir, wh, unpin) {
    var scrollTo;
    var pageEl = page.el;
    var chapter = page.chapter;
    if (unpin) {
      pages.unpinPage(pages.getCurrentPage());
    }
    if (fds.scrollLock || page === pages.getCurrentPage() || !page) return;
    document.body.style.overflow = 'hidden';
    pages.setCurrentPage(page);
    if (scrollDir === 'down') {
      scrollTo = chapter.offsetTop + pageEl.offsetTop;
    }
    else {
      scrollTo = (chapter.offsetTop + pageEl.offsetTop + pageEl.clientHeight) - wh;
    }
    fds.scrollLock = true;
    fds.performantScrollTo(scrollTo, function () {
      pages.snapPoint = scrollTo;
      pages.triggerPage(page);
      setTimeout(function () {
        pages.oldScrollY = win.pageYOffset;
        fds.scrollLock = false;
        document.body.style.overflow = 'auto';
        pages.pinPage(page);
      }, 250);
    }, 375);
  };

  pages.pinPage = function (page) {
    var pageEl = page.el;
    pages.lastPinned = null;
    page.pinned = true;
    pageEl.classList.add('pinned');
  };

  pages.unpinPage = function (page) {
    page.pinned = false;
    pages.lastPinned = page;
    if (page.nextPage) page.nextPage.style.marginTop = 0;
    page.chapter.style.paddingBottom = 0;
    if (page.snapPoint !== 0) {
      win.scrollTo({
        top: page.snapPoint
      });
    }
    page.el.classList.remove('pinned');
  };

  pages.triggerPage = function (page) {
    var pageEl = page.el;
    pageEl.classList.add('triggered');
    if (page.nextPage) {
      page.nextPage.style.marginTop = pageEl.clientHeight;
    }
    else {
      page.chapter.style.paddingBottom = pageEl.clientHeight;
    }
    pages.triggerVideo(page);
  };

  pages.untriggerPage = function (page) {
    var pageEl = page.el;
    pageEl.classList.remove('triggered');
    pages.untriggerVideo(pageEl);
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
      /*
        We gain in performance if instead of this we target the elements that care
        Which is why i liked the event model, but this site is so small, and
        turns out dispatching events is computationally spensive.
      */
      doc.body.classList.add('theme--dark');
    }
    else {
      doc.body.classList.remove('theme--dark');
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
