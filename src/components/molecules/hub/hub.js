(function (document, window, $) {
  var $hubs = $('.hub');
  $(document).foundation();

  function createFilters($hub) {
    var tagMap = {};
    var $tags = $hub.find('div[data-tag-value]');
    var colorScheme = 'teal';
    $tags.each(function (i, e) {
      tagMap[$(e).attr('data-tag-value')] = true;
    });
    Object.keys(tagMap).forEach(function (tag) {
      $hub.find('.story-filter').append('<a href="#" aria-role="button" class="' + colorScheme + '">' + tag + '</a>');
      if (colorScheme === 'teal') colorScheme = 'blue';
      else if (colorScheme === 'blue') colorScheme = 'white';
      else if (colorScheme === 'white') colorScheme = 'black';
      else colorScheme = 'teal';
    });
  }

  $hubs.each(function (i, e) {
    var $hub = $(e);
    var $storyFilter = $(e).find('.story-filter');
    createFilters($hub);
    $storyFilter.flickity({
      cellAlign: 'left',
      contain: true,
      draggable: true,
      prevNextButtons: false,
      pageDots: false
    });
  });
}(document, window, jQuery));
