/**
 * @file
 * A JavaScript file for toggling the dashboard view.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {
  Drupal.behaviors.dashboard_toggle = {
    attach: function(context, settings) {
      // Define audio play buttons
      var dashboardButton = $('.js-dashboard-toggle', context);
      var dashboard = $('.dashboard');
      var dashboardOverlay = $('.js-dashboard-overlay-background');
      var dashboardClose = $('.js-dashboard-close');
      dashboardButton.click(function() {
        dashboardButton.toggleClass('js-closed js-opened');
        $('body').toggleClass('js-scroll-lock');
        if (dashboardOverlay.hasClass('js-zoom--is-open')) {
          dashboardOverlay.fadeOut(500);
          dashboardOverlay.toggleClass('js-zoom--is-open');
        } else {
          dashboardOverlay.fadeIn(500);
          dashboardOverlay.toggleClass('js-zoom--is-open');
        }
        if (dashboard.hasClass('js-closed')) {
          dashboard.css('left', '0');
          dashboard.removeClass('js-closed');
        } else {
          dashboard.css('left', '-50vw');
          dashboard.addClass('js-closed');
        }
      });
    dashboardOverlay.click(function() {
      dashboardButton.trigger('click', context);
    });
    dashboardClose.click(function() {
      dashboardButton.trigger('click', context);
    });
    }
  };
})(jQuery, Drupal);
