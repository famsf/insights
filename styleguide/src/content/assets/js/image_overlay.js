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
      $('.js-overlay-button').click(function(){
        var buttonClicked = $(this);
        // Load button text from data attribute when div is expanded.
        var expandedText = $(this).data('text-expanded');
        // Load button text from data attribute when div is collapsed.
        var collapsedText = $(this).data('text-collapsed');
        // Define the target expandable div.
        var targetImage = $(this).parents('.js-overlay-container').find('.js-overlay-image');
        targetImage.toggleClass('js-overlay-image--hidden js-overlay-image--revealed');
        if (targetImage.hasClass('js-overlay-image--hidden')) {
          buttonClicked.find('.button-with-icon__text').html(collapsedText).attr('title', collapsedText);
        } else {
          buttonClicked.find('.button-with-icon__text').html(expandedText).attr('title', expandedText);
        }
      });
    }
  };
})(jQuery, Drupal);
