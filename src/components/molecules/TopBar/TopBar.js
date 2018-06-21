(function (fds, doc) {
  var topBar = {};
  fds.topBar = {};
  topBar.initialize = function (id) {
    topBar.el = document.getElementById(id);
    doc.addEventListener('topBarEvent', function (e) {
      console.log('| topBarEvent » |', e.target.id, e.detail.action);
      switch (e.detail.action) {
        case 'invert':
          topBar.el.classList.add('invert');
          break;

        case 'reset':
          topBar.el.classList.remove('invert');
          break;

        default:
      }
    }, { passive: true });
  };
}(window.fds = window.fds || {}, document));
