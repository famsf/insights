(function (document, window, $) {
  function toggleDisplays($zoomCarousels) {
    if ($zoomCarousels.length > 0) {
      if (Foundation.MediaQuery.atLeast('medium')) {
        $zoomCarousels.each(function (i, e) {
          $(e).css('display', 'none');
          $(e).siblings('.inline-image-zoom-wrapper').css('display', 'block');
        });
      }
      else {
        $zoomCarousels.each(function (i, e) {
          $(e).css('display', 'block');
          $(e).siblings('.inline-image-zoom-wrapper').css('display', 'none');
        });
      }
    }
  }
  function adjustNav($zoomCarousels) {
    var $nav;
    var $firstImg;
    if ($zoomCarousels.length > 0) {
      $nav = $zoomCarousels.find('.owl-nav');
      if ($nav.length > 0) {
        $firstImg = $($zoomCarousels.find('.zoom-img-mobile-wrapper').get(0));
        if ($firstImg.length > 0) {
          $nav.css('top', ($firstImg.outerHeight() * 0.55) + 'px');
        }
      }
    }
  }
  function adjustNavPageInit() {
    // Because onInitialized isn't perfect.
    var $zoomCarousels = $('.zoom-image--inline--mobile');
    setTimeout (function () {
      adjustNav($zoomCarousels);
    }, 500);
  }
  $(document).ready(function () {
    var $zoomCarousels = $('.zoom-image--inline--mobile');
    $(document).foundation();
    if ($zoomCarousels.length > 0) {
      toggleDisplays($zoomCarousels);
      $(window).on('resize orientationChange', function () {
        toggleDisplays($zoomCarousels);
        adjustNav($zoomCarousels);
      });
      $zoomCarousels.each(function (i, e) {
        if ($(e).closest('.grid-x').length !== 0) {
          $(e).css('margin-left', '-2rem');
        }
      });
      $zoomCarousels.owlCarousel({
        loop: true,
        margin: 5,
        singleItem: true,
        nav: true,
        items: 1,
        stagePadding: 0,
        navSpeed: 800,
        dotsSpeed: 800,
        onInitialized: adjustNavPageInit
      });
    }
  });
}(document, window, jQuery));
