/**
 * @file
 * A JavaScript file for the Playing HTML5 audio.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2016 Palantir.net
 */

(function ($) {
  Drupal.behaviors.audio_toggle = {
    attach: function(context, settings) {
      // Define audio play buttons
      var audioButton = $('.audio__button');
      // Function to play and pause audio and toggle button states.
      var buttonToggle = function(button) {
        // Find the audio source related to this button.
        var audioSource = button.closest('.audio__wrapper').find('.audio__source');
        // Preload audio.
        // @todo: This should probably happen more globally and when a section
        // loads as part of the lazy loader functionality.
        audioSource.get(0).preload = "auto";
        // Toggle the class.
        button.toggleClass('pause play');
        // Toggle the button text and audio.
        if (button.text() == 'play') {
          button.text('pause');
          audioSource.get(0).play();
        }
        else {
          button.text('play');
          audioSource.get(0).pause();
        }
        // When the sound finishes playing, restore the button states.
        audioSource.get(0).onended = function(){
          button.text('play');
          button.toggleClass('pause play');
        };
      };
      // Listener for the play button.
      audioButton.click(function() {
        var thisButton = $(this);
        buttonToggle(thisButton);
      });
    }
  };
})(jQuery, Drupal);
