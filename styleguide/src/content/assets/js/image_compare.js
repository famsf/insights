/**
 * @file
 * A JavaScript file for the expandable image compare areas.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.image_compare = {
    attach: function(context, settings) {
      // Close all expander elenments that need to be closed initially.
      $('.comparison--answer__is-closed').hide(0);
      // Function for expander component to expand and collapse.
      $('.comparison--button').click(function(){

        var buttonClicked = $(this);

        // Define the target expandable div.
        var changeThisPanel = $(this).parents('.comparison--group').find('.comparison--answer');

        // Toggle the button and panel states.
        if (changeThisPanel.hasClass("comparison--answer__is-closed")) {
          buttonClicked.find('.icon-arrow--up').show(0);
          buttonClicked.find('.icon-arrow--down').hide(0);
          changeThisPanel.removeClass("comparison--answer__is-closed").addClass("comparison--answer__is-open").slideDown(300);
        }
        else if (changeThisPanel.hasClass("comparison--answer__is-open")) {
          buttonClicked.find('.icon-arrow--down').show(0);
          buttonClicked.find('.icon-arrow--up').hide(0);
          changeThisPanel.removeClass("comparison--answer__is-open").addClass("comparison--answer__is-closed").slideUp(300);
        }
      });
    }
  };
})(jQuery, Drupal);
