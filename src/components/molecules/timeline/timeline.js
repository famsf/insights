/* eslint-disable */
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

  function constructSpanTimeline($spanTimelinesElements) {
    if (Foundation.MediaQuery.atLeast('large')) {
      $spanTimelinesElements.append('<div class="timespan-scroller"><div class="timespan-scroller-inner"><div class="timespan-scroller-pos"></div></div></div>');
      var firstYearText = parseInt($($spanTimelinesElements.find('.timeline-item-title').get(0)).text().substring(0, 2) + '00');
      var secondLastYearText = parseInt($($spanTimelinesElements.find('.timeline-item-title').get($spanTimelinesElements.find('.timeline-item-title').length - 1)).text().substring(0, 2) + '00');
      var years = [];
      for (var i = firstYearText; i < secondLastYearText + 100;) {
        years.push(i);
        i = i + 100;
      }
      years.push(i);
      years.forEach(function(year) {
        $('.timespan-scroller-inner').append('<span class="span-year">' + year + '</span>');
      });
      $(window).on('scroll.timelineScroll', function(e) {
        var windowY = $(window).scrollTop();
        $('.timeline--year').each(function(i, e) {
          if (windowY + 500 >= $(e).offset().top) {
            $('.timeline--year').removeClass('active');
            $(e).addClass('active');
          }
        });
        calculateActiveTimelinePos($spanTimelinesElements);
      });
    }
    else {
      $(window).off('scroll.timelineScroll');
    }
  }

  function calculateActiveTimelinePos($spanTimelinesElements) {
    $spanTimelinesElements.each(function(i, e) {
      var yearSpan = $(e).find('.timeline--year.active .timeline-item-title').text();
      var firstNumber = parseInt(yearSpan.substr(0, 4));
      var lastNumber = (yearSpan.length > 4) ? parseInt(yearSpan.substr(7, 11)) : 0;
      $(e).find('.span-year').each(function(si, se) {
        if (parseInt($(se).text()) <= firstNumber) {
          var spanDiffTop = firstNumber - parseInt($(se).text());
          var posIndicatorHeight = (lastNumber > 5 && lastNumber - firstNumber > 7) ? ((lastNumber - firstNumber) * 2.5) + 30 : 0;
          var indicatorPos = parseInt($(se).position().top);
          $spanTimelinesElements.find('.timespan-scroller-pos').css({
            'top': 15 + indicatorPos + (spanDiffTop * 2.5) + 'px',
            'height': posIndicatorHeight + 'px'
          });
          $spanTimelinesElements.find('.timespan-scroller-inner').css('top', '-' + (indicatorPos + (spanDiffTop * 1.25)) + 'px');
        }
      });
    });
  }

  fadeSpanTimelineBorders($spanTimelines);
  constructSpanTimeline($spanTimelines);
}(document, window, jQuery));

