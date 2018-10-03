(function (fds, audioPlayer, window, document) {
  fds.initializeAudioPlayer = function (el) {
    var plyr;
    plyr = new Plyr(el, {
      hideControls: 'false',
      controls: ['play', 'progress', 'current-time', 'mute', 'volume']
    });
  };

  function audioPlayerCallback() {
    var player = document.querySelectorAll('audio');
    var count = player.length;
    var i;

    for (i = 0; i < count; i++) {
      fds.initializeAudioPlayer(player[i]);
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
