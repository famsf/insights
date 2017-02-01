/**
 * @file
 * A JavaScript file for the site.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.share_expander = {
    attach: function(context, settings) {
      // Close all expander elenments that need to be closed initially.
      $('.js-share-expander--is-closed').hide(0);
      // Function for expander component to expand and collapse.
      $('.js-share-button').click(function(){
        // Define the target expandable div.
        var changeThisPanel = $(this).parents('.js-share').find('.js-share-expander');

        // Toggle the button and panel states.
        if (changeThisPanel.hasClass("js-share-expander--is-closed")) {
          changeThisPanel.removeClass("js-share-expander--is-closed").addClass("js-share-expander--is-open").slideDown(300);

        }
        else if (changeThisPanel.hasClass("js-share-expander--is-open")) {
          changeThisPanel.removeClass("js-share-expander--is-open").addClass("js-share-expander--is-closed").slideUp(300);
        }
      });
    }
  };
})(jQuery, Drupal);
