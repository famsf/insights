/**
 * @file
 * A JavaScript file for the setting header height within a section hero.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {

  Drupal.behaviors.section_hero_header_set_height = {
    attach: function(context, settings) {
      // Debounce function to keep  resize events from firing to frequently.
      function debounce(method, delay) {
          clearTimeout(method._tId);
          method._tId= setTimeout(function(){
              method();
          }, delay);
      }
      // Helper function to get the default rem size.
      var rem = function rem() {
        var html = $('html');
        return function () {
          return parseInt(html.css('font-size'));
        };
      }();
      // Function for setting heights on section headers and site headers.
      var setHeights = function(elements) {
        for (var i = elements.length - 1; i >= 0; i--) {
          // calculate 3.7rem to add to height;
          var remAddHeight = (parseInt((3.7 * rem()), 10));
          var headerHeight = $(elements[i]).find('.js-section-hero--get_height').outerHeight();
          var matchedHeight = headerHeight + remAddHeight;
          $(elements[i]).find('.js-section-hero--set_height').height(matchedHeight);
        }
      };

      // Find all the section and site hero sections.
      var sectionHeroes = $('.section-hero');
      var siteHeroes = $('.site-hero');

      // Function for setting all headers on load and resize.
      var setAllHeroHeaderHeights = function() {
        setHeights(siteHeroes);
        setHeights(sectionHeroes);
      };

      // Get and set all site hero and section hero headers.
      $(window).on("load resize",function(e){
        debounce(setAllHeroHeaderHeights, 20);
      });

    }
  };
})(jQuery, Drupal);
