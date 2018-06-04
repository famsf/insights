(function(fds, topBar, win, doc, log) {

  topBar.initialize = function(id, winScroll) {
    topBar.el = document.getElementById(id)
    doc.addEventListener('topBarEvent', function(e) {
      switch(e.detail.action) {
        case 'invert':
          topBar.el.classList.add('invert')
        break
        case 'reset':
          topBar.el.classList.remove('invert')
        break
      }
    }, {passive: true})
  }


}(window.fds = window.fds || {}, window.fds.topBar = window.fds.topBar || {}, window, document, console.log));
