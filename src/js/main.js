(function (fds, window, document, $) {
  // Variable declarations.
  var horizontalImageSlider;
  var inDepthSlider;
  var inDepthSliderOptions = {
    margin: 0,
    loop: false,
    nav: true,
    dots: true,
    items: 1
  };

  // Always use the smoothscroll polyfill, even in browsers with native support.
  window.__forceSmoothScrollPolyfill__ = true;

  // Initialize Foundation.
  $(document).foundation();

  // Inform .off-canvas-wrapper that the mobile menu is open or closed.
  $('.off-canvas').on('opened.zf.offcanvas closed.zf.offcanvas', function () {
    $('body').toggleClass('off-canvas-opened');
  });

  // Close off canvas menu when menu link is clicked.
  $('.menu--mobile a').click(function () {
    $('.off-canvas').foundation('close');
  });

  // Initialize Horizontal Image Slider.
  horizontalImageSlider = $(':not(.in-depth-modal) > .horizontal-image-slider');
  horizontalImageSlider.owlCarousel({
    margin: 32,
    loop: false,
    nav: false,
    dots: false,
    items: 1,
    responsive: {
      1024: {
        autoWidth: true
      }
    }
  });

  // Initialize In Depth Slider.
  inDepthSlider = $('.in-depth-modal > .horizontal-image-slider');

  if (Foundation.MediaQuery.is('small only')) {
    inDepthSlider.addClass('off');
  }
  else {
    inDepthSlider.owlCarousel(inDepthSliderOptions);
  }

  $(window).resize(function () {
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

  fds.setStyle = function (el, obj) {
    el.style = Object.assign(el.style, obj);
  };

  fds.getParentEl = function (el, selector) {
    var elements = [];
    var ishaveselector = selector !== undefined;
    while (el.parentElement !== null) {
      el = el.parentElement;
      if (el.nodeType === Node.ELEMENT_NODE) {
        if (!ishaveselector || el.matches(selector)) {
          elements.push(el);
        }
      }
    }
    if (elements.length === 1) {
      elements = elements[0];
    }
    try {
      return elements;
    }
    finally {
      elements = null;
    }
  };

  $(document).ready(function () {
    var win = window;
    var frameCount = 0;
    var calcFps = true;
    var scrollDir;
    var st = 0;
    var animate;
    var wDim = {
      w: win.innerWidth,
      h: win.innerHeight
    };
    if (calcFps) {
      fds.targetFps = 60;
      fds.fpsInterval = 1000 / fds.targetFps;
    }

    if (!document.querySelector('.insights-app')) {
      console.log('Bypassing main js loop in current context to allow for easier single component prototyping');
      return;
    }

    fds.fpsEl = document.getElementById('fpsEl');
    window.fds.pages.initialize('.container', '.page', '.top-bar');
    window.fds.chapterNav.initialize('#chapter_nav', '.chapter', '.top-bar');
    window.fds.topBar.initialize('topBar');
    window.fds.pages.onScroll(0, 'down', win.innerHeight, true);
    window.fds.chapterNav.onScroll();
    animate = function (newtime) {
      var elapsed;
      var didResize;
      var msPerFrame;
      var oldWindowDim;
      var oldSt;
      var scrollDiff;
      var sinceStart;
      var currentFps;
      requestAnimationFrame(animate);
      if (calcFps) {
        elapsed = newtime;
        didResize = false;
        msPerFrame = 0;
      }
      oldWindowDim = Object.assign({}, wDim);
      wDim = {
        w: win.innerWidth,
        h: win.innerHeight
      };
      if (wDim.w !== oldWindowDim.w || wDim.h !== oldWindowDim.h) {
        didResize = true;
      }
      if (elapsed > fds.fpsInterval) {
        oldSt = st;
        st = window.poly.getScrollY();
        scrollDiff = st - oldSt;
        if (scrollDiff !== 0) {
          scrollDir = (scrollDiff > 0) ? 'down' : 'up';
          window.fds.pages.onScroll(st, scrollDir, wDim.h, didResize);
          window.fds.chapterNav.onScroll();
        }
      }
      if (calcFps) {
        sinceStart = newtime - fds.startTime;
        currentFps = Math.round(1000 / (sinceStart / ++frameCount));
        msPerFrame = Math.round(sinceStart / frameCount);
        fds.fpsEl.innerHTML = currentFps + ' fps at roughly<br/>' + msPerFrame + ' ms/frame';
      }
    };
    if (calcFps) {
      fds.startTime = window.performance.now();
    }
    requestAnimationFrame(animate);
  });
}(window.fds = window.fds || {}, window, document, jQuery));
