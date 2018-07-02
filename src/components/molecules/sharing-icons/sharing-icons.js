(function (fds, sharingIcons, window, document) {
  fds.initializeSharingIcons = function (el) {
    var hash;
    var shareUrl;
    var shareFacebook;
    var shareTwitter;
    var url = window.location.origin;
    /*
    This was breaking on in depths slide, for some reason el.closest('.page')
    was returning undefined).
    I think we can just read the location hash, and dont need to rad the page id,
    since the hash changes as the page scrolls in.
    */
    if (!el.closest('.page')) return;
    hash = el.closest('.page').id;
    shareUrl = url + '%23' + hash;
    shareFacebook = el.querySelector('.share--facebook');
    shareTwitter = el.querySelector('.share--twitter');

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
