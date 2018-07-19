(function (fds, win, $) {
  var doc = win.document;
  var pages = {};
  fds.pages = pages;
  fds.pages.hashes = {};
  fds.pages.byId = {};
  fds.pages.oldScrollY = null;
  fds.pages.pinnedOffset = 0;
  fds.pages.snapThreshhold = 24;
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
    var chapterIndex;
    var ambientVideo;
    var embeddedVideo;
    var count = pages.pages.length;
    var nextPage;
    var previousPage;
    var pageRef;
    var pageArr;
    for (i = 0; i < count; i++) {
      pageEl = pages.pages[i];
      chapter = pageEl.parentElement;
      ambientVideo = pageEl.querySelector('.ambient_video .plyr_target');
      embeddedVideo = pageEl.querySelector('.video--embed .plyr_target');
      if (pageEl.nextElementSibling) {
        nextPage = pageEl.nextElementSibling;
      }
      else if (chapter.nextElementSibling) {
        nextPage = chapter.nextElementSibling.querySelector('.page');
      }
      if (pageEl.previousElementSibling) {
        previousPage = pageEl.previousElementSibling;
      }
      else if (chapter.previousElementSibling) {
        previousPage = chapter.previousElementSibling.querySelector('.page:last-of-type');
      }
      page = {
        id: pageEl.id,
        el: pageEl,
        chapter: chapter,
        chapterIndex: chapter.dataset.chapterIndex,
        chapterLength: chapter.dataset.chapterLength,
        chapterId: chapter.id,
        previousPage: previousPage,
        nextPage: nextPage,
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
    Object.keys(pages.byId).forEach(function (key) {
      pageArr = [];
      pageRef = pages.byId[key];
      pageArr[0] = (pageRef.previousPage) ? pages.byId[pageRef.previousPage.id] : null;
      pageArr[1] = 'self';
      pageArr[2] = (pageRef.nextPage) ? pages.byId[pageRef.nextPage.id] : null;
      pages.byId[key].pageArr = pageArr;
    });
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
    if (page) {
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
      window.location.hash = '&chapter=' + page.chapterId + '&page=' + pageEl.id;
      pages.hashes.page = pageEl.id;
      pages.hashes.chapter = page.chapterId;
      pages.triggerPage(page);
    }
  };

  pages.calculateThreshholds = function () {
    var wh = win.innerHeight;
    fds.snapDownthreshhold = wh * 0.47;
    fds.topBarDownthreshhold = wh * 0.47;
    fds.snapUpthreshhold = wh * 0.67;
    fds.topBarUpthreshhold = wh * 0.67;
  };

  pages.onScroll = function (scrollY, wh, didResize) {
    var currentPage = pages.getCurrentPage();
    var i = 0;
    var page;
    var pageEl;
    var pageRect;
    var pageTop;
    var pageBottom;
    var pagePastSnapThreshhold = false;
    var shouldTrigger = false;
    var inView = false;
    var count;
    var scrollDiff = scrollY - pages.oldScrollY || 0;
    var scrollDir = (scrollDiff >= 0) ? 'down' : 'up';
    pages.oldScrollY = scrollY;
    if (didResize) {
      // Only recalc if the window dimensions have changed.
      if (currentPage) {
        pages.pinnedOffset = currentPage.clientHeight;
      }
      pages.calculateThreshholds();
    }
    if (currentPage.isPinned === true && (!fds.scrollLock || fds.isTouching)) {
      if (Math.abs(scrollDiff) > pages.snapThreshhold) {
        pages.unpinPage(currentPage);
      }
    }
    else if (!fds.scrollLock && !fds.isTouching) {
      count = currentPage.pageArr.length;
      while (i < count) {
        page = currentPage.pageArr[i];
        i++;
        if (page === 'self') page = currentPage;
        if (page) {
          pageEl = page.el;
          if (!page.isPinned) {
            pageRect = pageEl.getBoundingClientRect();
            pageTop = pageRect.top + pages.pinnedOffset;
            pageBottom = pageRect.bottom + pages.pinnedOffset;
            page.inView = pageTop < wh && pageBottom > 0;
            if (scrollDir === 'down') {
              pagePastSnapThreshhold = pageTop < fds.snapDownthreshhold;
            }
            else if (scrollDir === 'up') {
              pagePastSnapThreshhold = pageBottom > fds.snapUpthreshhold;
            }
            shouldTrigger = pagePastSnapThreshhold && page.inView;
            if (shouldTrigger && pages.lastPinned !== page) {
              pages.snapScroll(page, {
                scrollDir: scrollDir
              });
            }
          }
        }
      }
    }
  };

  /* We wouldnt need this sillyness if footer was a chapter */
  pages.scrollToFooter = function (footerOffset) {
    if (!fds.scrollLock) {
      pages.unpinPage(pages.currentPage);
      pages.setCurrentPage(null);
      fds.scrollLock = true;
      fds.performantScrollTo(footerOffset, function () {
        setTimeout(function () {
          fds.scrollLock = false;
        });
      });
    }
  };

  pages.snapScroll = function (page, scrollOptions) {
    var scrollTo;
    var wh = win.innerHeight;
    var pageEl = page.el;
    var chapter = page.chapter;
    var snapScrollDuration = fds.pages.snapScrollDuration;
    if (!scrollOptions.force && (fds.scrollLock || page === pages.getCurrentPage() || !page)) {
      return;
    }
    if (scrollOptions.unpin) {
      pages.unpinPage(pages.currentPage);
    }
    pages.setCurrentPage(page);
    document.body.classList.add('scroll_lock');
    if (scrollOptions.scrollDir === 'down') {
      scrollTo = chapter.offsetTop + pageEl.offsetTop;
    }
    else {
      scrollTo = page.chapter.offsetTop + pageEl.offsetTop;
    }
    fds.scrollLock = true;
    if (scrollOptions.instant) {
      snapScrollDuration = 0;
    }
    fds.performantScrollTo(scrollTo, function () {
      pages.snapPoint = scrollTo;
      pages.pinPage(page, scrollOptions.scrollDir);
      pages.oldScrollY = win.pageYOffset;
      setTimeout(function () {
        fds.scrollLock = false;
        doc.body.classList.remove('scroll_lock');
        page.el.focus();
      }, 125);
    }, snapScrollDuration);
  };

  pages.pinPage = function (page, scrollDir) {
    var pageEl = page.el;
    var nextChapter;
    pages.pinnedOffset = page.el.clientHeight;
    pages.lastPinned = null;
    pages.pinned = page;
    page.isPinned = true;
    pageEl.classList.add('pinnedTop');
  };

  pages.unpinPage = function (page) {
    if (page.isPinned) {
      pages.lastPinned = page;
      page.isPinned = false;
      pages.pinned = false;
      pages.pinnedOffset = 0;
      page.el.classList.remove('pinnedTop');
      if (page.snapPoint !== 0) {
        win.scrollTo({
          top: page.chapter.offsetTop + page.el.offsetTop,
          behavior: 'instant'
        });
      }
    }
  };

  pages.untriggerPage = function (page) {
    page.el.classList.remove('triggered');
    page.isTriggered = false;
    pages.untriggerVideo(page);
  };

  pages.triggerPage = function (page) {
    var pageEl = page.el;
    page.istriggered = true;
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
