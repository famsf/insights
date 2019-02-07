/* eslint-disable */
// Disabling the linter because it can't detect ImageZoom's existence.
// See https://www.cssscript.com/simple-image-hover-zoom-javascript-library-imagezoom-js/
(function (document, window, $, ImageZoom) {

  function instantiateZoomImage ($el) {
      var finderBoxScaleFactor = 0.05;
      var zoomedImages = new ImageZoom($el, {
        maxZoom: 2,
        backgroundImageColor: '#000'
      });
      $el.mousemove(function (e) {
        var offset = $(this).offset();
        var finderBox = $el.closest('.zoom-image--fullbleed').find('.finder-box');
        var relX = e.pageX - offset.left;
        var relY = e.pageY - offset.top;
        var imgWidth = $el.width();
        var imgHeight = $el.height();
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var percentThroughWidth = (relX / windowWidth) * 100;
        var percentThroughHeight = (relY / (windowHeight - $('.top-bar__wrapper').height())) * 100;
        finderBox.css({
          'top': Math.ceil(percentThroughHeight * 0.5)+ '%',
          'left': Math.ceil(percentThroughWidth * 0.5) + '%',
          'width': (windowWidth * finderBoxScaleFactor) + 'px',
          'height': (windowHeight * finderBoxScaleFactor) + 'px'
        });
      });

  }

  $(document).ready(function () {
    $(document).foundation();
    var zoomImages = $('.img-zoom-drag');
    if (Foundation.MediaQuery.atLeast('large')) {
      zoomImages.each( function(el) {
        instantiateZoomImage($(this));
      });
    } else {
      // Can't show this section if we're on mobile devices.
      $('.img-zoom-drag').closest('section.page').css('display', 'none');
    }
    // var zoomedImages = new ImageZoom('.img-zoom-drag', { maxZoom: 3, backgroundImageColor: '#000' });
  });
}(document, window, jQuery, ImageZoom));
