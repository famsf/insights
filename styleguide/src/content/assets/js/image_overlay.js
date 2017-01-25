/**
 * @file
 * A JavaScript file for image overlay.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.image_overlay = {
    attach: function(context, settings) {
      $('.overlay-button').click(function(){
        // Define the target expandable div.
        var targetImage = $(this).parents('.overlay-container').find('.overlay-image');
        targetImage.toggleClass('overlay-image__hidden overlay-image__revealed');
        if ($(this).text() == 'Show composition overlay') {
          $(this).text('Hide composition overlay');
        } else {
          $(this).text('Show composition overlay');
        }
      });
    }
  };
})(jQuery, Drupal);
