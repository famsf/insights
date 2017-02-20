/**
 * @file
 * A JavaScript file for image credit.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Palantir.net
 */

(function ($) {

  Drupal.behaviors.audio_transcript = {
    attach: function(context, settings) {
      $('.js-audio-transcript--trigger', context).click(function(){
        // Define the target expandable div.
        var targetDrawer = $(this).parents('.audio-transcript').find('.audio-transcript__drawer');
        targetDrawer.toggleClass('js-audio-transcript--hidden');
      });
    }
  };
})(jQuery, Drupal);
