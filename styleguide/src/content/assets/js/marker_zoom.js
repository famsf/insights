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
      var zoomMarker = $('.js-zoom-marker-inner');
      var zoomClose = $('.js-zoom-close');
      var modalContent= $('.js-zoom-window__content');
      var modalWindow= $('.js-zoom-window');
      var modalOverlay = $('.js-zoom-overlay-background');

      // Listener for click on any zoom marker.
      zoomMarker.click(function(event){
        event.preventDefault();
        // The marker the user has clicked.
        var marker = $(this);
        // Get the outside wrapper for the marker so we can get its position.
        var zoomPosition = marker.closest('.js-zoom-marker-outer');
        // Get the top and left properties of the marker
        var markerTop = zoomPosition.css('top');
        var markerLeft = zoomPosition.css('left');
        // Get the image we are zooming in on.
        var zoomImage = marker.closest('.js-figure__zoomable').find('.js-figure__zoomable-child');
        // Make sure the image will zoom to the marker location.
        var zoomValues = markerLeft+" "+markerTop;
        zoomImage.get(0).style.transformOrigin = zoomValues;
        // Populate the modal with the marker content.
        var detailedView = marker.closest('.js-zoom-group').find('.js-zoom-detail-view').clone();
        if (modalContent.hasClass('js-zoom-window--is-visible')) {
          modalContent.hide(0);
          modalContent.toggleClass('js-zoom-window--is-visible');
        } else {
          modalContent.show(0);
          modalContent.toggleClass('js-zoom-window--is-visible').html(detailedView);
          setTimeout(function() {
            console.log("loading...");
            $(modalContent).find('img[data-src]').lazyLoadXT();
          }, 200);
        }

        setTimeout(function() {
            // Start to zoom in on the initial image.
            // This requires delay after setting transformOrigin.
            zoomImage.toggleClass('js-zoomed');
            setTimeout(function() {
              // Fade in the background overlay
                if (modalOverlay.hasClass('js-zoom--is-open')) {
                  modalOverlay.fadeOut(500);
                  modalOverlay.toggleClass('js-zoom--is-open');
                } else {
                  modalOverlay.fadeIn(500);
                  modalOverlay.toggleClass('js-zoom--is-open');
                }
              setTimeout(function() {
                // reveal the content window.
                if (modalWindow.hasClass('js-zoom-window--is-visible')) {
                  modalWindow.fadeOut(500);
                  modalWindow.toggleClass('js-zoom-window--is-visible');
                } else {
                  modalWindow.fadeIn(500);
                  modalWindow.toggleClass('js-zoom-window--is-visible');
                }
                var detailView = modalContent.find('.js-zoom-detail-view');
                if (detailView.hasClass('js-show-detail')) {
                  detailView.toggleClass('js-show-detail').fadeOut(500);
                } else {
                  detailView.toggleClass('js-show-detail').fadeIn(500);
                }
                setTimeout(function() {
                  // Show the close button.
                  zoomClose.show();
                  // Lock the body scrolling so only the modal is scrollable while open.
                  $('body').toggleClass('js-scroll-lock');
                }, 200);
              }, 200);
            }, 200);
        }, 300);
      });

      // Listener for a click on any zoom close button.
      zoomClose.click(function(event){
        event.preventDefault();
        var closeButton = $(this);
        var zoomedImage =$('.js-figure__zoomable-child.js-zoomed');
        // Hide the close button.
        zoomClose.hide();
        // Hide the modal window
        modalContent.find('.js-zoom-detail-view').removeClass('js-show-detail').fadeOut(500);
        modalContent.removeClass('js-zoom-window--is-visible').fadeOut(500).html();
        modalWindow.removeClass('js-zoom-window--is-visible').fadeOut(500);
        setTimeout(function() {
          // Hide the background overlay.
          modalOverlay.removeClass('js-zoom--is-open').fadeOut(500);
          // Zoom out on main image.
          zoomedImage.removeClass('js-zoomed');
          setTimeout(function() {
            // Release the scroll locking so the user can scroll the main page again.
            $('body').toggleClass('js-scroll-lock');
          }, 200);
        }, 200);
      });
    }
  };
})(jQuery, Drupal);
