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
      var audioButton = $('.audio__button-js');
      // Function to play and pause audio and toggle button states.
      var buttonToggle = function(button) {
        // Find the audio source related to this button.
        var audioSource = button.closest('.audio__wrapper-js').find('.audio__source-js');
        // Preload audio.
        // @todo: This should probably happen more globally and when a section
        // loads as part of the lazy loader functionality.
        audioSource.get(0).preload = "auto";
        // Toggle the class.
        // Toggle the button text and audio.
        var playButton = button.find('.icon--play-js');
        var pauseButton = button.find('.icon--pause-js');
        if (playButton.is(':visible')) {
          audioSource.get(0).play();
          playButton.hide(0);
          pauseButton.show(0);
        }
        else {
          audioSource.get(0).pause();
          playButton.show(0);
          pauseButton.hide(0);
        }
        // When the sound finishes playing, restore the button states.
        audioSource.get(0).onended = function(){
          playButton.show(0);
          pauseButton.hide(0);
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
