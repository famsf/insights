/* eslint-disable */
(function (components, win, $) {
  components.zoomImageInline = {};

  var captionToggleClickHandler = function(e, toggle, pageEl) {
    var i;
    var thisCaption = e.target.parentElement.parentElement.querySelector('.inline-caption-content');
    var captions = pageEl.querySelectorAll('.inline-caption-content');
    var captionToggles = pageEl.querySelectorAll('.inline-caption-button');
    e.preventDefault();
    // hide all currently open captions
    if (captions.length > 0) {
      for (i = 0; i < captions.length; i++) {
        if (captions[i].classList.contains('show')) {
          captions[i].classList.remove('show');
        }
      }
    }
    if (captionToggles.length > 0) {
      for (i = 0; i < captionToggles.length; i++) {
        if (captionToggles[i] != e.target) {
          captionToggles[i].classList.remove('close');
        }
      }
    }
    e.target.classList.toggle('close');
    if ( e.target.classList.contains('close')) {
      thisCaption.classList.add('show');
    }
    else {
      thisCaption.classList.remove('show');
    }
  }

  components.zoomImageInline.instantiate = function (page) {
    var captionToggles = page.el.querySelectorAll('.inline-caption-button');
    var captionToggle;
    var captions = page.el.querySelectorAll('.inline-caption-content');
    var dots = page.el.querySelectorAll('.zoom-caption');
    var i;
    for (i = 0; i < captionToggles.length; i++) {
      captionToggle = captionToggles[i];
      captionToggle.addEventListener('click', function(e) {
        captionToggleClickHandler(e, captionToggle, page.el);
      }, false);
    };
    if (dots.length > 0) {
      for (i = 0; i < dots.length; i++) {
        dots[i].style.left = dots[i].dataset.xCoord + '%';
        dots[i].style.top = dots[i].dataset.yCoord + '%';
      }
    }
  };

  components.zoomImageInline.trigger = function () {
    // console.log('zoomImageInline trigger');
  };

  components.zoomImageInline.untrigger = function () {
    // console.log('zoomImageInline untrigger');
  };
}(window.fds.components = window.fds.components || {}, window, jQuery));
