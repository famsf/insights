(function (fds, ambientVideo, window) {
  ambientVideo.initialize = function (el) {
    // set up pause button and a11y behavior per instance
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      vid.removeAttribute('autoplay');
      vid.pause();
      // stub
      el.addEventListener('click', function () {
        vid.classList.toggle('stopfade');
        if (vid.paused) {
          vid.play();
        }
        else {
          vid.pause();
        }
      });
    }
  };
}(window.fds = window.fds || {}, window.fds.ambientVideo = window.fds.ambientVideo || {}, window));
