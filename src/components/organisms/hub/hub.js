(function (document, window, $) {
  $(document).ready(function () {
    var $hubs = $('#insights-hub');
    $(document).foundation();
    function createFilters($hub) {
      var tagMap = {};
      var $tags = $hub.find('div[data-tag-value]');
      var colorScheme = 'teal';
      $tags.each(function (i, e) {
        tagMap[$(e).attr('data-tag-value')] = true;
      });
      Object.keys(tagMap).forEach(function (tag) {
        $hub.find('.story-filter').append('<a href="#" aria-role="button" data-showing="true" class="' + colorScheme + '">' + tag + '</a>');
        if (colorScheme === 'teal') colorScheme = 'blue';
        else if (colorScheme === 'blue') colorScheme = 'black';
        else colorScheme = 'teal';
      });
    }

    function highlightTitle($hub) {
      var title = $hub.find('h1').text();
      var lastWord = title.split(' ').pop();
      var newTitle = title.replace(lastWord, '<span class="word-highlight">' + lastWord + '</span>');
      $hub.find('h1').html(newTitle);
    }

    $('#top-bar').removeClass('invert');
    $hubs.each(function (i, e) {
      var $hub = $(e);
      var $storyFilter = $(e).find('.story-filter');
      var flickityCarousel;
      highlightTitle($hub);
      createFilters($hub);
      flickityCarousel = $storyFilter.flickity({
        cellAlign: 'left',
        contain: true,
        draggable: true,
        prevNextButtons: false,
        pageDots: false
      });
      $hub.find('.story-filter a').on('click', function (event) {
        event.preventDefault();
      });
      flickityCarousel.on('staticClick.flickity', function (event, pointer, cellElement, cellIndex) {
        var tagText = $(cellElement).text();
        var $stories = $hub.find('.hub-story');
        if ($(cellElement).hasClass('filtered')) {
          $(cellElement).removeClass('filtered');
        }
        else {
          $(cellElement).addClass('filtered');
        }
        $stories.each(function (index, element) {
          $(element).find('div[data-tag-value="' + tagText + '"]').css('display', 'none');
          if ($(element).find('div[data-tag-value="' + tagText + '"]').length !== 0) {
            if ($(cellElement).attr('data-showing') === 'true') {
              $(element).fadeOut(200);
            }
            else {
              $(element).fadeIn(200);
            }
          }
        });
        if ($(cellElement).attr('data-showing') === 'true') {
          $(cellElement).attr('data-showing', 'false');
        }
        else {
          $(cellElement).attr('data-showing', 'true');
        }
      });
    });
  });
}(document, window, jQuery));
