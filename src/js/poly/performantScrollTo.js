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
