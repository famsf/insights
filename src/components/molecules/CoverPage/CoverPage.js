(function (fds, coverPage, win) {
  win.document.addEventListener('DOMContentLoaded', function () {
    fds.coverPageElement = document.getElementById('CoverPage');
    if (fds.coverPageElement) {
      fds.coverPageElement.backgroundClipPolyfill({
        patternID: 'mypattern',
        patternURL: 'https://3.bp.blogspot.com/-RE9D7tm8uVU/VvecOJZ5ddI/AAAAAAAAgqc/TUZpJwTFqH4TR7oG4J3GzuFhr1NOAuYJw/w1200-h630-p-k-no-nu/Lady%2Bwith%2BHat%2Band%2BFeather%2BBoa%2Bby%2BGustav%2BKlimt.jpg',
        class: 'headline'
      });
      fds.coverPage.initialize();
    }
  });

  fds.coverPage.initialize = function () {
    var imgSrc = fds.coverPageElement.getAttribute('data-bg-image');
    var imgAlt = fds.coverPageElement.getAttribute('data-bg-image-alt');
    var img = new Image();
    img.setAttribute('alt', imgAlt);
    img.setAttribute('src', imgSrc);
    img.classList.add('bg-image');
    fds.coverPageElement.querySelector('.underlay').appendChild(img);
    if (img.complete) {
      fds.onCoverImageLoaded();
    }
    else {
      img.addEventListener('load', function () {
        fds.onCoverImageLoaded();
      });
      img.addEventListener('error', function () {
        console.log('Failed to load cover image');
      });
    }
  };

  fds.onCoverImageLoaded = function () {
    fds.coverPageElement.classList.add('loaded');
    setTimeout(function () {
      fds.coverPageElement.classList.add('post_loaded');
      setTimeout(function () {
        fds.coverPageElement.classList.add('initialized');
      }, 750);
    }, 1250);
  };
}(window.fds = window.fds || {}, window.fds.coverPage = window.fds.coverPage || {}, window));
