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

  chapterNav.setActiveItem = function (target) {
    var count = chapterNav.navItems.length;
    var chapterIndex = target.getAttribute('data-chapter-index');
    var item = chapterNav.navItems[chapterIndex];
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

  chapterNav.onNavItemClicked = function (target) {
    var page;
    var chapter;
    chapter = fds.rootElement.querySelector(target.getAttribute('href'));
    page = chapter.querySelector('.page');
    fds.pages.snapScroll(page, null, win.innerHeight);
  };

  chapterNav.onScroll = function () {
    var scrollY = win.pageYOffset;
    var page = fds.pages.getCurrentPage();
    var chapter = page.parentElement;
    var chapterIndex = Number(fds.pages.hashes.chapter.substr('chapter'.length));
    var pageIndex = Number(page.getAttribute('data-page-index')) ? Number(page.getAttribute('data-page-index')) : 0;
    var pageCount = Number(chapter.getAttribute('data-chapter-length'));
    var chapterNavSegmentHeight = chapterNav.height / chapterNav.chapters.length;
    var pageToChapterRatio = page.clientHeight / chapter.clientHeight;
    var id = page.id;
    var count;
    var i;
    var item;
    var href;
    var scrollbarHeight = (chapterIndex * chapterNavSegmentHeight);
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
