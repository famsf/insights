(function (document, window, $) {
  $(document).ready(function () {
    var $zoomCarousels = $('.zoom-image--inline--mobile');
    $(document).foundation();

    function toggleDisplays() {
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

    function adjustNav() {
      var $nav = $zoomCarousels.find('.owl-nav');
      var $firstImg = $($zoomCarousels.find('.zoom-img-mobile-wrapper').get(0));
      $nav.css('top', ($firstImg.outerHeight() * 0.55) + 'px');
    }

    function adjustNavPageInit() {
      // Because onInitialized isn't perfect.
      setTimeout(adjustNav, 500);
    }

    toggleDisplays();
    $(window).on('resize orientationChange', function () {
      toggleDisplays();
      adjustNav();
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
  });
}(document, window, jQuery));
