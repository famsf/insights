(function(fds, chapterNav, win, doc, log) {

  chapterNav.initialize = function(navSelector, chapterSelector, clearElementSelector) {
    var lastId;
    var nav = chapterNav.nav = doc.getElementById(navSelector);
    var clearElement = fds.rootElement.querySelector(clearElementSelector);
    chapterNav.height = chapterNav.nav.querySelector('ul').clientHeight;
    chapterNav.clearHeight = (clearElement)? clearElement.clientHeight : 0;
    chapterNav.chapters = fds.rootElement.querySelectorAll(chapterSelector);
    chapterNav.navItems = nav.querySelectorAll('li');
    chapterNav.scrollPercent = nav.querySelector('.scroll_percent');

    var count = chapterNav.navItems.length;
    for(var i = 0; i < count; i++) {
      var navItem = chapterNav.navItems[i];
      // var chap = chapterNav.chapters[i];
      var a = navItem.querySelector('a');
      a.setAttribute('data-top-target', top);
      // var top = el.offsetTop;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        if(fds.scrollLock) {
          return;
        }
        var chap = fds.rootElement.querySelector(e.currentTarget.getAttribute('href'));
        console.log('±±±±', fds.rootElement, chap, currentPage)
        var currentPage = chap.querySelector('.page');
        var scrollTo = chap.offsetTop + Number(currentPage.getAttribute('data-top-target'));
        fds.pages.setCurrentPage(currentPage);
        fds.scrollLock = true;
        fds.performantScrollTo(scrollTo, function(){ fds.scrollLock = false; }, 475);
      })
    }
  }

  chapterNav.onScroll = function(scrollY) {
   var page = fds.pages.getCurrentPage();
   console.log("CHAPTER", page.id, fds.getParentEl(page, '.chapter'))
   var chapter = fds.getParentEl(page, '.chapter');
   var chapterIndex = Number(chapter.getAttribute('data-chapter-index'));
   var pageIndex = Number(page.getAttribute('data-page-index')) ? Number(page.getAttribute('data-page-index')) : 0;
   var pageCount = Number(chapter.getAttribute('data-chapter-length'));
   var chapterNavSegmentHeight = chapterNav.height / chapterNav.chapters.length;
   var pageToChapterRatio = page.clientHeight / chapter.clientHeight;
   var scrollbarHeight = (chapterIndex * chapterNavSegmentHeight)
   scrollbarHeight += (pageIndex > 0) ? ( chapterNavSegmentHeight * pageToChapterRatio) : 0 ;
   var id = page.id;
   chapterNav.scrollPercent.style.height = Math.round(scrollbarHeight) + "px";

   if (chapterNav.lastId !== id) {
     chapterNav.lastId = id;
     var count = chapterNav.navItems.length;
     for(var i = 0; i < count; i++) {
       var item = chapterNav.navItems[i];
       if(item.querySelector('a').getAttribute('href') !== "#" + id) {
          item.classList.remove('active');
       } else {
          item.classList.add('active');
          window.location.hash = "#" + href;
       }
     }
     item = null;
   }
   page = chapter = id = null;
  }
}( window.fds = window.fds || {}, window.fds.chapterNav = window.fds.chapterNav || {}, window, document, console.log));
