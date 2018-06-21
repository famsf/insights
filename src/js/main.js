(function (fds, window, document, $) {
  // Always use the smoothscroll polyfill, even in browsers with native support.
  window.__forceSmoothScrollPolyfill__ = true;

  // Initialize foundation.
  $(document).foundation();

  // Initialize Owl Carousel.
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 2,
    merge: true,
    loop: false,
    nav: false,
    dots: false,
    margin: 32,
    mergeFit: true
  });

  // Prevents scrolling vertically until all slides have been seen.
  // owl.on('mousewheel', '.owl-stage', function (e) {
  //   if (e.deltaY > 0) {
  //     owl.trigger('next.owl');
  //   }
  //   e.preventDefault();
  // });

  fds.setStyle = function (el, obj) {
    el.style = Object.assign(el.style, obj);
  };

  fds.getParentEl = function (el, selector) {
    var elements = [];
    var ishaveselector = selector !== undefined;
    while ((el = el.parentElement) !== null) {
      if (el.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }
      if (!ishaveselector || el.matches(selector)) {
        elements.push(el);
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
    if (calcFps) {
      fds.targetFps = 60;
      fds.FpsInterval = 1000 / fds.targetFps;
    }
    var st = 0;
    var wDim = {
      w: win.innerWidth,
      h: win.innerHeight
    };

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
      // console.log('»', newtime, )
      requestAnimationFrame(animate);
      var elapsed,
        didResize,
        msPerFrame,
        oldWindowDim;
      if (calcFps) {
        elapsed = newtime - then;
        didResize = false;
        msPerFrame = 0;
      }
      oldWindowDim = Object.assign({}, wDim);
      wDim = {
        w: win.innerWidth,
        h: win.innerHeight
      };
      if (wDim.w != oldWindowDim.w || wDim.h != oldWindowDim.h) {
        didResize = true;
      }
      if (elapsed > fds.FpsInterval) {
        var oldSt = st;
        st = window.poly.getScrollY();
        var scrollDiff = st - oldSt;
        if (scrollDiff != 0) {
          scrollDir = (scrollDiff > 0) ? 'down' : 'up';
          window.fds.pages.onScroll(st, scrollDir, wDim.h, didResize);
          window.fds.chapterNav.onScroll();
        }
      }
      if (calcFps) {
        var sinceStart = newtime - fds.startTime;
        var currentFps = Math.round((1000 / (sinceStart / ++frameCount) * 100) * 0.01);
        var curFrameTime = elapsed;
        var msPerFrame = Math.round(sinceStart / frameCount);
        fds.fpsEl.innerHTML = currentFps + ' fps at roughly<br/>' + msPerFrame + ' ms/frame';
        then = newtime - (elapsed % fds.FpsInterval);
        sinceStart = currentFps = curFrameTime = msPerFrame = null;
      }
    };
    if (calcFps) {
      var then = window.performance.now();
      fds.startTime = then;
    }
    requestAnimationFrame(animate);
    then = elapsed = didResize = msPerFrame = oldWindowDim = scrollDir = null;
  });
}(window.fds = window.fds || {}, window, document, jQuery));
