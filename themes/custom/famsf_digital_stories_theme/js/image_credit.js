/**
 * @file
 * A JavaScript file for image credit.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Palantir.net
 */

(function ($) {

  Drupal.behaviors.image_credit = {
    attach: function(context, settings) {
      $('.js-figcaption-cta', context).click(function(){
        var thisCaption = $(this);
        // Define the target expandable div.
        var targetImage = thisCaption.parents('figure').find('figcaption');
        var containerWidth =  thisCaption.parents('.horizontal-slider__section').width();
        var imageWidth = thisCaption.parents('figure').find('img').width();
        var imageCaption = thisCaption.parents('figure').find('figcaption');
        // Check for optional slide-down container.
        if (thisCaption.parents('figure').find('.js-figure__caption-reveal ').length) {
            var captionSlider = thisCaption.parents('figure').find('.js-figure__caption-reveal ');
            // Show if it is hidden.
            if ( $(captionSlider).is( ":hidden" ) ) {
              targetImage.toggleClass('js-figcaption--revealed');
              // If the image is not full width, calculate the caption size to fit.
              if (imageWidth < containerWidth) {
                var captionWidthDifference = (containerWidth - imageWidth) / 2;
                // Calculation includes subtracting 30 to compensate for .75 rem padding.
                var newCaptionWidth = imageWidth + captionWidthDifference -30;
                $(captionSlider).slideDown(200).width(imageWidth);
                imageCaption.width(newCaptionWidth);
              } else {
                // This image is full width. Slide open with no wdith change.
                $(captionSlider).slideDown(200).width(imageWidth);;
              }
            } else {
              // Hide the image that is already showing.
              $(captionSlider).slideUp(200, function() {
                targetImage.toggleClass('js-figcaption--revealed');
              });
            }
        } else {
          // If there isn't a slide-down container, reveal the caption normally.
          targetImage.toggleClass('js-figcaption--revealed');
        }
      });
    }
  };
})(jQuery, Drupal);
