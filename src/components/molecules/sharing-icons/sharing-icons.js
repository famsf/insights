(function (fds, sharingIcons, window, document) {
  fds.initializeSharingIcons = function (el) {
    var hash;
    var shareUrl;
    var shareFacebook;
    var shareTwitter;
    var url = window.location.origin + window.location.pathname;

    hash = encodeURIComponent(window.location.hash);
    hash += (el.closest('[data-author]') != null) ? encodeURIComponent('&commentary=true') : '';
    shareUrl = url + hash;
    shareFacebook = el.querySelector('.share--facebook');
    shareTwitter = el.querySelector('.share--twitter');

    if (shareFacebook) {
      shareFacebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl);
    }

    if (shareTwitter) {
      shareTwitter.setAttribute('href', 'https://twitter.com/intent/tweet?url=' + shareUrl);
    }
  };

  function sharingIconsThrottle(fn, wait) {
    var time = Date.now();

    return function () {
      if ((time + wait) - (Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  function sharingIconsCallback() {
    var sharingIconWrapper = document.querySelectorAll('.sharing-icons');
    var count = sharingIconWrapper.length;
    var i;

    for (i = 0; i < count; i++) {
      fds.initializeSharingIcons(sharingIconWrapper[i]);
    }
  }

  window.addEventListener('scroll', sharingIconsThrottle(sharingIconsCallback, 1000));

  document.addEventListener('DOMContentLoaded', function () {
    sharingIconsCallback();
  });
}(
  window.fds = window.fds || {},
  window.fds.sharingIcons = window.fds.sharingIcons || {},
  window,
  document
));
