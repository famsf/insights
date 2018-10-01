(function (document, window, $) {
  var $spanTimelines = $('.timeline.year-span');
  $(document).foundation();

  function fadeSpanTimelineBorders($spanTimelinesElements) {
    var $spanYears;
    var windowTopPos;
    var elemTopPos;
    if (Foundation.MediaQuery.atLeast('large')) {
      $spanYears = $spanTimelinesElements.find('.timeline--year');
      $(window).on('scroll', function () {
        windowTopPos = $(window).scrollTop();
        $spanYears.each(function (i, elem) {
          elemTopPos = $(elem).offset().top;
          if (windowTopPos + 200 >= elemTopPos) {
            $(elem).find('.timeline-item-text').addClass('year-scrolled-to');
          }
        });
      });
    }
  }

  fadeSpanTimelineBorders($spanTimelines);
}(document, window, jQuery));

