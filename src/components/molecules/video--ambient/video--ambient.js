(function (components, win, $) {
  var ambientVideo;
  components.ambientVideo = {};
  ambientVideo = components.ambientVideo;

  ambientVideo.instantiate = function (page) {
    var plyr;
    var component = page.components.ambientVideo;
    var el = component.el;
    if (el) {
      if (!component.plyr) {
        plyr = new Plyr(el, {
          hideControls: 'true'
        });
        plyr.on('ready', function (e) {
          plyr.muted = true;
          plyr.play();
        });
        component.plyr = plyr;
      }
    }
  };

  ambientVideo.trigger = function (page) {
    var component = page.components.embeddedVideo;
    var el = component.el;
    // console.log('trigger ambientvideo');
    if (el && component.plyr) {
      component.plyr.play();
    }
  };

  ambientVideo.untrigger = function (page) {
    var component = page.components.ambientVideo;
    var el = component.el;
    if (el && component.plyr) {
      component.plyr.pause();
    }
  };
}(window.fds.components = window.fds.components || {}, document, window, jQuery));
