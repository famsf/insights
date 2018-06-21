// <div id="video-controls" class="video--embed__controls">
//   <button type="button" class="play-payse">Play</button>
//   <input type="range" class="seek-bar" value="0">
//   <button type="button" class="mute">Mute</button>
//   <input type="range" class="volume-bar" min="0" max="1" step="0.1" value="1">
//   <button type="button" class="full-screen">Full-Screen</button>
// </div>


(function (fds, videoEmbed, window, document) {
  fds.initializeInlineVideo = function (el) {
    var controls = el.querySelector('.video--embed__controls');
    var playButton = controls.querySelector('.play-pause');
    var seekBar = controls.querySelector('.seek-bar');
    var muteButton = controls.querySelector('.mute');
    var volumeBar = controls.querySelector('.volume-bar');
    var video = el.querySelector('video');
    var timeStamp = el.querySelector('.currentTime');

    if (playButton) {
      playButton.addEventListener('click', function () {
        if (video.paused == true) {
          // Play the video
          video.play();
          // Update the button text to 'Pause'
          playButton.innerHTML = 'Pause';
        }
        else {
          // Pause the video
          video.pause();
          // Update the button text to 'Play'
          playButton.innerHTML = 'Play';
        }
      });
    }


    if (muteButton) {
      // Event listener for the mute button
      muteButton.addEventListener('click', function () {
        if (video.muted == false) {
          // Mute the video
          video.muted = true;
          // Update the button text
          muteButton.innerHTML = 'Unmute';
        }
        else {
          // Unmute the video
          video.muted = false;
          // Update the button text
          muteButton.innerHTML = 'Mute';
        }
      });
    }

    if (seekBar) {
      // Event listener for the seek bar
      seekBar.addEventListener('change', function () {
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);
        // Update the video time
        video.currentTime = time;
        timeStamp.innerHTML = currentTime + '/' + videoDuration;
      });


      // Pause the video when the slider handle is being dragged
      seekBar.addEventListener('mousedown', function () {
        video.pause();
      });

      // Play the video when the slider handle is dropped
      seekBar.addEventListener('mouseup', function () {
        video.play();
      });
    }

    if (volumeBar) {
      // Event listener for the volume bar
      volumeBar.addEventListener('change', function () {
        // Update the video volume
        video.volume = volumeBar.value;
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var vids = document.querySelectorAll('.video--embed');
    var count = vids.length;
    for (var i = 0; i < count; i++) {
      fds.initializeInlineVideo(vids[i]);
    }
  });
}(window.fds = window.fds || {}, window.fds.videoEmbed = window.fds.videoEmbed || {}, window, document));
