/**
 * @file
 * A JavaScript file for the expandable read more areas.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.expander_toggle = {
    attach: function(context, settings) {
      // Close all expander elenments that need to be closed initially.
      $('.js-expander--is-closed').hide(0);
      // Function for expander component to expand and collapse.
      $('.js-icon--read-more', context).click(function(){
        var buttonClicked = $(this);
        // Define the target expandable div.
        var changeThisPanel = $(this).parents('.js-deep-dive').find('.js-deep-dive__wrapper');

        // Load button text from data attribute when div is expanded.
        var expandedText = $(this).data('text-expanded');

        // Load button text from data attribute when div is collapsed.
        var collapsedText = $(this).data('text-collapsed');

        var ThisSection = $(this).parents('.section');

        // Toggle the button and panel states.
        if (changeThisPanel.hasClass("js-expander--is-closed")) {
          buttonClicked.find('.js-icon-arrow--minus').show(0);
          buttonClicked.find('.js-icon-arrow--plus').hide(0);
          changeThisPanel.removeClass("js-expander--is-closed").addClass("js-expander--is-open").slideDown(300);
          buttonClicked.find('.button-with-icon__text').html(expandedText).attr('title', expandedText);
          /* @Todo:  scroll section up to top of page after expanding. */
          $('html, body').animate({
            scrollTop: changeThisPanel.offset().top
            // changeThisPanel.offset().top - sectionHeight
          }, 1000);

        }
        else if (changeThisPanel.hasClass("js-expander--is-open")) {
          buttonClicked.find('.js-icon-arrow--plus').show(0);
          buttonClicked.find('.js-icon-arrow--minus').hide(0);
          changeThisPanel.removeClass("js-expander--is-open").addClass("js-expander--is-closed").slideUp(300);
          buttonClicked.find('.button-with-icon__text').html(collapsedText).attr('title', collapsedText);
        }
      });
    }
  };
})(jQuery, Drupal);
