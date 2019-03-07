/* eslint-disable */
// Disabling the linter because it can't detect ImageZoom's existence.
// See https://www.cssscript.com/simple-image-hover-zoom-javascript-library-imagezoom-js/
(function (components, window, $, ImageZoom) {
  var finderBoxScaleFactor = 0.05;
  components.zoomImageFullbleed = {};
  $(document).foundation();

  components.zoomImageFullbleed.instantiate = function (page) {
    var $el = $(page.components.zoomImageFullbleed.el);
    var $imgZoomDrag = $($el.find('.img-zoom-drag'));
    $el.find('.scrooll-finder').hide();
    page.components.zoomImageFullbleed.zoomedImages = new ImageZoom($imgZoomDrag, {
      maxZoom: 2,
      backgroundImageColor: '#000'
    });
  }

  components.zoomImageFullbleed.trigger = function (page) {
    var $el = $(page.components.zoomImageFullbleed.el);
    var $imgZoomDrag = $($el.find('.img-zoom-drag'));
    // if (Foundation.MediaQuery.atLeast('large')) {
      $imgZoomDrag.on('mousemove.zoomImageFullbleed', function (e) {
        var offset = $(this).offset();
        var finderBox = $($el.find('.finder-box'));
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
        // $el.find('.scroll-finder').show();
      });
    // }
        // This was causing terrible terrible problems in mobile.
        // else {
        //   $('.img-zoom-drag').closest('section.page').css('display', 'none');
        // }
  };

  components.zoomImageFullbleed.untrigger = function (page) {
    var $el = $(page.components.zoomImageFullbleed.el);
    // $el.find('.scroll-finder').hide();
    $el.off('mousemove.zoomImageFullbleed');
  };
}(window.fds.components = window.fds.components || {}, window, jQuery, ImageZoom));
