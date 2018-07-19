(function (fds, win, doc, $) {

  fds.frameCount = 0;
  /* This is not just for counting fps, fpsInterval is important to the renderloop */
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
        fds.chapterNav.onScroll(fds.scroll.y);
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
      if (fds.scroll.y > fds.rootElement.clientHeight) {
        fds.chapterNav.hideNav();
      }
    }
    fds.scroll.last.y = fds.scroll.y;
  };

  fds.initialize = function () {
    var sy;
    if (!doc.querySelector('.insights-app')) {
      console.log('Bypassing main js loop in current context to allow for easier single component prototyping');
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
    });
    fds.scrollLock = true;
    doc.body.classList.add('scroll_lock');
    doc.body.classList.add('loading');
    fds.coverPage.initialize();
    fds.mobileNav.initialize('mobile_nav');
    fds.chapterNav.initialize('chapter_nav', '.chapter', '.top-bar');
    fds.chapterNav.showNav();
    fds.topBar.initialize('topBar');
    fds.pages.initialize('.chapters_container', '.page', '.top-bar');
    fds.footer = doc.getElementById('insights__footer');
    fds.chapterNav.onScroll(sy);
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

    fds.rootElement = doc.querySelector('.insights-app');
    fds.initialize();

    // Variable declarations.
    var horizontalImageSlider;
    var horizontalImageSliderOptions = {
      margin: 32,
      autoPlay: 1000,
      slideSpeed: 1000,
      smartSpeed: 1000,
      loop: false,
      nav: true,
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
    horizontalImageSlider = $(':not(.in-depth-modal) > .horizontal-image-slider');
    horizontalImageSlider.owlCarousel(horizontalImageSliderOptions);

    horizontalImageSlider.find('.slide__icon--next svg').click(function () {
      horizontalImageSlider.trigger('next.owl.carousel');
    });

    // Initialize In Depth Slider.
    inDepthSlider = $('.in-depth-modal > .horizontal-image-slider');

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
      $('.scroll-comparison .wrapper .cell').click(function () {
        $(this).siblings('.cell').toggleClass('active');
        $(this).toggleClass('active');
      });
    }

    // In Depth Slider Modal Close Methods.
    $('.in-depth-modal .modal__close-button').click(function () {
      // Simulate a click on the first slide dot nav link.
      $(this).siblings('.owl-carousel').find('.owl-dots .owl-dot:first-of-type').trigger('click');
    });

  });
}(window.fds = window.fds || {}, window, document, jQuery));
