(function (components, document, window, $) {
  components.timeline = {};
  $(document).foundation();

  function alterTimelineTitleSizes() {
    var $yearTitles = $('.timeline-item-title');
    $yearTitles.each(function (i, e) {
      if ($(e).text().includes('–')) {
        $(e).addClass('smaller-text');
      }
    });
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

  function constructSpanTimelines(pageEl) {
    var $el = $(pageEl);
    var windowY;
    var $years = $el.find('.timeline .timeline--year');
    $(window).on('scroll.timelineSpanScroll', function (e) {
      windowY = $(window).scrollTop();
      $years.each(function (index, yearEl) {
        if (windowY + 500 >= $(yearEl).offset().top) {
          $('.timeline--year').removeClass('active');
          $(yearEl).addClass('active');
        }
      });
      calculateActiveTimelinePos($el.find('.timeline'));
    });
  }


  function fadeSpanTimelineBorders(pageEl) {
    var $spanYears = $(pageEl).find('.timeline--year');
    var windowTopPos;
    var elemTopPos;
    if (Foundation.MediaQuery.atLeast('large')) {
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

  function buildTimeline(page) {
    var $els = $(page.el).find('.timeline');
    alterTimelineTitleSizes();
    if (Foundation.MediaQuery.atLeast('large')) {
      createTimespanYears($els);
    }
    else {
      components.timeline.untrigger();
    }
  }

  components.timeline.trigger = function (page) {
    fadeSpanTimelineBorders(page.el);
    constructSpanTimelines(page.el);
  };

  components.timeline.untrigger = function (page) {
    $(window).off('scroll.timelineScroll');
    $(window).off('scroll.timelineSpanScroll');
  };

  components.timeline.instantiate = function (page) {
    buildTimeline(page);
  };
}(window.fds.components = window.fds.components || {}, document, window, jQuery));
