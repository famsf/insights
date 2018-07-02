(function (fds, win, doc, $) {
  // Variable declarations.
  var horizontalImageSlider;
  var horizontalImageSliderOptions = {
    margin: 32,
    loop: false,
    nav: false,
    dots: false,
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

  // Initialize Foundation.
  $(doc).foundation();

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

  fds.frameCount = 0;

  // In Depth Slider Modal Close Methods.
  $('.in-depth-modal .modal__close-button').click(function () {
    // Simulate a click on the first slide dot nav link.
    $(this).siblings('.owl-carousel').find('.owl-dots .owl-dot:first-of-type').trigger('click');
  });

  fds.setStyle = function (el, obj) {
    el.style = Object.assign(el.style, obj);
  };

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

    requestAnimationFrame(fds.renderLoop);
    didResize = false;
    if (fds.calcFps) {
      elapsed = newtime - fds.then;
    }
    oldWindowDim = Object.assign({}, { w: win.innerWidth, h: win.innerHeight });
    if (win.innerWidth !== oldWindowDim.w || win.innerHeight !== oldWindowDim.h) {
      didResize = true;
    }
    if (elapsed > fds.FpsInterval) {
      fds.scroll.y = win.pageYOffset;
      scrollDiff = fds.scroll.y - fds.scroll.last.y;
      if (scrollDiff !== 0) {
        scrollDir = (scrollDiff > 0) ? 'down' : 'up';
        fds.pages.onScroll(fds.scroll.y, scrollDir, win.innerHeight, didResize);
        fds.chapterNav.onScroll(fds.scroll.y);
      }
      if (fds.calcFps) {
        sinceStart = newtime - fds.startTime;
        fds.frameCount++;
        secondsSinceStart = sinceStart * 0.001;
        currentFps = fds.frameCount / secondsSinceStart;
        msPerFrame = sinceStart / fds.frameCount;
        fds.fpsEl.innerHTML = Math.round(currentFps) + 'fps at roughtly <br> ' + Math.round(msPerFrame) + 'ms/frame<br>currentPage: ' + fds.pages.getCurrentPage().id + '<br>y:' + fds.scroll.y;
        fds.then = newtime - (elapsed % fds.FpsInterval);
      }
      if (fds.footer.getBoundingClientRect().top < win.innerHeight * 0.66667) {
        fds.chapterNav.nav.classList.add('fade');
      }
      else {
        fds.chapterNav.nav.classList.remove('fade');
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
    fds.rootElement = doc.querySelector('.insights-app');
    fds.fpsEl = doc.getElementById('fpsEl');
    fds.pages.initialize('.chapters_container', '.page', '.top-bar');
    fds.chapterNav.initialize('chapter_nav', '.chapter', '.top-bar');
    fds.topBar.initialize('topBar');
    fds.footer = doc.getElementById('insights__footer');
    fds.pages.onScroll(0, 'down', win.innerHeight, true);
    fds.chapterNav.onScroll(0);
    fds.renderLoop();
    if (fds.calcFps) {
      fds.then = win.performance.now();
      fds.startTime = fds.then;
    }
    requestAnimationFrame(fds.renderLoop);
  };

  doc.addEventListener('DOMContentLoaded', function () {
    fds.calcFps = false;
    fds.targetFps = 60;
    fds.FpsInterval = 1000 / fds.targetFps;
    fds.initialize();
  });
}(window.fds = window.fds || {}, window, document, jQuery));
