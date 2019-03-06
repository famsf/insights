(function (components, win, $) {
  var embeddedVideo;
  components.embeddedVideo = {};
  embeddedVideo = components.embeddedVideo;
  embeddedVideo.instantiate = function (page) {
    var plyr;
    var component = page.components.embeddedVideo;
    var el = component.el;
    var poster;
    var plyrElement;
    var videoParent;
    if (el) {
      if (!component.plyr) {
        plyr = new Plyr(el, {
          hideControls: 'false',
          controls: ['play-large', 'play', 'progress', 'current-time', 'captions', 'settings', 'pip', 'fullscreen']
        });
        component.plyr = plyr;
        plyr.on('ready', function (e) {
          poster = el.dataset.poster;
          if (poster) {
            plyr.poster = poster;
          }
          component.plyr = plyr;
          plyr.pause();
        });
        plyr.on('playing', function (e) {
          plyrElement = document.getElementById(plyr.media.id);
          videoParent = plyrElement.parentElement.parentElement.parentElement;
          videoParent.classList.add('playing');
        });
        plyr.on('pause', function (e) {
          plyrElement = document.getElementById(plyr.media.id);
          videoParent = plyrElement.parentElement.parentElement.parentElement;
          videoParent.classList.remove('playing');
        });
      }
    }
  };

  embeddedVideo.trigger = function (page) {
    // console.log('trigger embeddedvideo');
  };

  embeddedVideo.untrigger = function (page) {
    var component = page.components.embeddedVideo;
    var el = component.el;
    if (component && component.plyr) {
      component.plyr.pause();
    }
  };
}(window.fds.components = window.fds.components || {}, document, window, jQuery));
