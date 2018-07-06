(function (fds, win, doc) {
  var chapterNav = {};
  fds.chapterNav = chapterNav;
  chapterNav.initialize = function (navSelector, chapterSelector, clearElementSelector) {
    var lastId;
    var navItems;
    var clearElement;
    var count;
    var i;
    var navItem;
    var a;
    chapterNav.nav = doc.getElementById(navSelector);
    navItems = chapterNav.nav.querySelectorAll('li');
    chapterNav.navItems = navItems;
    clearElement = fds.rootElement.querySelector(clearElementSelector);
    count = navItems.length;
    chapterNav.height = chapterNav.nav.querySelector('ul').clientHeight;
    chapterNav.clearHeight = (clearElement) ? clearElement.clientHeight : 0;
    chapterNav.chapters = fds.rootElement.querySelectorAll(chapterSelector);
    chapterNav.scrollPercent = chapterNav.nav.querySelector('.scroll_percent');
    for (i = 0; i < count; i++) {
      navItem = chapterNav.navItems[i];
      a = navItem.querySelector('a');
      if (chapterNav.chapters[i]) {
        a.setAttribute('data-top-target', chapterNav.chapters[i].offsetTop);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          chapterNav.onNavItemClicked(e.currentTarget);
        });
      }
    }
  };

  chapterNav.setActiveItem = function (targetChapter) {
    var chapterIndex;
    var count = chapterNav.navItems.length;
    var item = chapterNav.navItems[targetChapter.dataset.chapterIndex];
    var i;
    for (i = 0; i < count; i++) {
      if (i <= chapterIndex) {
        chapterNav.navItems[i].classList.add('past');
      }
      else {
        chapterNav.navItems[i].classList.remove('past');
      }
    }
    if (chapterNav.activeItem) {
      chapterNav.activeItem.classList.remove('active_item');
    }
    chapterNav.activeItem = item;
    item.classList.add('active_item');
  };

  chapterNav.onNavItemClicked = function (clickTarget) {
    var page;
    var pageEl;
    var chapter;
    chapter = fds.rootElement.querySelector(clickTarget.getAttribute('href'));
    pageEl = chapter.querySelector('.page');
    page = fds.pages.byId[pageEl.id];
    fds.pages.snapScroll(page, null, win.innerHeight);
  };

  chapterNav.onScroll = function () {
    var scrollY = win.pageYOffset;
    var page = fds.pages.getCurrentPage();
    var chapter = page.chapter;
    var chapterIndex = page.chapterIndex;
    var pageIndex = page.index ? page.index : 0;
    var pageCount = page.chapterLength;
    console.log('»»»»»»', chapter)
    var chapterNavSegmentHeight = chapterNav.height / chapterNav.chapters.length;
    var pageToChapterRatio = page.clientHeight / chapter.clientHeight;
    var id = page.id;
    var count;
    var i;
    var item;
    var href;
    var scrollbarHeight;
    scrollbarHeight = (chapterIndex * chapterNavSegmentHeight);
    scrollbarHeight += (pageIndex > 0) ? (chapterNavSegmentHeight * pageToChapterRatio) : 0;
    chapterNav.scrollPercent.style.height = Math.round(scrollbarHeight) + 'px';
    if (chapterNav.lastId !== id) {
      chapterNav.lastId = id;
      count = chapterNav.navItems.length;
      for (i = 0; i < count; i++) {
        item = chapterNav.navItems[i];
        href = item.querySelector('a').getAttribute('href');
        if (href !== '#' + id) {
          item.classList.remove('active');
        }
        else {
          item.classList.add('active');
          window.location.hash = '#' + href;
        }
      }
      item = null;
    }
    page = null;
    chapter = null;
    id = null;
  };
}(window.fds = window.fds || {}, window, document));
