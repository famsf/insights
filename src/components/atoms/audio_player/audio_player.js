(function (fds, audioPlayer, window, document) {
  fds.initializeAudioPlayer = function (el) {
    // do stuff=
    console.log('audio_player.js fired');

    var plyr;

    plyr = new Plyr(el, {
      hideControls: 'false',
      controls: ['play', 'progress', 'current-time']
    });

    // plyr.on('ready', function (e) {});
  };

  function audioPlayerCallback() {
    var audioPlayer = document.querySelectorAll('audio');
    var count = audioPlayer.length;
    var i;

    for (i = 0; i < count; i++) {
      fds.initializeAudioPlayer(audioPlayer[i]);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    audioPlayerCallback();
  });
}(
  window.fds = window.fds || {},
  window.fds.audioPlayer = window.fds.audioPlayer || {},
  window,
  document
));
