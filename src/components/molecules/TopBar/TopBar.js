(function(fds, doc) {
  var topBar = fds.topBar = {}
  topBar.initialize = function(id) {
    topBar.el = document.getElementById(id)

    doc.addEventListener('topBarEvent', function(e) {
      // console.log('| topBarEvent » |', e.target.id, e.detail.action)
      switch(e.detail.action) {
        case 'invert':
          // console.log('» | »', doc.querySelector('.insights-app'))
          topBar.el.classList.add('invert')
          doc.querySelector('.insights-app').classList.add('invert')
        break
        case 'reset':
          // console.log('» | »', doc.querySelector('.insights-app'))
          topBar.el.classList.remove('invert')
          doc.querySelector('.insights-app').classList.remove('invert')
        break
      }
    }, {passive: true})
  }
}(window.fds = window.fds || {}, document));
