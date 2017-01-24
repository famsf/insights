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
        anchors: ['intro', 'section4-light', 'section4-dark', 'section-with-video', 'image-and-caption', 'section-with-zoom', 'image-and-caption', 'lastPage'],
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
  Drupal.behaviors.expander_toggle = {
    attach: function(context, settings) {
      // Close all expander elenments that need to be closed initially.
      $('.expander__is-closed').hide(0);
      // Function for expander component to expand and collapse.
      $('.icon--read-more').click(function(){
        // Define the target expandable div.
        var changeThisPanel = $(this).parents('.deep-dive').find('.deep-dive--wrapper');

        // Load button text from data attribute when div is expanded.
        var expandedText = 'Click to Close';

        // Load button text from data attribute when div is collapsed.
        var collapsedText = 'Click to Read More About Monet\'s Influences';

        var ThisSection = $(this).parents('.section');

        // Toggle the button and panel states.
        if (changeThisPanel.hasClass("expander__is-closed")) {
          $('.icon-arrow--up').show(0);
          $('.icon-arrow--down').hide(0);
          changeThisPanel.removeClass("expander__is-closed").addClass("expander__is-open").slideDown(300);
          $(this).find('div').html(expandedText).attr('title', expandedText);
          /* @Todo:  scroll section up to top of page after expanding. */
          $('html, body').animate({
            scrollTop: changeThisPanel.offset().top
            // changeThisPanel.offset().top - sectionHeight
          }, 1000);

        }
        else if (changeThisPanel.hasClass("expander__is-open")) {
          $('.icon-arrow--down').show(0);
          $('.icon-arrow--up').hide(0);
          changeThisPanel.removeClass("expander__is-open").addClass("expander__is-closed").slideUp(300);
          $(this).find('div').html(collapsedText).attr('title', collapsedText);
        }
      });
    }
  };
  Drupal.behaviors.zoom_toggle = {
    attach: function(context, settings) {
      var zoomMarker = $('.zoom-marker-inner');
      var zoomClose = $('.zoom-close');
      var modalContent= $('.zoom-window__content');
      var modalWindow= $('.zoom-window');
      var modalOverlay = $('.zoom-overlay-background');

      // Listener for click on any zoom marker.
      zoomMarker.click(function(){
        var marker = $(this);
        var zoomPosition = marker.closest('.zoom-marker-outer');
        //Get the top and left properties of the marker
        var markerTop = zoomPosition.css('top');
        console.log(markerTop);
        var markerLeft = zoomPosition.css('left');
        console.log(markerLeft);
        var zoomImage = marker.closest('.figure__zoomable').find('.figure__zoomable-child');
        // Start to zoom in on the initial image.
        var zoomValues = markerLeft+" "+markerTop;
        zoomImage.get(0).style.transformOrigin = zoomValues;
        var detailedView = marker.closest('.zoom-group').find('.zoom-detail-view').clone();
        modalContent.toggleClass('zoom-window--is-visible').html(detailedView);
        setTimeout(function() {
          zoomImage.toggleClass('zoomed');
            setTimeout(function() {
              // Reveal the detail image.
              modalOverlay.toggleClass('zoom--is-open');
              setTimeout(function() {
                modalWindow.toggleClass('zoom-window--is-visible');
                modalContent.find('.zoom-detail-view').toggleClass('show-detail');
                setTimeout(function() {
                  zoomClose.show();
                  $('body').toggleClass('scroll-lock');
                }, 200);
              }, 200);
            }, 200);
        }, 300);
      });

      // Listener for a click on any zoom close button.
      zoomClose.click(function(){
        var closeButton = $(this);
        zoomClose.hide();
        // Hide the detail image.
        modalContent.find('.zoom-detail-view').toggleClass('show-detail');
        modalContent.toggleClass('zoom-window--is-visible').html();
        modalWindow.toggleClass('zoom-window--is-visible');
        setTimeout(function() {
          modalOverlay.toggleClass('zoom--is-open');
          // Zoom out on main image.
          $('.figure__zoomable-child.zoomed').toggleClass('zoomed');
          setTimeout(function() {
            $('body').toggleClass('scroll-lock');
          }, 200);
        }, 200);
      });
    }
  };
  Drupal.behaviors.captionInfo_toggle = {
    attach: function(context, settings) {
      $('.button-with-icon--caption-info').click(function() {
        $(this).closest('figure').find('figcaption').toggleClass('revealed');
      });
    }
  };
})(jQuery, Drupal);
