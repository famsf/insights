/**
 * @file
 * A JavaScript file for markers that zoom in on an image and reveal a detail view.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {
  Drupal.behaviors.marker_zoom = {
    attach: function(context, settings) {
      var zoomMarker = $('.zoom-marker-inner');
      var zoomClose = $('.zoom-close');
      var modalContent= $('.zoom-window__content');
      var modalWindow= $('.zoom-window');
      var modalOverlay = $('.zoom-overlay-background');

      // Listener for click on any zoom marker.
      zoomMarker.click(function(){
        // The marker the user has clicked.
        var marker = $(this);
        // Get the outside wrapper for the marker so we can get its position.
        var zoomPosition = marker.closest('.zoom-marker-outer');
        // Get the top and left properties of the marker
        var markerTop = zoomPosition.css('top');
        var markerLeft = zoomPosition.css('left');
        // Get the image we are zooming in on.
        var zoomImage = marker.closest('.figure__zoomable').find('.figure__zoomable-child');
        // Make sure the image will zoom to the marker location.
        var zoomValues = markerLeft+" "+markerTop;
        zoomImage.get(0).style.transformOrigin = zoomValues;
        // Populate the modal with the marker content.
        var detailedView = marker.closest('.zoom-group').find('.zoom-detail-view').clone();
        modalContent.toggleClass('zoom-window--is-visible').html(detailedView);
        setTimeout(function() {
            // Start to zoom in on the initial image.
            // This requires delay after setting transformOrigin.
            zoomImage.toggleClass('zoomed');
            setTimeout(function() {
              // Fade in the background overlay
              modalOverlay.toggleClass('zoom--is-open');
              setTimeout(function() {
                // reveal the content window.
                modalWindow.toggleClass('zoom-window--is-visible');
                modalContent.find('.zoom-detail-view').toggleClass('show-detail');
                setTimeout(function() {
                  // Show the close button.
                  zoomClose.show();
                  // Lock the body scrolling so only the modal is scrollable while open.
                  $('body').toggleClass('scroll-lock');
                }, 200);
              }, 200);
            }, 200);
        }, 300);
      });

      // Listener for a click on any zoom close button.
      zoomClose.click(function(){
        var closeButton = $(this);
        // Hide the close button.
        zoomClose.hide();
        // Hide the modal window
        modalContent.find('.zoom-detail-view').toggleClass('show-detail');
        modalContent.toggleClass('zoom-window--is-visible').html();
        modalWindow.toggleClass('zoom-window--is-visible');
        setTimeout(function() {
          // Hide the background overlay.
          modalOverlay.toggleClass('zoom--is-open');
          // Zoom out on main image.
          $('.figure__zoomable-child.zoomed').toggleClass('zoomed');
          setTimeout(function() {
            // Release the scroll locking so the user can scroll the main page again.
            $('body').toggleClass('scroll-lock');
          }, 200);
        }, 200);
      });
    }
  };
})(jQuery, Drupal);
