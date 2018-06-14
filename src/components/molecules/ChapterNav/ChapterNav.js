(function(fds, chapterNav, win, doc, log) {

  chapterNav.initialize = function(navSelector, chapterSelector, clearElementSelector) {
    var lastId
    var nav = doc.querySelector(navSelector)
    var clearElement = doc.querySelector(clearElementSelector)
    chapterNav.clearHeight = (clearElement)? clearElement.clientHeight : 0;
    chapterNav.chapters = doc.querySelectorAll(chapterSelector)
    chapterNav.navItems = nav.querySelectorAll('li')
    var count = chapterNav.navItems.length
    for(var i = 0; i < count; i++) {
      var anchor = chapterNav.navItems[i].querySelector('a')
      var top = doc.getElementById(anchor.getAttribute('href').substr(1)).offsetTop
      anchor.setAttribute('data-top-target', top)
      anchor.addEventListener('click', function(e) {
        e.preventDefault()
        win.scrollTo({
          top: e.target.getAttribute('data-top-target'),
          behavior: "smooth"
        })
      })
    }
  }

  chapterNav.onScroll = function(scrollY) {
   var count = chapterNav.chapters.length
   // we can probably not perform this loop if we ask pages for 'activeitem' or match against 'current_page'
   var currentPage = fds.pages.getCurrentPage()
   var chapter = fds.getParentEl(currentPage, '.chapter')
   var id = chapter.id
   // console.log( "Chapternav", currentPage, chapter.id, chapterNav.lastId, id)
   if (chapterNav.lastId !== id) {
     chapterNav.lastId = id
     var count = chapterNav.navItems.length
     for(var i = 0; i < count; i++) {
       var item = chapterNav.navItems[i]
       if(item.querySelector('a').getAttribute('href') !== `#${id}`) {
          item.classList.remove('active')
       } else {
         // console.log(item)
          item.classList.add('active')
       }
     }
     item = null;
   }
   currentPage = chapter = id = null;
  }
}( window.fds = window.fds || {}, window.fds.chapterNav = window.fds.chapterNav || {}, window, document, console.log));
