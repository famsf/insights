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

      if ($('.js-pagepiling').length) {
        // The user is on a page that uses pagepiling.js.
        // Create an array of section IDs for the pagepiling card deck.
        // This is required to create hashtag sections and scroll-to links.
        var sectionElements = $('.js-section');
        var sectionIds = [];
        // Set variable to be at zero when scrolling, one if a link has been clicked.
        var jumpSection = 0;
        var getSectionIds = function () {
          for (var i = sectionElements.length - 1; i >= 0; i--) {
            sectionIds.unshift($(sectionElements[i]).attr('id'));
          }
        };
        // Timer function for animation delay.
        var delayTimer = function(element, delay) {
          setTimeout(function() {
            $(element).addClass('go');
          }, delay);
        }
        // Function to animate things in the viewport.
        var animateInSectionView  = function(animatedItems, numberOfAnimatedItems, sectionSelector, loadableImages, numberOfloadableImages) {
          for (var i = animatedItems.length - 1; i >= 0; i--) {
            if ($(animatedItems[i]).offset().top < $(sectionSelector).height()){
              // Get the animation delay value.
              if (!$(animatedItems[i]).hasClass('go')) {
                var thisItem = animatedItems[i];
                var delayNumber = $(animatedItems[i]).attr('class').match(/\d+/g); // ... matching "delay-?"
                if (delayNumber) {
                  var delayNumInt = parseInt(delayNumber[0]);
                  // If the animation has delay use setTimeout.
                  delayTimer(thisItem, delayNumInt)
                } else {
                  // Animation starts without a delay.
                  $(animatedItems[i]).addClass('go');
                }
              }
            }
          };
          for (var j = 0; j < numberOfloadableImages; j++) {
            if (!$(loadableImages[j]).hasClass('lazy-loaded')) {
              if ($(loadableImages[j]).offset().top < $(sectionSelector).height()){
                $(loadableImages[j]).lazyLoadXT();
              }
            }
          }
        };
        getSectionIds();
        // Configure Lazy load to not run automatically.
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
        $('.js-pagepiling', context).pagepiling({
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
          normalScrollElements: '.horizontal-slider',
          normalScrollElementTouchThreshold: 5,
          touchSensitivity: 5,
          keyboardScrolling: true,
          sectionSelector: '.js-section',
          animateAnchor: false,

          //events
          onLeave: function(index, nextIndex, direction){
            // Actions when the user transitions to a new card.
            // Select the next active index section element by it's index.
            var nextActiveSection = nextIndex - 1;
            var allSections = $('section.js-section');
            var sectionSelector = $('section.js-section').eq(nextActiveSection);
            var loadableImages = $(sectionSelector).find('img[data-src],div[data-bg]');
            var numberOfloadableImages = loadableImages.length;
            // lazyloadSection(sectionSelector);
            // Get all the animated items in the section.
            var animatedItems = sectionSelector.find('*.animated');
            var numberOfAnimatedItems = animatedItems.length;
            // Run animations when the new card is initially visible.
            animateInSectionView(animatedItems, numberOfAnimatedItems, sectionSelector, loadableImages, numberOfloadableImages);

            // Trigger all animation in view on scroll.
            sectionSelector.scroll(function () {
              animateInSectionView(animatedItems, numberOfAnimatedItems, sectionSelector, loadableImages, numberOfloadableImages);
            });
            var dashboardButton = $('.js-dashboard-toggle', context);
            // Close the dashboard after arriving at destination.
            if (dashboardButton.hasClass('js-opened')) {
              dashboardButton.trigger('click', context);
            }
            // Highlight the active section in the nav.
            var activeId = sectionSelector.attr('id');
            var dashboardLinks = $('.dashboard__nav-list').find('a');
            for (var i = dashboardLinks.length - 1; i >= 0; i--) {
              // Trim hash tag
              var href = $(dashboardLinks[i]).attr('href');
              var trimmed = href.substring(1);
              if (trimmed === activeId) {
                $(dashboardLinks[i]).addClass('active');
              } else {
                $(dashboardLinks[i]).removeClass('active');
              }
            }
            // Make sure we scroll to the top of the active section if a link was clicked.
            if (jumpSection == 1) {
              allSections.scrollTop(0);
              jumpSection = 0;
            }
          },
          afterLoad: function(anchorLink, index){
              setTimeout(function() {
                $('.js-loading', context).fadeOut(500);
              }, 2000);
              $('.dashboard__nav-item').click( function(){
                jumpSection = 1;
              })
          },
          afterRender: function(){
            // Complete lazy load on the first active section and hide the loader.
            var firstSection = $('.js-section.active');
            var hideLoader = function() {
              setTimeout(function() {
                $('.js-loading', context).fadeOut(500);
              }, 2000);
            };
            hideLoader();
            // lazyloadSection(firstSection, hideLoader());
            var loadableImages = $(firstSection).find('img[data-src],div[data-bg]');
            var numberOfloadableImages = loadableImages.length;
            var animatedItems = firstSection.find('*.animated');
            var numberOfAnimatedItems = animatedItems.length;
            // Run animations when the new card is initially visible.
            setTimeout(function() {
              animateInSectionView(animatedItems, numberOfAnimatedItems, firstSection, loadableImages, numberOfloadableImages);
            }, 1000);
            // Trigger all animation in view on scroll.
            firstSection.scroll(function () {
              animateInSectionView(animatedItems, numberOfAnimatedItems, firstSection, loadableImages, numberOfloadableImages);
            });
          },
        });
        $('.js-next-page', context).click( function() {
          $.fn.pagepiling.moveSectionDown();
        });
      } else {
        // The user is on a page that is  not using pagepiling so we should lazy load with auto init.
        $('.styleguide-component').addClass('animatedParent');
        $.extend($.lazyLoadXT, {
          autoInit: true,
          visibleOnly: false,
          selector: 'img[data-src],div[data-bg]'
        });
      }

      // Start the word fade slider
      $('.js-wordslider', context).each(function(){
        $(this).bxSlider({
          mode: 'fade',
          pager: false,
          controls: false,
          auto: true,
          speed: $(this).data('speed'),
          pause: $(this).data('pause')
        })
      });
      // Start each horizontal slider
       $('.js-horizontal-slider', context).each( function() {
        var sliderInstance =$(this).bxSlider({
          mode: 'horizontal',
          pager: false,
          controls: false,
          speed: 500,
          pause: 3000,
          touchEnabled: true,
          slideWidth: 320,
          moveSlides: $(this).data('moveslides'),
          minSlides: $(this).data('minslides'),
          maxSlides: $(this).data('maxslides'),
          slideMargin: 0,
          ariaHidden: false,
          preloadImages: 'visible',
          onSlideAfter: function($slideElement){
            // Do things after slide is loaded.
            // Load images in slider.
            // $('.js-horizontal-slider').find('img[data-src],div[data-bg]').lazyLoadXT();
          }
        });
        var horizontalPrev = $(sliderInstance).parents('.js-horizontal-slider__wrapper').find('.horizontal-slider-prev', context);
        var horizontalNext = $(sliderInstance).parents('.js-horizontal-slider__wrapper').find('.horizontal-slider-next', context);

        horizontalPrev.click( function(event) {
          event.preventDefault();
          sliderInstance.goToPrevSlide()
        });
        horizontalNext.click( function(event) {
          event.preventDefault();
          sliderInstance.goToNextSlide()
        });
      });
      // Drop caps
      $('.has-dropcaps').find('p:first').html(function (i, html)
      {
        return html.replace(/(<[^>]+>)?([a-zA-Z])/, '$1<span class="dropcap">$2</span>');
      });
      // Lede
      $('.has-lede').find('p:first').addClass('lede');

    }
  };
})(jQuery, Drupal);
