(function (fds, win, $) {
  var doc = win.document;
  var pages = {};
  fds.pages = pages;
  fds.pages.hashes = {};
  fds.pages.byId = {};
  fds.pages.oldScrollY = null;
  fds.pages.snapThreshhold = 20;
  fds.pages.snapScrollDuration = 450;

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

    pages.populatePagesById();
    pages.currentPage = pages.byId[pages.pages[0].id];
    pages.clearElement = doc.querySelector(clearElementSelector);
    pages.clearElementHeight = pages.clearElement.clientHeight;
    pages.calculateThreshholds();

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
        pages.hashes.page = locHash;
      }
      if (pages.hashes.page) {
        startPage = pages.byId[pages.hashes.page];
      }
      else {
        startPage = pages.currentPage;
      }
      pages.snapScroll(startPage, {
        scrollDir: 'down',
        instant: true,
        force: true
      });
    }
  };

  pages.populatePagesById = function () {
    var i;
    var page;
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
      page = {
        id: pageEl.id,
        el: pageEl,
        chapter: chapter,
        chapterIndex: chapter.dataset.chapterIndex,
        chapterLength: chapter.dataset.chapterLength,
        chapterId: chapter.id,
        nextPage: pageEl.nextElementSibling,
        index: pageEl.dataset.pageIndex,
        ambientVideoEl: ambientVideo,
        embeddedVideoEl: embeddedVideo,
        isPinned: false,
        isCurrent: false,
        inView: false
      };
      pages.byId[pageEl.id] = page;
      if (ambientVideo || embeddedVideo) {
        pages.triggerVideo(page);
      }
    }
  };

  pages.getCurrentPage = function () {
    var cp = pages.currentPage || pages.byId[pages.pages[0].id];
    return cp;
  };

  pages.nextPage = function (id) {
    pages.snapScroll(pages.byId[id], {
      scrollDir: 'down',
      unpin: true,
      force: true
    });
  };

  pages.setCurrentPage = function (page) {
    var pageEl;
    if (!page) {
      pages.currentPage = null;
      return;
    }
    pageEl = page.el;
    pages.oldCurrentPage = pages.currentPage;
    if (pages.oldCurrentPage && pages.oldCurrentPage.el) {
      pages.oldCurrentPage.isCurrent = false;
      pages.untriggerPage(pages.oldCurrentPage);
    }
    pages.currentPage = page;
    page.isCurrent = true;
    fds.chapterNav.setActiveItem(page.chapter);
    fds.mobileNav.setActiveItem(page.chapter);
    pages.currentPage.el.classList.add('current');
    window.location.hash = '&chapter=' + page.chapterId + '&page=' + pageEl.id;
    pages.hashes.page = pageEl.id;
    pages.hashes.chapter = page.chapterId;
    pages.triggerPage(page);
    return page;
  };

  pages.calculateThreshholds = function () {
    var wh = win.innerHeight;
    fds.snapDownthreshhold = wh * 0.40;
    fds.topBarDownthreshhold = wh * 0.40;
    fds.snapUpthreshhold = wh * 0.60;
    fds.topBarUpthreshhold = wh * 0.60;
  };

  pages.onScroll = function (scrollY, scrollDir, wh, didResize) {
    var currentPage = pages.getCurrentPage();
    var scrollDiff;
    var count = pages.pages.length;
    var pageIterator;
    var page;
    var pageEl;
    var pageRect;
    var pageMarginTop = 0;
    var pageTop;
    var pageBottom;
    var pagePastSnapThreshhold = false;
    var shouldTrigger = false;
    var inView = false;
    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    if (didResize) {
      // Only recalc if the window dimensions have changed.
      pages.calculateThreshholds();
    }
    if ((currentPage.isPinned === true && !fds.scrollLock) || fds.isTouching) {
      scrollDiff = Math.abs(scrollY - pages.oldScrollY || 0);
      pages.oldScrollY = scrollY;
      if (scrollDiff > pages.snapThreshhold) {
        pages.unpinPage(currentPage);
      }
    }
    else if (!fds.scrollLock && !fds.inTouching) {
      for (pageIterator = 0; pageIterator < count; pageIterator++) {
        pageEl = pages.pages[pageIterator];
        page = pages.byId[pageEl.id];
        if (!page.isPinned) {
          pageRect = pageEl.getBoundingClientRect();
          pageMarginTop = parseInt(win.getComputedStyle(pageEl).marginTop, 10);
          pageTop = pageRect.top + pageMarginTop;
          pageBottom = pageRect.bottom;
          if (scrollDir === 'down') {
            pagePastSnapThreshhold = pageTop < fds.snapDownthreshhold;
          }
          else if (scrollDir === 'up') {
            pagePastSnapThreshhold = pageBottom > fds.snapUpthreshhold;
          }
          page.inView = pageTop < wh && pageBottom > 0;
          shouldTrigger = pagePastSnapThreshhold && page.inView;
          if (shouldTrigger && pages.lastPinned !== page) {
            pages.snapScroll(page, {
              scrollDir: scrollDir
            });
          }
        }
      }
    }
  };

  /* We wouldnt need this sillyness if footer was a chapter */
  pages.scrollToFooter = function (footerOffset) {
    if (!fds.scrollLock) {
      pages.unpinPage(pages.getCurrentPage());
      pages.setCurrentPage(null);
      fds.scrollLock = true;
      fds.performantScrollTo(footerOffset, function () {
        setTimeout(function () {
          fds.scrollLock = false;
        });
      });
    }
  };

  pages.snapScroll = function (page, options) {
    var scrollTo;
    var scrollDir;
    var wh = win.innerHeight;
    var pageEl = page.el;
    var chapter = page.chapter;
    var snapScrollDuration = fds.pages.snapScrollDuration;
    if (options.unpin) {
      pages.unpinPage(pages.currentPage);
    }
    if (!options.force && (fds.scrollLock || page === pages.getCurrentPage() || !page)) {
      return;
    }
    document.body.classList.add('scroll_lock');
    pages.setCurrentPage(page);
    if (options.scrollDir === 'down') {
      scrollDir = 'down';
      scrollTo = chapter.offsetTop + pageEl.offsetTop;
    }
    else {
      scrollDir = 'up';
      scrollTo = (page.chapter.offsetTop + pageEl.offsetTop + pageEl.clientHeight) - wh;
    }
    fds.scrollLock = true;
    if (options.instant) {
      snapScrollDuration = 0;
    }
    fds.performantScrollTo(scrollTo, function () {
      pages.snapPoint = scrollTo;
      pages.pinPage(page, scrollDir);
      setTimeout(function () {
        pages.oldScrollY = win.pageYOffset;
        fds.scrollLock = false;
        document.body.classList.remove('scroll_lock');
      }, 150);
    }, snapScrollDuration);
  };

  pages.pinPage = function (page, scrollDir) {
    var pageEl = page.el;
    var nextChapter;
    if (page.nextPage) {
      page.nextPage.style.marginTop = page.el.clientHeight + 'px';
    }
    else {
      page.chapter.style.paddingBottom = page.el.clientHeight + 'px';
    }
    pages.lastPinned = null;
    page.isPinned = true;

    if (scrollDir === 'down') {
      pageEl.classList.add('pinnedTop');
    }
    else {
      pageEl.classList.add('pinnedBottom');
    }
  };

  pages.unpinPage = function (page) {
    page.isPinned = false;
    pages.lastPinned = page;

    if (page.nextPage) page.nextPage.style.marginTop = 0;
    page.chapter.style.paddingBottom = 0;
    if (page.snapPoint !== 0) {
      win.scrollTo({
        top: page.snapPoint,
        behavior: 'instant'
      });
    }
    page.el.classList.remove('pinnedBottom');
    page.el.classList.remove('pinnedTop');
  };

  pages.untriggerPage = function (page) {
    page.el.classList.remove('triggered');
    pages.untriggerVideo(page);
  };

  pages.triggerPage = function (page) {
    var pageEl = page.el;
    pages.triggerTopBarEvents(page);
    pageEl.classList.add('triggered');
    if (pageEl.classList.contains('hide-chapter-nav')) {
      fds.chapterNav.hideNav();
    }
    else if (fds.chapterNav.isHidden) {
      fds.chapterNav.showNav();
    }
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
          plyr.muted = true;
          plyr.play();
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
          plyr.play();
          plyr.pause();
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
        plyr.pause();
      }
    }
    if (page.embeddedVideo) {
      plyr = page.embeddedVideo;
      if (plyr) {
        plyr.pause();
      }
    }
  };

  pages.triggerTopBarEvents = function (page) {
    var pageEl = page.el;
    if (pageEl.classList.contains('dark')) {
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
