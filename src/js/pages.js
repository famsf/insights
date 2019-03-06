(function (fds, win, $) {
  var doc = win.document;
  var pages = {};
  fds.pages = pages;
  fds.pages.hashes = {};
  fds.pages.byId = {};
  fds.pages.oldScrollY = null;
  fds.pages.pinnedOffset = 0;
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
    var snapElem;
    var snapElemStickListener;
    var scrollOptions;
    var initialChapter;
    pages.container = doc.querySelector(containerSelector);
    pages.pages = doc.querySelectorAll(pageSelector);
    pages.preloadElements = pages.container.querySelectorAll('.video--embed, .scroll-comparison, in-depth, .horizontal-image-slider');
    if (!pages.container || !pages.pages.length) {
      console.log(':::::: Warning: Failed to initialize pages, check your selectors, but maybe you`re just prototyping isolated components');
      return;
    }
    pages.instantiatePages();
    pages.currentPage = pages.byId[pages.pages[0].id];
    pages.clearElement = doc.querySelector(clearElementSelector);
    pages.clearElementHeight = pages.clearElement.clientHeight;
    pages.chapters = doc.querySelectorAll('.chapter');
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
      if (pages.hashes.chapter) {
        initialChapter = document.getElementById(pages.hashes.chapter);
      }
      scrollOptions = {
        scrollDir: 'down',
        instant: true,
        force: true
      };
      if (pages.hashes.hasOwnProperty('componentSnap')) {
        Object.assign({ extraParams: '&componentSnap=' + pages.hashes.componentSnap }, scrollOptions);
      }
      pages.snapScroll(startPage, scrollOptions);
      if (pages.hasOwnProperty('hashes') && pages.hashes.hasOwnProperty('componentSnap')) {
        snapElem = startPage.el.querySelectorAll('[data-snap-id="' + pages.hashes.componentSnap + '"]');
        if (snapElem.length > 0) {
          if (snapElem[0].style['background-color'] === '' || snapElem[0].style['background-color'] === 'transparent') {
            snapElem[0].style['background-color'] = 'white';
          }
          snapElem[0].classList.add('page-load-snap-sticky');
          // Set timeout is nasty, I know. But we need to wait for the initial scroll to finish.
          setTimeout(function () {
            snapElemStickListener = function (e) {
              snapElem[0].classList.remove('page-load-snap-sticky');
              snapElem[0].style = '';
              window.removeEventListener('scroll', snapElemStickListener);
              window.scrollTo(0, 0);
            };
            window.addEventListener('scroll', snapElemStickListener);
          }, 2000);
        }
      }
    }
    else {
      initialChapter = document.querySelector('.chapter');
    }
    fds.chapterNav.setActiveItem(initialChapter);
    fds.mobileNav.setActiveItem(initialChapter);
  };

  pages.instantiatePages = function () {
    var i;
    var page;
    var pageEl;
    var chapter;
    var chapterIndex;
    var ambientVideo;
    var embeddedVideo;
    var timeline;
    var zoomImageInline;
    var count = pages.pages.length;
    var nextPage;
    var previousPage;
    var pageRef;
    var pageArr;
    for (i = 0; i < count; i++) {
      pageEl = pages.pages[i];
      chapter = pageEl.parentElement;
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
        isPinned: false,
        isCurrent: false,
        inView: false
      };
      pages.byId[pageEl.id] = page;
      pages.instantiateComponents(page);
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

  pages.instantiateComponents = function (page) {
    // Get components into vars
    var pageEl = page.el;
    var timeline = pageEl.querySelector('.timeline');
    var ambientVideo = pageEl.querySelector('.ambient_video .plyr_target');
    var embeddedVideo = pageEl.querySelector('.video--embed .plyr_target');
    var zoomImageInline = pageEl.querySelector('.inline-image-zoom-wrapper');
    // Populate the page object
    page.components = {
      ambientVideo: {
        el: ambientVideo
      },
      embeddedVideo: {
        el: embeddedVideo
      },
      timeline: {
        el: timeline
      },
      zoomImageInline: {
        el: zoomImageInline
      }
    };
    // Loop through them and instantiate them
    Object.entries(page.components).forEach(function (key) {
      if (key[1].el) {
        // console.log('instantiate', key[0]);
        fds.components[key[0]].instantiate(page);
      }
    });
  };

  pages.triggerComponents = function (page) {
    // Stuff
    Object.entries(page.components).forEach(function (key) {
      if (key[1].el) {
        // console.log('trigger', key[0]);
        fds.components[key[0]].trigger(page);
      }
    });
  };

  pages.untriggerComponents = function (page) {
    // Stuff
    Object.entries(page.components).forEach(function (key) {
      if (key[1].el) {
        // console.log('untrigger', key[0]);
        fds.components[key[0]].untrigger(page);
      }
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

  pages.setCurrentPage = function (page, extraParams) {
    var pageEl;
    var pageHash;
    // console.log('setCurrentPage', page.id);
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
      pageHash = '&chapter=' + page.chapterId + '&page=' + pageEl.id;
      pageHash += (extraParams !== undefined) ? extraParams : '';
      window.location.hash = pageHash;
      pages.hashes.page = pageEl.id;
      pages.hashes.chapter = page.chapterId;
      pages.triggerPage(page);
    }
  };

  pages.calculateThreshholds = function () {
    var wh = win.innerHeight;
    fds.snapDownthreshhold = wh * 0.32;
    fds.topBarDownthreshhold = wh * 0.32;
    fds.snapUpthreshhold = wh * 0.68;
    fds.topBarUpthreshhold = wh * 0.68;
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
    var scrollDir;
    var scrollDiff = (scrollY - pages.oldScrollY).toPrecision(4) || 0;
    scrollY = Math.round(scrollY);
    pages.oldScrollY = scrollY;
    if (scrollDiff > 0) {
      scrollDir = 'down';
    }
    else if (scrollDiff < 0) {
      scrollDir = 'up';
    }
    if (!scrollDiff) return;
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
            pageTop = pageRect.top;
            pageBottom = pageRect.bottom;
            page.inView = pageTop < wh && pageBottom > 0;
            if (scrollDir === 'down') {
              pagePastSnapThreshhold = pageTop < fds.snapDownthreshhold;
            }
            else if (scrollDir === 'up') {
              pagePastSnapThreshhold = pageBottom > fds.snapUpthreshhold;
            }
            shouldTrigger = pagePastSnapThreshhold && page.inView;
            if (shouldTrigger && pages.lastPinned !== page) {
              scrollDir = page.index > currentPage.index ? 'down' : 'up';
              pages.snapScroll(page, {
                scrollDir: scrollDir
              });
            }
          }
        }
      }
    }
  };

  pages.snapScroll = function (page, scrollOptions) {
    var scrollTo;
    var wh = win.innerHeight;
    var pageEl = page.el;
    var chapter = page.chapter;
    var snapScrollDuration = fds.pages.snapScrollDuration;
    // console.log('snapScroll', page.id);
    if (!scrollOptions.force && (fds.scrollLock || page === pages.getCurrentPage() || !page)) {
      return;
    }
    if (scrollOptions.unpin) {
      pages.unpinPage(pages.currentPage);
    }
    if (scrollOptions.extraUrlParams) {
      pages.setCurrentPage(page, scrollOptions.extraUrlParams);
    }
    else {
      pages.setCurrentPage(page);
    }
    document.body.classList.add('scroll_lock');
    if (scrollOptions.scrollDir === 'down' || pages.isLastChapter(chapter.id)) {
      scrollTo = chapter.offsetTop + pageEl.offsetTop;
    }
    else {
      scrollTo = chapter.offsetTop + pageEl.offsetTop + (pageEl.clientHeight - wh);
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
        pages.postSnap(page);
        page.el.focus();
        fds.chapterNav.updateIndicator();
      }, 125);
    }, snapScrollDuration);
  };

  pages.postSnap = function (page) {
    page.el.classList.add('snapped');
    pages.triggerTopBarEvents(page);
  };

  pages.isLastChapter = function (chapterId) {
    return pages.chapters[pages.chapters.length - 1].id === chapterId;
  };

  pages.pinPage = function (page, scrollDir) {
    var pageEl = page.el;
    var nextChapter;
    // pinning on the footer is a no go.
    if (pages.isLastChapter(page.chapter.id)) {
      return;
    }
    pages.pinnedOffset = page.el.clientHeight;
    pages.lastPinned = null;
    pages.pinned = page;
    page.isPinned = true;
    pageEl.classList.add('inViewport');
    if (scrollDir === 'down') {
      pageEl.classList.add('pinnedTop');
    }
    else {
      pageEl.classList.add('pinnedBottom');
    }
  };

  pages.unpinPage = function (page) {
    var pinning;
    var scrollTo;
    var pageEl;
    var pageTop;
    if (page.isPinned) {
      pageEl = page.el;
      pages.lastPinned = page;
      page.isPinned = false;
      pages.pinnedOffset = 0;
      pages.pinned = false;
      pageEl.classList.remove('snapped');
      pageEl.classList.remove('pinnedTop');
      pageEl.classList.remove('pinnedBottom');
      win.scrollTo({
        top: pages.snapPoint,
        behavior: 'instant'
      });
    }
  };

  pages.untriggerPage = function (page) {
    // console.log('untrigger', page.id);
    page.el.classList.remove('triggered');
    page.el.classList.remove('inViewport');
    page.isTriggered = false;
    // pages.untriggerVideo(page);
    // Fire off.page.triggered event
    $(document).trigger('off.page.triggered');
    pages.untriggerComponents(page);
  };

  pages.triggerPage = function (page) {
    var pageEl = page.el;
    // console.log('triggerTopBarEvents', page.id);
    page.istriggered = true;
    pageEl.classList.add('triggered');
    // Fire on.page.triggered event
    $(document).trigger('on.page.triggered');
    if (pageEl.classList.contains('hide-chapter-nav')) {
      fds.chapterNav.hideNav();
    }
    else if (fds.chapterNav.isHidden) {
      fds.chapterNav.showNav();
    }
    pages.triggerComponents(page);
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
