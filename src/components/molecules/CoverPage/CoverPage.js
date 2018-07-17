(function (fds, coverPage, win) {
  win.document.addEventListener('DOMContentLoaded', function () {
    fds.coverPageElement = document.getElementById('CoverPage');
    if (fds.coverPageElement) {
      fds.coverPageElement.backgroundClipPolyfill({
        patternID: 'mypattern',
        patternURL: fds.coverPageElement.dataset.bgImage,
        class: 'headline'
      });
    }
  });

  fds.coverPage.initialize = function () {
    var imgSrc = fds.coverPageElement.dataset.bgImage;
    var imgAlt = fds.coverPageElement.dataset.bgImageAlt;
    var downArrow = fds.coverPageElement.querySelector('.down_arrow');
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
    downArrow.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('down arrow clicked', fds.coverPageElement.closest('.page').nextElementSibling.id);
      fds.pages.nextPage(fds.coverPageElement.closest('.page').nextElementSibling.id);
    });
  };

  fds.onCoverImageLoaded = function () {
    fds.coverPageElement.classList.add('loaded');
    console.log('onCoverImageLoaded');
    setTimeout(function () {
      fds.coverPageElement.classList.add('post_loaded');
      fds.rootElement.querySelector('.page').classList.add('triggered');
      console.log('shouldUnlock');
      win.document.body.classList.remove('loading');
      win.document.body.classList.remove('scroll_lock');
      fds.scrollLock = false;
      fds.rootElement.classList.add('initialized');
      console.log('rootElement.initialized');
      setTimeout(function () {
        console.log('coverImageInitialized');
        fds.coverPageElement.classList.add('initialized');
      }, 700);
    }, 1250);
  };
}(window.fds = window.fds || {}, window.fds.coverPage = window.fds.coverPage || {}, window));
