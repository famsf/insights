/**
 * @file
 * A JavaScript file to load typekit.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($, Drupal) {

    Drupal.behaviors.site = {
        attach: function (context, settings) {
            // Load Adobe TypeKit
            try {
                Typekit.load();
            }
            catch(e) {
            }
        }
    };
})(jQuery, Drupal);
