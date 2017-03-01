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
      // Define dashboard elements
      var dashboardButton = $('.js-dashboard-toggle', context);
      var dashboard = $('.dashboard');
      var dashboardOverlay = $('.js-dashboard-overlay-background');
      var dashboardClose = $('.js-dashboard-close');
      dashboardButton.click(function() {
        // Toggle button state
        dashboardButton.toggleClass('js-closed js-opened');
        // Lock the main page scrolling so only nav is scrollable.
        $('body').toggleClass('js-scroll-lock');
        // Fade in overlay.
        if (dashboardOverlay.hasClass('js-zoom--is-open')) {
          dashboardOverlay.fadeOut(500);
          dashboardOverlay.toggleClass('js-zoom--is-open');
        } else {
          dashboardOverlay.fadeIn(500);
          dashboardOverlay.toggleClass('js-zoom--is-open');
        }
        // Slide the dashboard to position.
        dashboard.toggleClass('js-closed js-open');
        // Load images in dashboard.
        $(dashboard).find('img[data-src],div[data-bg]').lazyLoadXT({show:true});
      });
      // Click the background to close the dashboard.
      dashboardOverlay.click(function() {
        dashboardButton.trigger('click', context);
      });
      // Click the close button inside the dashboard to close the dashboard.
      dashboardClose.click(function() {
        dashboardButton.trigger('click', context);
      });
    }
  };
})(jQuery, Drupal);
