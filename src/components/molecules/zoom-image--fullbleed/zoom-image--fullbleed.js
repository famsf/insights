/* eslint-disable */
// Disabling the linter because it can't detect ImageZoom's existence.
// See https://www.cssscript.com/simple-image-hover-zoom-javascript-library-imagezoom-js/
(function (window, $, ImageZoom) {
  $(document).ready(function () {
    if( document.querySelectorAll('.img-zoom-drag').length > 0 ) {
      var zoomedImages = new ImageZoom('img.img-zoom-drag', { maxZoom: 3, backgroundImageColor: '#000' });
    }
  });
}(window, jQuery, ImageZoom));
