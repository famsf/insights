var toggleLastTile;
(function (document, window, $) {
  $(document).ready(function () {
    toggleLastTile = function () {
      var $instaText = $('.instafeed-wrapper .instafeed-text').clone();
      $('.instafeed-wrapper .instafeed-text').remove();
      $('.instafeed-images').append($instaText);
    };
  });
}(document, window, jQuery));
