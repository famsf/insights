$(document).ready(function() {

  // Initialize foundation.
  $(document).foundation();

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

document.addEventListener("DOMContentLoaded", function () {
  var win = window
  var frameCount = 0
  var calcFps = true
  var scrollDir
  fds.targetFps = 60
  fds.FpsInterval = 1000 / fds.targetFps
  var st = 0;
  var wDim = {
    w: win.innerWidth,
    h: win.innerHeight
  }
  if (!document.querySelector('.insights-app')) {
    console.log('Bypassing main js loop in current context to allow for easier single component prototyping')
    return;
  }
  fds.fpsEl = document.getElementById('fpsEl')
  window.fds.pages.initialize('.container', '.page', '.top-bar')
  window.fds.covers.initialize('.container', '.chapter', '.cover')
  window.fds.chapterNav.initialize('#chapter_nav', '.chapter', '.top-bar')
  window.fds.topBar.initialize('topBar')

  window.fds.covers.onScroll(0, 'down', win.innerHeight, true)
  window.fds.pages.onScroll(0, 'down', win.innerHeight, true)
  window.fds.chapterNav.onScroll()

  animate = function (newtime) {
    requestAnimationFrame(animate);
    var elapsed, didResize, msPerFrame, oldWindowDim;
    elapsed =  newtime - then
    didResize = false
    msPerFrame = 0
    oldWindowDim = Object.assign({}, wDim)
    wDim = {
      w: win.innerWidth,
      h: win.innerHeight
    }
    if (wDim.w != oldWindowDim.w || wDim.h != oldWindowDim.h) {
      didResize = true
    }
    if (elapsed > fds.FpsInterval) {
      var oldSt = st
      st = window.poly.getScrollY()
      var scrollDiff = st - oldSt
      if( scrollDiff != 0 ) {
        scrollDir = ( scrollDiff > 0 ) ? 'down' : 'up';
        window.fds.covers.onScroll(st, scrollDir, wDim.h, didResize)
        window.fds.pages.onScroll(st, scrollDir, wDim.h, didResize)
        window.fds.chapterNav.onScroll()
      }
    }
    if (calcFps == true) {
      var sinceStart = newtime - fds.startTime;
      var currentFps = Math.round((1000 / (sinceStart / ++frameCount) * 100) / 100)
      var curFrameTime = elapsed
      var msPerFrame = Math.round(sinceStart/frameCount)
      fds.fpsEl.innerHTML = `${currentFps} fps at roughtly <br>${msPerFrame} ms/frame`
      then = newtime - (elapsed % fds.FpsInterval)
      sinceStart = currentFps = curFrameTime = msPerFrame = null;
    }
  }
  var then = window.performance.now()
  fds.startTime = then
  requestAnimationFrame(animate);
  then = elapsed = didResize = msPerFrame = oldWindowDim = null
});
