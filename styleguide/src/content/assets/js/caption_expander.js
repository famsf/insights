/**
 * @file
 * A JavaScript file for expanding credits under photos. .
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.caption_expander = {
    attach: function(context, settings) {
      $('.figure--figcaption-reveal').click(function() {
        $(this).closest('figure').find('figcaption').toggleClass('revealed');
      });
    }
  };
})(jQuery, Drupal);
