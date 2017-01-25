/**
 * @file
 * A JavaScript file for markers that zoom in on an image and reveal a detail view.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {
  Drupal.behaviors.marker_zoom = {
    attach: function(context, settings) {
      $('.zoom-marker-inner').click(function(){
        var marker = $(this);
        marker.closest('.figure__zoomable').find('.figure__zoomable-child').toggleClass('zoomed');
        setTimeout(function() {
          marker.closest('.figure__zoomable').find('.zoom-detail-view').toggleClass('show-detail');
          setTimeout(function() {
            marker.closest('.figure__zoomable').find('.zoom-detail-view').toggleClass('zoomin');
            $('.zoom-close').show();
          }, 200);
        }, 200);
        $('.zoom-marker-outer').hide();
      });

      $('.zoom-close').click(function(){
        var closeButton = $(this);
        closeButton.closest('.figure__zoomable').find('.zoom-detail-view').toggleClass('zoomin');
        setTimeout(function() {
          closeButton.closest('.figure__zoomable').find('.zoom-detail-view').toggleClass('show-detail');
          setTimeout(function() {
            closeButton.closest('.figure__zoomable').find('.figure__zoomable-child').toggleClass('zoomed');
             $('.zoom-close').hide();
          }, 200);
        }, 200);
        $('.zoom-marker-outer').show();
      });
    }
  };
})(jQuery, Drupal);
