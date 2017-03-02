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
        var imagewidth = thisCaption.parents('figure').find('img').width();
        // Check for optional slide-down container.
        if (thisCaption.parents('figure').find('.js-figure__caption-reveal ').length) {
            var captionSlider = thisCaption.parents('figure').find('.js-figure__caption-reveal ');
            if ( $(captionSlider).is( ":hidden" ) ) {
              targetImage.toggleClass('js-figcaption--revealed');
              $(captionSlider).slideDown(200).width(imagewidth);
            } else {
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
