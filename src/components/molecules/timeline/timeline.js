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

  function calculateActiveTimelinePos($spanTimelinesElements) {
    $spanTimelinesElements.each(function (i, e) {
      var yearSpan = $(e).find('.timeline--year.active .timeline-item-title').text();
      var firstNumber = parseInt(yearSpan.substr(0, 4), 10);
      var lastNumber = (yearSpan.length > 4) ? parseInt(yearSpan.substr(7, 11), 10) : 0;
      $(e).find('.span-year').each(function (si, se) {
        var spanDiffTop;
        var posIndicatorHeight;
        var indicatorPos;
        if (parseInt($(se).text(), 10) <= firstNumber) {
          spanDiffTop = firstNumber - parseInt($(se).text(), 10);
          posIndicatorHeight = (lastNumber > 5 && lastNumber - firstNumber > 7) ?
            ((lastNumber - firstNumber) * 2.5) + 30 : 0;
          indicatorPos = parseInt($(se).position().top, 10);
          if ($(e).hasClass('no-year-span') && spanDiffTop !== 1) {
            spanDiffTop *= 10;
          }
          $spanTimelinesElements.find('.timespan-scroller-pos').css({
            top: 15 + indicatorPos + (spanDiffTop * 2.5) + 'px',
            height: posIndicatorHeight + 'px'
          });
          $spanTimelinesElements.find('.timespan-scroller-inner').css('top', '-' + (indicatorPos + (spanDiffTop * 1.25)) + 'px');
        }
      });
    });
  }

  function createTimespanYears($spanTimelinesElements) {
    $spanTimelinesElements.each(function (i, e) {
      var $spanTimelineElement = $(e);
      var years = [];
      var j;
      var firstYearText;
      var secondLastYearText;
      if ($spanTimelineElement.hasClass('year-span')) {
        $spanTimelineElement.append('<div class="timespan-scroller"><div class="timespan-scroller-inner"><div class="timespan-scroller-pos"></div></div></div>');
        firstYearText = parseInt($($spanTimelineElement.find('.timeline-item-title').get(0)).text().substring(0, 2) + '00', 10);
        secondLastYearText = parseInt($($spanTimelineElement.find('.timeline-item-title').get($spanTimelineElement.find('.timeline-item-title').length - 1)).text().substring(0, 2) + '00', 10);
        for (j = firstYearText; j < secondLastYearText + 100;) {
          years.push(j);
          j += 100;
        }
        years.push(j);
        years.push(j + 100);
        years.forEach(function (year) {
          $spanTimelineElement.find('.timespan-scroller-inner').append('<span class="span-year">' + year + '</span>');
        });
      }
    });
  }

  function constructSpanTimelines($spanTimelinesElements) {
    var windowY;
    if (Foundation.MediaQuery.atLeast('large')) {
      createTimespanYears($spanTimelinesElements);
      $(window).on('scroll.timelineScroll', function (e) {
        windowY = $(window).scrollTop();
        $('.timeline--year').each(function (index, ele) {
          if (windowY + 500 >= $(ele).offset().top) {
            $('.timeline--year').removeClass('active');
            $(ele).addClass('active');
          }
        });
        calculateActiveTimelinePos($spanTimelinesElements);
      });
    }
    else {
      $(window).off('scroll.timelineScroll');
    }
  }

  fadeSpanTimelineBorders($spanTimelines);
  constructSpanTimelines($spanTimelines);
}(document, window, jQuery));

