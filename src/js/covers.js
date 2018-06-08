(function(fds, win, doc) {

  var covers = fds.covers = {}

  covers.initialize = function(containerSelector, chapterSelector, coverSelector) {
    covers.container = doc.querySelector(containerSelector)
    covers.covers = covers.container.querySelectorAll(coverSelector)
  }

  covers.onScroll = function(scrollY, didResize) {
    var coverCount = covers.covers.length;
    for(var i = 0; i < coverCount; i++) {
      var cover = covers.covers[i]
      var coverScrollModifier = 0.75;
      var parentOffset = fds.getParentEl(cover, '.chapter').offsetTop
      var scrollOffset = scrollY - (parentOffset + cover.offsetTop)
      var coverOffset = -1 * scrollOffset * coverScrollModifier;
      if( coverOffset > 0 ) {
        coverOffset = 0
      }
      cover.nextElementSibling.style.marginTop = ( 105 * (win.innerHeight/win.innerWidth)) * .01 * win.innerHeight + 'px'
      cover.style.transform = `translate3d(0, ${coverOffset}px ,0)`
    }
  }
}( window.fds = window.fds || {}, window, document));
