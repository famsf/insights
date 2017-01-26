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
        if (modalContent.hasClass('zoom-window--is-visible')) {
          modalContent.hide(0);
          modalContent.toggleClass('zoom-window--is-visible');
        } else {
          modalContent.show(0);
          modalContent.toggleClass('zoom-window--is-visible').html(detailedView);
        }

        setTimeout(function() {
            // Start to zoom in on the initial image.
            // This requires delay after setting transformOrigin.
            zoomImage.toggleClass('zoomed');
            setTimeout(function() {
              // Fade in the background overlay
                if (modalOverlay.hasClass('zoom--is-open')) {
                  modalOverlay.fadeOut(500);
                  modalOverlay.toggleClass('zoom--is-open');
                } else {
                  modalOverlay.fadeIn(500);
                  modalOverlay.toggleClass('zoom--is-open');
                }
              setTimeout(function() {
                // reveal the content window.
                if (modalWindow.hasClass('zoom-window--is-visible')) {
                  modalWindow.fadeOut(500);
                  modalWindow.toggleClass('zoom-window--is-visible');
                } else {
                  modalWindow.fadeIn(500);
                  modalWindow.toggleClass('zoom-window--is-visible');
                }
                var detailView = modalContent.find('.zoom-detail-view');
                if (detailView.hasClass('show-detail')) {
                  detailView.toggleClass('show-detail').fadeOut(500);
                } else {
                  detailView.toggleClass('show-detail').fadeIn(500);
                }
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
        var zoomedImage =$('.figure__zoomable-child.zoomed');
        // Hide the close button.
        zoomClose.hide();
        // Hide the modal window
        modalContent.find('.zoom-detail-view').removeClass('show-detail').fadeOut(500);
        modalContent.removeClass('zoom-window--is-visible').fadeOut(500).html();
        modalWindow.removeClass('zoom-window--is-visible').fadeOut(500);
        setTimeout(function() {
          // Hide the background overlay.
          modalOverlay.removeClass('zoom--is-open').fadeOut(500);
          // Zoom out on main image.
          zoomedImage.removeClass('zoomed');
          setTimeout(function() {
            // Release the scroll locking so the user can scroll the main page again.
            $('body').toggleClass('scroll-lock');
          }, 200);
        }, 200);
      });
    }
  };
})(jQuery, Drupal);
