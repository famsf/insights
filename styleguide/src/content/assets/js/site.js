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

      if ($('.js-pagepiling').length) {
        // We are on a page that uses pagepiling.js.
        // Create an array of section IDs for the pagepiling card deck.
        // This is required to create hashtag sections.
        var sectionElements = $('.js-section');
        var sectionIds = [];
        var getSectionIds = function () {
          for (var i = sectionElements.length - 1; i >= 0; i--) {
            sectionIds.unshift($(sectionElements[i]).attr('id'));
          }
        };
        getSectionIds();

        $.extend($.lazyLoadXT, {
          autoInit: false,
          edgeY:  10000,
          visibleOnly: false
        });
        // Helper function so we can activate lazy load by section.
        var lazyloadSection = function(section, complete) {
          $(section).find('img[data-src],div[data-bg]').lazyLoadXT({oncomplete: complete});
        };
        // Initialize pagepiling.
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
          afterLoad: function(anchorLink, index){},
          afterRender: function(){
            // Start lazy load on the first active section and hide the loader.
            var firstSection = $('.js-section.active');
            var hideLoader = function() {
              $('.js-loading').fadeOut(200);
            };
            lazyloadSection(firstSection, hideLoader());
          },
        });
        $('.js-next-page').click( function() {
          $.fn.pagepiling.moveSectionDown();
        });
      } else {
        // We are not using pagepiling so we should lazy load with auto init.
        $.extend($.lazyLoadXT, {
          autoInit: true,
          visibleOnly: false,
          selector: 'img[data-src],div[data-bg]'
        });
      }

      // Start the word slider
      $('.js-wordslider').bxSlider({
        mode: 'fade',
        pager: false,
        auto: true,
        speed: 2000,
        pause: 3000

      });
    }
  };
})(jQuery, Drupal);
