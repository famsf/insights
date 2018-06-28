(function(fds, window, document, $ ) {

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

  fds.setStyle = function(el, obj) {
    el.style = Object.assign(el.style, obj)
  }

  fds.getParentEl = function(el, selector) {
    var elements = []
    var ishaveselector = selector !== undefined
    while ((el = el.parentElement) !== null) {
      if (el.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }
      if (!ishaveselector || el.matches(selector)) {
        elements.push(el);
      }
    }
    if (elements.length === 1) {
      elements = elements[0]
    }
    try {
      return elements;
    }
    finally {
      elements = null;
    }
  }

  fds.getScrollY = function() {
    return window.poly.getScrollY();
  }

  fds.getHeight = function() {
    return document.getElementById('insights-app').clientHeight;
  }

  $(document).ready(function () {

    var win = window
    var frameCount = 0
    var calcFps = true
    var scrollDir
    if(calcFps) {
      fds.targetFps = 60
      fds.FpsInterval = 1000 / fds.targetFps
    }
    var wDim = {
      w: win.innerWidth,
      h: win.innerHeight
    }

    if (!document.querySelector('.insights-app')) {
      console.log('Bypassing main js loop in current context to allow for easier single component prototyping')
      return;
    } else {
      fds.rootElement = document.querySelector('.insights-app');
    }

    fds.fpsEl = document.getElementById('fpsEl')
    console.log('rootElement', window.fds.rootElement)
    fds.pages.initialize('.chapters_container', '.page', '.top-bar')
    fds.chapterNav.initialize('chapter_nav', '.chapter', '.top-bar')
    fds.topBar.initialize('topBar')
    fds.pages.onScroll(0, 'down', win.innerHeight, true)
    fds.chapterNav.onScroll(0)
    animate = function (newtime) {
      // console.log('»', newtime, )
      requestAnimationFrame(animate);
      var elapsed, didResize, msPerFrame, oldWindowDim;
      if (calcFps) {
        elapsed =  newtime - then
        didResize = false
        msPerFrame = 0
      }
      oldWindowDim = Object.assign({}, wDim)
      wDim = {
        w: win.innerWidth,
        h: win.innerHeight
      }
      if (wDim.w != oldWindowDim.w || wDim.h != oldWindowDim.h) {
        didResize = true
      }
      if (elapsed > fds.FpsInterval) {
        var oldScrollY = scrollY || 0
        scrollY = window.poly.getScrollY()
        var scrollDiff = scrollY - oldScrollY
        if( scrollDiff !== 0 ) {
          scrollDir = ( scrollDiff > 0 ) ? 'down' : 'up';
          fds.pages.onScroll(scrollY, scrollDir, wDim.h, didResize);
          fds.chapterNav.onScroll(scrollY);
        }
      }
      if (calcFps) {
        var sinceStart = newtime - fds.startTime;
        var currentFps = Math.round((1000 / (sinceStart / ++frameCount) * 100) * 0.01)
        var curFrameTime = elapsed
        var msPerFrame = Math.round(sinceStart/frameCount)
        fds.fpsEl.innerHTML = currentFps + " fps at roughtly <br> " + msPerFrame + "ms/frame";
        then = newtime - (elapsed % fds.FpsInterval)
        sinceStart = currentFps = curFrameTime = msPerFrame = null;
      }
    }
    if (calcFps) {
      var then = window.performance.now()
      fds.startTime = then
    }
    requestAnimationFrame(animate);
    then = elapsed = didResize = msPerFrame = oldWindowDim = scrollDir = null

  })
}( window.fds = window.fds || {}, window, document, jQuery));
