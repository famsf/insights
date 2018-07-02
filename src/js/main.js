(function (fds, win, doc, $) {
  var owl;
  // Initialize foundation.
  $(document).foundation();

  // Inform .off-canvas-wrapper that the mobile menu is open or closed.
  $('.off-canvas').on('opened.zf.offcanvas closed.zf.offcanvas', function () {
    $('body').toggleClass('off-canvas-opened');
  });

  // Close off canvas menu when menu link is clicked.
  $('.menu--mobile a').click(function () {
    $('.off-canvas').foundation('close');
  });

  // Initialize Owl Carousel.
  owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 2,
    merge: true,
    loop: false,
    nav: false,
    dots: false,
    margin: 32,
    mergeFit: true
  });

  fds.frameCount = 0;

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

    if (fds.calcFps) {
      elapsed = newtime - fds.then;
      didResize = false;
    }
    oldWindowDim = Object.assign({}, { w: win.innerWidth, h: win.innerHeight });
    if (win.innerWidth !== oldWindowDim.w || win.innerHeight !== oldWindowDim.h) {
      didResize = true;
    }
    if (elapsed > fds.FpsInterval) {
      fds.scroll.y = window.pageYOffset;
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
    console.log(win.poly);
    sy = window.pageYOffset;
    console.log(sy);
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
    fds.calcFps = true;
    fds.targetFps = 60;
    fds.FpsInterval = 1000 / fds.targetFps;
    fds.initialize();
  });
}(window.fds = window.fds || {}, window, document, jQuery));
