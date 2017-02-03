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

(function ($, Drupal) {

  Drupal.behaviors.site = {
    attach: function (context, settings) {
      // Create an array of section IDs for the page card deck.
      var sectionElements = $('.js-section');
      var sectionIds = [];
      function getSectionIds() {
        for (var i = sectionElements.length - 1; i >= 0; i--) {
          sectionIds.unshift($(sectionElements[i]).attr('id'));
        }
      }
      getSectionIds();

      // Start the slider
      $('.js-wordslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        speed: 1000,
        pause: 1500

      });
      $('.js-pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: false,
        sectionsColor: [],
        anchors: sectionIds,
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
      $('.js-next-page').click( function() {
        $.fn.pagepiling.moveSectionDown();
      });
      // hide last card "next page" button
      $('.js-next-page:last').hide();
    }
  };
})(jQuery, Drupal);
