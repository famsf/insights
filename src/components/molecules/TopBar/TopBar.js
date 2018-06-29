(function (fds, doc) {
  var topBar = {};
  fds.topBar = topBar;
  topBar.initialize = function (id) {
    topBar.el = document.getElementById(id);
    doc.addEventListener('topBarEvent', function (e) {
      switch (e.detail.action) {
        case 'invert':
          topBar.el.classList.add('invert');
          doc.querySelector('.insights-app').classList.add('invert');
          break;
        case 'reset':
          topBar.el.classList.remove('invert');
          doc.querySelector('.insights-app').classList.remove('invert');
          break;
        default:
          console.log('Warning: unknown topbar event.');
          break;
      }
    }, { passive: true });
  };
}(window.fds = window.fds || {}, document));
