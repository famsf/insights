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
      $('#pagepiling').pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: false,
        sectionsColor: [],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'lastPage'],
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
          var nextActiveSection = nextIndex - 1;
          $('section.section').eq(nextActiveSection).find('*.animated').addClass('go');
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
      $('.expander-link').click(function(){
        // Define the target expandable div.
        var changeThisPanel = $(this).parents('.segment--expandable').find('.expander-target');

        // Load button text from data attribute when div is expanded.
        var expandedText = 'read less about this';

        // Load button text from data attribute when div is collapsed.
        var collapsedText = 'read more about this';

        // Toggle the button and panel states.
        if (changeThisPanel.hasClass("expander__is-closed")) {
          changeThisPanel.removeClass("expander__is-closed").addClass("expander__is-open").slideDown(300);
          $(this).html(expandedText).attr('title', expandedText);
        }
        else if (changeThisPanel.hasClass("expander__is-open")) {
          changeThisPanel.removeClass("expander__is-open").addClass("expander__is-closed").slideUp(300);
          $(this).html(collapsedText).attr('title', collapsedText);
        }
      });
    }
  };

})(jQuery, Drupal);
