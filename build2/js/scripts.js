// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/previousElementSibling/previousElementSibling.md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('previousElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'previousElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.previousSibling) {
          if (el.nodeType === 1) {
            return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);

// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/nextElementSibling/nextElementSibling.md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('nextElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'nextElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.nextSibling) {
          if (el.nodeType === 1) {
              return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);

(function(fds, window) {
  // easing functions http://goo.gl/5HLl8
  fds.inOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return c/2*t*t + b
    }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  fds.easeOutCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
  };

  var requestAnimFrame = (function() {
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ) { window.setTimeout(callback, 1000 / 60); };
  })();

  fds.performantScrollTo = function(to, callback, duration) {
    var start = window.pageYOffset,
      change = to - start,
      currentTime = 0,
      increment = 20;
    duration = (typeof(duration) === 'undefined') ? 650 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      var val = fds.easeOutCubic(currentTime, start, change, duration);
      // scroll
      document.scrollingElement.scrollTop = val;
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof(callback) === 'function') {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  }
}( window.fds = window.fds || {}, window));

(function (fds, audioPlayer, window, document) {
  fds.initializeAudioPlayer = function (el) {
    var plyr;
    plyr = new Plyr(el, {
      hideControls: 'false',
      controls: ['play', 'progress', 'current-time', 'mute', 'volume']
    });
    plyr.volume = 7;
  };

  function audioPlayerCallback() {
    var player = document.querySelectorAll('audio');
    var count = player.length;
    var i;

    for (i = 0; i < count; i++) {
      fds.initializeAudioPlayer(player[i]);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    audioPlayerCallback();
  });
}(
  window.fds = window.fds || {},
  window.fds.audioPlayer = window.fds.audioPlayer || {},
  window,
  document
));

(function (document, window) {
  var captions = document.getElementsByClassName('zoom-caption');
  var i;
  if (captions.length > 0) {
    for (i = 0; i < captions.length; i++) {
      captions[i].style.left = captions[i].dataset.xCoord + '%';
      captions[i].style.top = captions[i].dataset.yCoord + '%';
    }
  }
}(document, window));

(function (document, window, $) {
  function toggleDisplays($zoomCarousels) {
    if ($zoomCarousels.length > 0) {
      if (Foundation.MediaQuery.atLeast('medium')) {
        $zoomCarousels.each(function (i, e) {
          $(e).css('display', 'none');
          $(e).siblings('.inline-image-zoom-wrapper').css('display', 'block');
        });
      }
      else {
        $zoomCarousels.each(function (i, e) {
          $(e).css('display', 'block');
          $(e).siblings('.inline-image-zoom-wrapper').css('display', 'none');
        });
      }
    }
  }
  function adjustNav($zoomCarousels) {
    var $nav;
    var $firstImg;
    if ($zoomCarousels.length > 0) {
      $nav = $zoomCarousels.find('.owl-nav');
      if ($nav.length > 0) {
        $firstImg = $($zoomCarousels.find('.zoom-img-mobile-wrapper').get(0));
        if ($firstImg.length > 0) {
          $nav.css('top', ($firstImg.outerHeight() * 0.55) + 'px');
        }
      }
    }
  }
  function adjustNavPageInit() {
    // Because onInitialized isn't perfect.
    var $zoomCarousels = $('.zoom-image--inline--mobile');
    setTimeout(function () {
      adjustNav($zoomCarousels);
    }, 500);
  }
  $(document).ready(function () {
    var $zoomCarousels = $('.zoom-image--inline--mobile');
    $(document).foundation();
    if ($zoomCarousels.length > 0) {
      toggleDisplays($zoomCarousels);
      $(window).on('resize orientationChange', function () {
        toggleDisplays($zoomCarousels);
        adjustNav($zoomCarousels);
      });
      $zoomCarousels.each(function (i, e) {
        if ($(e).closest('.grid-x').length !== 0) {
          $(e).css('margin-left', '-2rem');
        }
      });
      $zoomCarousels.owlCarousel({
        loop: true,
        margin: 5,
        singleItem: true,
        nav: true,
        items: 1,
        stagePadding: 0,
        navSpeed: 800,
        dotsSpeed: 800,
        onInitialized: adjustNavPageInit
      });
    }
  });
}(document, window, jQuery));

(function (window, $) {
  var $toggleButtons = $('.inline-caption-button');
  $toggleButtons.on('click', function () {
    $toggleButtons.removeClass('close');
    if ($(this).parent().siblings('.inline-caption-content').hasClass('show')) {
      $(this).parent().siblings('.inline-caption-content').removeClass('show');
    }
    else {
      $toggleButtons.parent().siblings('.inline-caption-content').removeClass('show');
      $(this).parent().siblings('.inline-caption-content').addClass('show');
      $(this).addClass('close');
    }
  });
}(window, jQuery));

/* eslint-disable */
// Disabling the linter because it can't detect ImageZoom's existence.
// See https://www.cssscript.com/simple-image-hover-zoom-javascript-library-imagezoom-js/
(function (document, window, $, ImageZoom) {
  $(document).ready(function () {
    $(document).foundation();
    if (document.querySelectorAll('.img-zoom-drag') > 0) {
      if (Foundation.MediaQuery.atLeast('large')) {
        var zoomedImages = new ImageZoom('.img-zoom-drag', { maxZoom: 2, backgroundImageColor: '#000' });
        $('.img-zoom-drag').mousemove(function (e) {
          var offset = $(this).offset();
          var finderBox = $(this).closest('.zoom-image--fullbleed').find('.finder-box');
          var relX = e.pageX - offset.left;
          var relY = e.pageY - offset.top;
          var imgWidth = $(this).width();
          var imgHeight = $(this).height();
          var percentThroughWidth = (relX / imgWidth * 100) * .5;
          var percentThroughHeight = (relY / imgHeight * 100)  * .5;
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;
          finderBox.css({
            'top': percentThroughHeight + '%',
            'left': percentThroughWidth + '%',
            'height': (windowHeight - 64) / 19 + 'px',
            'width': windowWidth / 19 + 'px'
          });
        });
      }
      else {
        // Can't show this section if we're on mobile devices.
        $('.img-zoom-drag').closest('section.page').css('display', 'none');
      }
      var zoomedImages = new ImageZoom('.img-zoom-drag', { maxZoom: 3, backgroundImageColor: '#000' });
    }
  });
}(document, window, jQuery, ImageZoom));

(function (fds, doc) {
  var topBar = {};
  fds.topBar = topBar;
  topBar.initialize = function (id) {
    topBar.el = document.getElementById(id);
    doc.addEventListener('topBarEvent', function (e) {
      switch (e.detail.action) {
        case 'invert':
          topBar.el.classList.add('invert');
          doc.querySelector('.insights-app').classList.add('invert');
          break;
        case 'reset':
          topBar.el.classList.remove('invert');
          doc.querySelector('.insights-app').classList.remove('invert');
          break;
        default:
          console.log('Warning: unknown topbar event.');
          break;
      }
    }, { passive: true });
  };
}(window.fds = window.fds || {}, document));

(function (fds, coverPage, win) {
  win.document.addEventListener('DOMContentLoaded', function () {
    fds.coverPageElement = document.getElementById('CoverPage');
    if (fds.coverPageElement) {
      fds.coverPageElement.backgroundClipPolyfill({
        patternID: 'mypattern',
        patternURL: fds.coverPageElement.dataset.bgImage,
        class: 'headline'
      });
    }
  });

  fds.coverPage.initialize = function () {
    var imgSrc = fds.coverPageElement.dataset.bgImage;
    var imgSize = fds.coverPageElement.dataset.bgImageSize;
    var imgAlt = fds.coverPageElement.dataset.bgImageAlt;
    var downArrow = fds.coverPageElement.querySelector('.down_arrow');
    var img = new Image();
    img.setAttribute('alt', imgAlt);
    // img.setAttribute('ci-responsive', true);
    // img.setAttribute('ci-src', imgSrc);
    // img.setAttribute('ci-size', imgSize);
    // img.setAttribute('ci-type', 'crop');
    img.setAttribute('src', imgSrc);
    img.classList.add('bg-image');
    fds.coverPageElement.querySelector('.underlay').appendChild(img);
    // jScaler.processImage(img);
    if (img.complete) {
      fds.onCoverImageLoaded();
    }
    else {
      img.addEventListener('load', function () {
        fds.onCoverImageLoaded();
      });
      img.addEventListener('error', function () {
        console.log('Failed to load cover image');
      });
    }
    downArrow.addEventListener('click', function (e) {
      e.preventDefault();
      fds.pages.nextPage(fds.coverPageElement.closest('.page').nextElementSibling.id);
    });
  };

  fds.onCoverImageLoaded = function () {
    fds.coverPageElement.classList.add('loaded');
    setTimeout(function () {
      fds.coverPageElement.classList.add('post_loaded');
      fds.rootElement.querySelector('.page').classList.add('triggered');
      win.document.body.classList.remove('loading');
      win.document.body.classList.remove('scroll_lock');
      fds.scrollLock = false;
      fds.rootElement.classList.add('initialized');
      setTimeout(function () {
        fds.coverPageElement.classList.add('initialized');
      }, 700);
    }, 1250);
  };
}(window.fds = window.fds || {}, window.fds.coverPage = window.fds.coverPage || {}, window));

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
    pages.populatePagesById();
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

  pages.setCurrentPage = function (page, extraParams) {
    var pageEl;
    var pageHash;
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
    pages.untriggerVideo(page);
    // Fire off.page.triggered event
    $(document).trigger('off.page.triggered');
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
  };

  pages.triggerVideo = function (page) {
    var plyr;
    var pageEl = page.el;
    var poster;
    var videoId;
    var videoParent;
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
          controls: ['play-large', 'play', 'progress', 'current-time', 'captions', 'settings', 'pip', 'fullscreen']
        });

        plyr.on('ready', function (e) {
          poster = page.embeddedVideoEl.dataset.poster;
          if (poster) {
            plyr.poster = poster;
          }
          page.embeddedVideo = plyr;
          plyr.pause();
        });

        plyr.on('playing', function (e) {
          videoId = plyr.media.id;
          videoParent = document.getElementById(videoId).parentElement.parentElement.parentElement;
          videoParent.classList.add('playing');
        });

        plyr.on('pause', function (e) {
          videoId = plyr.media.id;
          videoParent = document.getElementById(videoId).parentElement.parentElement.parentElement;
          videoParent.classList.remove('playing');
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

(function (fds, win, doc) {
  var chapterNav = {};
  fds.chapterNav = chapterNav;
  fds.chapterNav.isHidden = false;

  chapterNav.initialize = function (navSelector, chapterSelector, clearElementSelector) {
    var lastId;
    var navItems;
    var clearElement;
    var currentChapterIndex;
    var count;
    var i;
    var navItem;
    var a;
    chapterNav.nav = doc.getElementById(navSelector);
    navItems = chapterNav.nav.querySelectorAll('li');
    chapterNav.navItems = navItems;
    clearElement = fds.rootElement.querySelector(clearElementSelector);
    count = navItems.length;
    chapterNav.height = chapterNav.nav.querySelector('ul').clientHeight;
    chapterNav.clearHeight = (clearElement) ? clearElement.clientHeight : 0;
    chapterNav.chapters = fds.rootElement.querySelectorAll(chapterSelector);
    chapterNav.scrollPercent = chapterNav.nav.querySelector('.scroll_percent');
    for (i = 0; i < count; i++) {
      navItem = chapterNav.navItems[i];
      a = navItem.querySelector('a');
      if (chapterNav.chapters[i]) {
        a.setAttribute('data-top-target', chapterNav.chapters[i].offsetTop);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          chapterNav.onNavItemClicked(e.currentTarget);
        }, false);
      }
    }
    chapterNav.hideNav();
  };

  chapterNav.setActiveItem = function (targetChapter) {
    var chapterIndex;
    var count = chapterNav.navItems.length;
    var item;
    var i;
    chapterIndex = targetChapter.dataset.chapterIndex;
    chapterNav.currentChapterIndex = chapterIndex;
    item = chapterNav.navItems[chapterIndex];
    for (i = 0; i < count; i++) {
      if (i <= chapterIndex) {
        item.classList.add('past');
      }
      else {
        item.classList.remove('past');
      }
    }
    if (chapterNav.activeItem) {
      chapterNav.activeItem.classList.remove('active_item');
    }
    chapterNav.activeItem = item;
    item.classList.add('active_item');
    chapterNav.updateIndicator();
  };

  chapterNav.showNav = function () {
    chapterNav.nav.classList.remove('hidden');
    chapterNav.nav.classList.add('showy');
    chapterNav.isHidden = false;
  };

  chapterNav.hideNav = function () {
    chapterNav.nav.classList.add('hidden');
    chapterNav.nav.classList.remove('showy');
    chapterNav.isHidden = true;
  };

  chapterNav.onNavItemClicked = function (clickTarget) {
    var page;
    var pageEl;
    var chapter;
    var scrollDir;
    chapter = fds.rootElement.querySelector(clickTarget.getAttribute('href'));
    pageEl = chapter.querySelector('.page');
    page = fds.pages.byId[pageEl.id];
    // console.log(':::', chapter.dataset.chapterIndex, chapterNav.currentChapterIndex);
    if (fds.pages.currentPage) {
      if (chapter.dataset.chapterIndex > chapterNav.currentChapterIndex) {
        scrollDir = 'down';
      }
      else {
        scrollDir = 'up';
      }
    }
    fds.pages.snapScroll(page, {
      scrollDir: scrollDir,
      unpin: true
    });
  };

  chapterNav.updateIndicator = function () {
    var scrollY = win.pageYOffset;
    var page = fds.pages.getCurrentPage();
    var chapter = page.chapter;
    var chapterIndex = page.chapterIndex;
    var pageIndex = page.index ? page.index : 0;
    var pageCount = page.chapterLength;
    var chapterNavSegmentHeight = Math.round(chapterNav.height / (chapterNav.chapters.length - 1));
    var pageToChapterRatio = page.el.clientHeight / chapter.clientHeight;
    var id = page.id;
    var count;
    var i;
    var item;
    var href;
    var scrollbarHeight;
    var pageSegmentHeight = chapterNavSegmentHeight / pageCount;
    scrollbarHeight = (chapterIndex * chapterNavSegmentHeight);
    scrollbarHeight += pageSegmentHeight * pageIndex;
    chapterNav.scrollPercent.style.height = Math.round(scrollbarHeight) + 'px';
    if (chapterNav.lastId !== id) {
      chapterNav.lastId = id;
      count = chapterNav.navItems.length;
      for (i = 0; i < count; i++) {
        item = chapterNav.navItems[i];
        href = item.querySelector('a').getAttribute('href');
        if (href !== '#' + id) {
          item.classList.remove('active');
        }
        else {
          item.classList.add('active');
          window.location.hash = '#' + href;
        }
      }
      item = null;
    }
    page = null;
    chapter = null;
    id = null;
  };
}(window.fds = window.fds || {}, window, document));

(function (fds, win, doc) {
  var mobileNav = {};
  fds.mobileNav = mobileNav;

  mobileNav.initialize = function (navSelector) {
    var navItems;
    var count;
    var i;
    var item;
    var a;
    mobileNav.nav = doc.getElementById(navSelector);
    navItems = mobileNav.nav.querySelectorAll('li');
    mobileNav.navItems = navItems;
    count = navItems.length;
    for (i = 0; i < count; i++) {
      item = navItems[i];
      a = item.querySelector('a');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        mobileNav.onItemClicked(e.currentTarget);
      });
    }
  };

  mobileNav.onItemClicked = function (item) {
    fds.chapterNav.onNavItemClicked(item);
  };

  mobileNav.setActiveItem = function (targetChapter) {
    var chapterIndex;
    var count = fds.chapterNav.navItems.length;
    var item;
    var i;
    chapterIndex = targetChapter.dataset.chapterIndex;
    item = mobileNav.navItems[chapterIndex];
    if (mobileNav.activeItem) {
      mobileNav.activeItem.classList.remove('active_item');
    }
    mobileNav.activeItem = item;
    item.classList.add('active_item');
  };
}(window.fds = window.fds || {}, window, document));

(function (fds, sharingIcons, window, document) {
  fds.initializeSharingIcons = function (el) {
    var hash;
    var shareUrl;
    var shareFacebook;
    var shareTwitter;
    var url = window.location.origin + window.location.pathname;

    hash = encodeURIComponent(window.location.hash);
    if (el.closest('[data-snap-id]') !== null && el.closest('[data-snap-id]').dataset.snapId !== '') {
      hash += encodeURIComponent('&componentSnap=' + el.closest('[data-snap-id]').dataset.snapId);
    }
    shareUrl = url + hash;
    shareFacebook = el.querySelector('.share--facebook');
    shareTwitter = el.querySelector('.share--twitter');

    if (shareFacebook) {
      shareFacebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl);
    }

    if (shareTwitter) {
      shareTwitter.setAttribute('href', 'https://twitter.com/intent/tweet?url=' + shareUrl);
    }
  };

  function sharingIconsThrottle(fn, wait) {
    var time = Date.now();

    return function () {
      if ((time + wait) - (Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  function sharingIconsCallback() {
    var sharingIconWrapper = document.querySelectorAll('.sharing-icons');
    var count = sharingIconWrapper.length;
    var i;

    for (i = 0; i < count; i++) {
      fds.initializeSharingIcons(sharingIconWrapper[i]);
    }
  }

  window.addEventListener('scroll', sharingIconsThrottle(sharingIconsCallback, 1000));

  document.addEventListener('DOMContentLoaded', function () {
    sharingIconsCallback();
  });
}(
  window.fds = window.fds || {},
  window.fds.sharingIcons = window.fds.sharingIcons || {},
  window,
  document
));

(function (document, window, $) {
  var $spanTimelines = $('.timeline');
  $(document).foundation();

  function fadeSpanTimelineBorders($spanTimelinesElements) {
    var $spanYears;
    var windowTopPos;
    var elemTopPos;
    if (Foundation.MediaQuery.atLeast('large')) {
      $spanYears = $spanTimelinesElements.find('.timeline--year');
      $(window).on('scroll', function () {
        windowTopPos = $(window).scrollTop();
        $spanYears.each(function (i, elem) {
          elemTopPos = $(elem).offset().top;
          if (windowTopPos + 200 >= elemTopPos) {
            $(elem).find('.timeline-item-text').addClass('year-scrolled-to');
          }
        });
      });
    }
  }

  function alterTimelineTitleSizes() {
    var $yearTitles = $('.timeline-item-title');
    $yearTitles.each(function (i, e) {
      if ($(e).text().includes('–')) {
        $(e).addClass('smaller-text');
      }
    });
  }

  function calculateActiveTimelinePos($spanTimelinesElements) {
    $spanTimelinesElements.each(function (i, e) {
      var yearSpan = $(e).find('.timeline--year.active .timeline-item-title').text();
      var firstNumber = parseInt(yearSpan.substr(0, 4), 10);
      var lastNumber = (yearSpan.length > 4) ? parseInt(yearSpan.substr(7, 11), 10) : 0;
      $(e).find('.span-year').each(function (si, se) {
        var spanDiffTop;
        var posIndicatorHeight;
        var indicatorPos;
        if (parseInt($(se).text(), 10) <= firstNumber) {
          spanDiffTop = firstNumber - parseInt($(se).text(), 10);
          posIndicatorHeight = (lastNumber > 5 && lastNumber - firstNumber > 7) ?
            ((lastNumber - firstNumber) * 2.5) + 30 : 0;
          indicatorPos = parseInt($(se).position().top, 10);
          if ($(e).hasClass('no-year-span') && spanDiffTop !== 1) {
            spanDiffTop *= 10;
          }
          $spanTimelinesElements.find('.timespan-scroller-pos').css({
            top: 15 + indicatorPos + (spanDiffTop * 2.5) + 'px',
            height: posIndicatorHeight + 'px'
          });
          $spanTimelinesElements.find('.timespan-scroller-inner').css('top', '-' + (indicatorPos + (spanDiffTop * 1.25)) + 'px');
        }
      });
    });
  }

  function createTimespanYears($spanTimelinesElements) {
    $spanTimelinesElements.each(function (i, e) {
      var $spanTimelineElement = $(e);
      var years = [];
      var j;
      var firstYearText;
      var secondLastYearText;
      if ($spanTimelineElement.hasClass('year-span')) {
        $spanTimelineElement.append('<div class="timespan-scroller"><div class="timespan-scroller-inner"><div class="timespan-scroller-pos"></div></div></div>');
        firstYearText = parseInt($($spanTimelineElement.find('.timeline-item-title').get(0)).text().substring(0, 2) + '00', 10);
        secondLastYearText = parseInt($($spanTimelineElement.find('.timeline-item-title').get($spanTimelineElement.find('.timeline-item-title').length - 1)).text().substring(0, 2) + '00', 10);
        for (j = firstYearText; j < secondLastYearText + 100;) {
          years.push(j);
          j += 100;
        }
        years.push(j);
        years.push(j + 100);
        years.forEach(function (year) {
          $spanTimelineElement.find('.timespan-scroller-inner').append('<span class="span-year">' + year + '</span>');
        });
      }
    });
  }

  function createNonTimespanYears($spanTimelinesElements) {
    $spanTimelinesElements.each(function (i, e) {
      var $spanTimelineElement = $(e);
      var years = [];
      var j;
      var firstYearText;
      var secondLastYearText;
      if ($spanTimelineElement.hasClass('no-year-span')) {
        $spanTimelineElement.append('<div class="timespan-scroller"><div class="timespan-scroller-inner"><div class="timespan-scroller-pos"></div></div></div>');
        firstYearText = Math.floor(parseInt($($spanTimelineElement.find('.timeline-item-title').get(0)).text(), 10) / 10) * 10;
        secondLastYearText = Math.floor(parseInt($($spanTimelineElement.find('.timeline-item-title').get($spanTimelineElement.find('.timeline-item-title').length - 1)).text(), 10) / 10) * 10;
        for (j = firstYearText; j < secondLastYearText + 10;) {
          years.push(j);
          j += 10;
        }
        years.push(j);
        years.forEach(function (year) {
          $spanTimelineElement.find('.timespan-scroller-inner').append('<span class="span-year">' + year + '</span>');
        });
      }
    });
  }

  function constructSpanTimelines($spanTimelinesElements) {
    var windowY;
    alterTimelineTitleSizes();
    if (Foundation.MediaQuery.atLeast('large')) {
      createTimespanYears($spanTimelinesElements);
      $(window).on('scroll.timelineScroll', function (e) {
        windowY = $(window).scrollTop();
        $('.timeline--year').each(function (index, ele) {
          if (windowY + 500 >= $(ele).offset().top) {
            $('.timeline--year').removeClass('active');
            $(ele).addClass('active');
          }
        });
        calculateActiveTimelinePos($spanTimelinesElements);
      });
    }
    else {
      $(window).off('scroll.timelineScroll');
    }
  }

  $(document).ready(function () {
    fadeSpanTimelineBorders($spanTimelines);
    constructSpanTimelines($spanTimelines);
  });
}(document, window, jQuery));

/* eslint-disable */
(function ($) {
  $(document).ready(function () {
    $.fn.BeerSlider = function (options) {
      options = options || {};
      return this.each(function () {
        new BeerSlider(this, options);
      });
    };
    setTimeout(function(){
      $('.beer-slider').each(function (index, el) {
        $(el).BeerSlider(
          $(this).find('.beer-reveal').removeClass('pre-load')
        );
      });
    }, 1000);
  });
}(jQuery));

(function (fds, win, doc, $) {
  fds.frameCount = 0;
  /*
  This is not just for counting fps, fpsInterval is important to the renderloop
  */
  fds.calcFps = false;
  fds.targetFps = 55;
  fds.FpsInterval = 1000 / fds.targetFps;
  // Initialize Foundation.
  $(doc).foundation();
  fds.getHeight = function () {
    return doc.getElementById('insights-app').clientHeight;
  };
  fds.renderLoop = function (newtime) {
    var elapsed;
    var didResize;
    var msPerFrame;
    var scrollDiff;
    var oldWindowDim;
    var currentFps;
    var sinceStart;
    var scrollDir;
    var secondsSinceStart;
    var wh = win.innerHeight;
    requestAnimationFrame(fds.renderLoop);
    didResize = false;
    elapsed = newtime - fds.then;
    oldWindowDim = Object.assign({}, { w: win.innerWidth, h: wh });
    if (win.innerWidth !== oldWindowDim.w || wh !== oldWindowDim.h) {
      didResize = true;
    }
    if (elapsed > fds.FpsInterval) {
      fds.scroll.y = win.pageYOffset;
      scrollDiff = fds.scroll.y - fds.scroll.last.y;
      if (scrollDiff !== 0 && fds.rootElement.classList.contains('initialized')) {
        fds.pages.onScroll(fds.scroll.y, wh, didResize);
        // fds.chapterNav.onScroll();
      }
      if (fds.calcFps) {
        sinceStart = newtime - fds.startTime;
        fds.frameCount++;
        secondsSinceStart = sinceStart * 0.001;
        currentFps = fds.frameCount / secondsSinceStart;
        msPerFrame = sinceStart / fds.frameCount;
        fds.infoBox.innerHTML = Math.round(currentFps) + 'fps<br>At roughtly' + Math.round(msPerFrame) + 'ms/frame<br>currentPage: ' + fds.pages.getCurrentPage().id;
      }
      fds.then = newtime - (elapsed % fds.FpsInterval);
    }
    fds.scroll.last.y = fds.scroll.y;
  };

  fds.initialize = function () {
    var sy;
    if (!doc.querySelector('.insights-app')) {
      console.log('Bypassing stories javascript');
      return;
    }
    sy = window.pageYOffset;
    fds.scroll = {
      last: {
        y: sy
      },
      y: sy
    };
    doc.body.addEventListener('touchstart', function () {
      fds.isTouching = true;
    });
    doc.body.addEventListener('touchend', function () {
      fds.isTouching = false;
      fds.pages.onScroll(window.pageYOffset, window.innerHeight, false);
    });
    fds.scrollLock = true;
    doc.body.classList.add('scroll_lock');
    doc.body.classList.add('loading');
    fds.coverPage.initialize();
    fds.mobileNav.initialize('mobile_nav');
    fds.chapterNav.initialize('chapter_nav', '.chapter', '.top-bar');
    fds.chapterNav.showNav();
    fds.topBar.initialize('top-bar');
    fds.pages.initialize('.chapters_container', '.page', '.top-bar');

    fds.chapterNav.updateIndicator();
    fds.then = win.performance.now();
    fds.startTime = fds.then;
    if (fds.calcFps) {
      fds.infoBox = document.createElement('div');
      fds.infoBox.id = 'infoBox';
      fds.rootElement.appendChild(fds.infoBox);
    }
    requestAnimationFrame(fds.renderLoop);
  };

  $(document).ready(function () {
    // Variable declarations.
    var horizontalImageSliderPage;
    var horizontalImageSlider;
    var horizontalImageSliderOptions = {
      margin: 32,
      autoPlay: 1000,
      slideSpeed: 1000,
      smartSpeed: 1000,
      loop: false,
      nav: false,
      dots: true,
      items: 1,
      merge: true,
      mergeFit: true,
      responsive: {
        1024: {
          autoWidth: true
        }
      }
    };
    var inDepthSlider;
    var inDepthSliderOptions = {
      margin: 0,
      autoPlay: 1000,
      slideSpeed: 1000,
      smartSpeed: 1000,
      mouseDrag: false,
      loop: false,
      nav: true,
      dots: true,
      items: 1
    };

    // Inform .off-canvas-wrapper that the mobile menu is open or closed.
    $('.off-canvas').on('opened.zf.offcanvas closed.zf.offcanvas', function () {
      $('body').toggleClass('off-canvas-opened');
    });

    // Close off canvas menu when menu link is clicked.
    $('.menu--mobile a').click(function () {
      $('.off-canvas').foundation('close');
    });

    // Initialize Horizontal Image Slider.
    horizontalImageSlider = $(':not(.in-depth-slider) > .horizontal-image-slider');
    horizontalImageSliderPage = horizontalImageSlider.parents('.page');

    // Bind to page.triggered event allowing us to initialize horizontal sliders
    // as they enter the viewport.
    $(document).bind('on.page.triggered', function () {
      // Only initialize the slider if the page is triggered
      // and the slider hasn't already been initialized
      if (horizontalImageSliderPage.hasClass('triggered') && !horizontalImageSlider.hasClass('owl-loaded')) {
        horizontalImageSlider.owlCarousel(horizontalImageSliderOptions);
      }
    });

    horizontalImageSlider.find('.slide__icon--next svg').click(function () {
      horizontalImageSlider.trigger('next.owl.carousel');
    });

    // Initialize In Depth Slider.
    inDepthSlider = $('.in-depth-slider > .horizontal-image-slider');

    $('.slide--in-depth__intro__button').click(function () {
      $(this).closest('.in-depth-slider').toggleClass('open');
    });

    $('.in-depth__toggle').click(function () {
      $(this).closest('.in-depth-slider').toggleClass('open');

      // Simulate a click on the first slide dot nav link.
      $(this).siblings('.owl-carousel').find('.owl-dots .owl-dot:first-of-type').trigger('click');
    });

    if (Foundation.MediaQuery.is('small only')) {
      inDepthSlider.addClass('off');
    }
    else {
      inDepthSlider.owlCarousel(inDepthSliderOptions);
    }

    $(win).resize(function () {
      if (Foundation.MediaQuery.atLeast('medium')) {
        if ($('.owl-carousel').hasClass('off')) {
          inDepthSlider.owlCarousel(inDepthSliderOptions);
          inDepthSlider.removeClass('off');
        }
      }
      else {
        inDepthSlider.removeClass('owl-hidden');
        if (!$('.owl-carousel').hasClass('off')) {
          inDepthSlider.addClass('off').trigger('destroy.owl.carousel');
          inDepthSlider.find('.owl-stage-outer').children(':eq(0)').unwrap();
        }
      }
    });

    // Scroll Comparison JS.
    if ($('.scroll-comparison .wrapper .cell').length) {
      $('.scroll-comparison .wrapper .cell .picture').click(function () {
        $(this).closest('.cell').siblings('.cell').toggleClass('active');
        $(this).closest('.cell').toggleClass('active');
      });
    }

    // Transcription toggle.
    $('.transcript .transcript__toggle').click(function (e) {
      e.preventDefault();
      $(this).siblings('.transcript__text').toggleClass('active');
    });

    fds.rootElement = doc.querySelector('.insights-app');
    fds.initialize();
  });
}(window.fds = window.fds || {}, window, document, jQuery));

// Concatenate all the scripts!

