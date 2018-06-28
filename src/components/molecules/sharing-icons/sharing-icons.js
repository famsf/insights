(function (fds, sharingIcons, window, document) {
  fds.initializeSharingIcons = function (el) {
    var url = window.location.origin;
    var hash = el.closest('.page').id;
    var shareUrl = url + '%23' + hash;
    var shareFacebook = el.querySelector('.share--facebook');
    var shareTwitter = el.querySelector('.share--twitter');

    if (shareFacebook) {
      shareFacebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl);
    }

    if (shareTwitter) {
      shareTwitter.setAttribute('href', 'https://twitter.com/intent/tweet?url=' + shareUrl);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var sharingIconWrapper = document.querySelectorAll('.sharing-icons');
    var count = sharingIconWrapper.length;
    var i;

    for (i = 0; i < count; i++) {
      fds.initializeSharingIcons(sharingIconWrapper[i]);
    }
  });
}(
  window.fds = window.fds || {},
  window.fds.sharingIcons = window.fds.sharingIcons || {},
  window,
  document
));
