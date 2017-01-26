/**
 * @file
 * A JavaScript file for the site.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.site = {
    attach: function (context, settings) {
      // Start the slider
      $('.bxslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        speed: 1000,
        pause: 1500

      });
      $('#pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: false,
        sectionsColor: [],
        anchors: ['title', 'introduction', 'contending-with-convention', 'see-the-forest-through-the-trees', 'ambition-and-risk', 'paris-modernity-and-leisure', 'monet-and-the-sea', 'camille-monet-the-known-and-the-unknown', 'political-unrest', 'training-your-eye-color', 'training-your-eye-composition', 'lastPage'],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: false,
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,

        //events
        onLeave: function(index, nextIndex, direction){
          // Select the next active index section element by it's index.
          var nextActiveSection = nextIndex - 1;
          var sectionSelector = $('section.section').eq(nextActiveSection);
          // Get all the animated item in the section.
          var animatedItems = sectionSelector.find('*.animated');
          var numberOfAnimatedItems = animatedItems.length;

          // Function to animate things in the viewport.
          function animateInSectionView() {
            for (var i = 0; i < numberOfAnimatedItems; i++) {
              if ($(animatedItems[i]).position().top < $(sectionSelector).height()){
                $(animatedItems[i]).addClass('go');
              }
            }
          }
          // Run animations when the new card is initially visible.
          animateInSectionView();

          // Trigger all animation in view on scroll.
          sectionSelector.scroll(function () {
            animateInSectionView();
          });
        },
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
      });
      $('.next-page').click( function() {
        $.fn.pagepiling.moveSectionDown();
      });
    }
  };
})(jQuery, Drupal);
