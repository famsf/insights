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
      $.extend($.lazyLoadXT, {
        autoInit: false,
        edgeY:  10000,
        visibleOnly: false
      });
      var lazyloadSection = function(section) {
        $(section).find('img[data-src],div[data-bg]').lazyLoadXT();
        console.log(section);
      };
      $('.js-wordslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        speed: 2000,
        pause: 3000

      });
      $('.js-pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: false,
        sectionsColor: [],
        anchors: ['title', 'introduction', 'contending-with-convention', 'see-the-forest-through-the-trees', 'ambition-and-risk', 'paris-modernity-and-leisure', 'monet-and-the-sea', 'camille-monet-the-known-and-the-unknown', 'political-unrest', 'training-your-eye-color', 'training-your-eye-composition', 'observing-nature', 'lastPage'],
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
        sectionSelector: '.js-section',
        animateAnchor: false,

        //events
        onLeave: function(index, nextIndex, direction){
          // Select the next active index section element by it's index.
          var nextActiveSection = nextIndex - 1;
          var sectionSelector = $('section.js-section').eq(nextActiveSection);
          lazyloadSection(sectionSelector);
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
        afterLoad: function(anchorLink, index){
          // Start lazy load on the first active section.
          var firstSection = $('.js-section.active');
          lazyloadSection(firstSection);
          $('.js-loading').fadeOut(100);
        },
        afterRender: function(){},
      });
      $('.js-next-page').click( function() {
        $.fn.pagepiling.moveSectionDown();
      });
    }
  };
})(jQuery, Drupal);
