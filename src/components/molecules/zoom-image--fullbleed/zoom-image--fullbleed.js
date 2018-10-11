/* eslint-disable */
// Disabling the linter because it can't detect ImageZoom's existence.
// See https://www.cssscript.com/simple-image-hover-zoom-javascript-library-imagezoom-js/
(function (document, window, $, ImageZoom) {
  $(document).ready(function () {
    $(document).foundation();
    if (Foundation.MediaQuery.atLeast('large')) {
      var zoomedImages = new ImageZoom('img.img-zoom-drag', { maxZoom: 2, backgroundImageColor: '#000' });
      $('.img-zoom-drag').mousemove(function (e) {
        var offset = $(this).offset();
        var finderBox = $(this).closest('.zoom-image--fullbleed').find('.finder-box');
        var relX = e.pageX - offset.left;
        var relY = e.pageY - offset.top;
        var imgWidth = $(this).width();
        var imgHeight = $(this).height();
        var percentThroughWidth = (relX / imgWidth * 100) * .5;
        var percentThroughHeight = (relY / imgHeight * 100)  * .5;
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        finderBox.css({
          'top': percentThroughHeight + '%',
          'left': percentThroughWidth + '%',
          'height': (windowHeight - 64) / 20 + 'px',
          'width': windowWidth / 20 + 'px'
        });
      });
    }
    else {
      // Can't show this section if we're on mobile devices.
      $('img.img-zoom-drag').closest('section.page').css('display', 'none');
    }
  });
}(document, window, jQuery, ImageZoom));
