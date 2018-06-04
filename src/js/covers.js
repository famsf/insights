(function(fds, covers, win, doc, log) {

  covers.initialize = function(containerSelector, chapterSelector, coverSelector) {
    covers.container = doc.querySelector(containerSelector)
    covers.coverSelector = coverSelector
    covers.covers = covers.container.querySelectorAll(coverSelector)
    covers.chapters = []
    var count = covers.covers.length
    for( var i = 0; i < count; i++) {
      var cover = covers.covers[i]
      var chap = fds.getParentEl(cover, '.chapter');
      covers.chapters.push(chap)
      console.log('||', chap.id, chap.offsetTop )
    }
  }

  covers.coverPageScroll = function(cover, scrollY) {

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

  covers.onScroll = function(scrollY, didResize) {
    var coverCount = covers.covers.length;
    for(var i = 0; i < coverCount; i++) {
      var cover = covers.covers[i]
      covers.coverPageScroll(cover, scrollY)
    }
  }
}( window.fds = window.fds || {}, window.fds.covers = window.fds.covers || {}, window, document, console.log));
