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
      $('.js-comparison__answer--is-closed').hide(0);
      // Function for expander component to expand and collapse.
      $('.js-comparison__button', context).click(function(){

        var buttonClicked = $(this);

        // Define the target expandable div.
        var changeThisPanel = $(this).parents('.js-comparison__group').find('.js-comparison__answer');

        // Toggle the button and panel states.
        if (changeThisPanel.hasClass("js-comparison__answer--is-closed")) {
          buttonClicked.find('.js-icon-arrow--up').show(0);
          buttonClicked.find('.js-icon-arrow--down').hide(0);
          changeThisPanel.removeClass("js-comparison__answer--is-closed").addClass("js-comparison__answer--is-open").slideDown(300);
          // Load images in expandable area
          $(changeThisPanel).find('img[data-src],div[data-bg]').lazyLoadXT();
        }
        else if (changeThisPanel.hasClass("js-comparison__answer--is-open")) {
          buttonClicked.find('.js-icon-arrow--down').show(0);
          buttonClicked.find('.js-icon-arrow--up').hide(0);
          changeThisPanel.removeClass("js-comparison__answer--is-open").addClass("js-comparison__answer--is-closed").slideUp(300);
        }
      });
    }
  };
})(jQuery, Drupal);
