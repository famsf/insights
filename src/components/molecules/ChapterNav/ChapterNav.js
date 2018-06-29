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
    clearElement = fds.rootElement.querySelector(clearElementSelector);
    count = navItems.length;
    chapterNav.navItems = navItems;
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
    item.classList.add('active');
    for (i = 0; i < count; i++) {
      if (i <= chapterIndex) {
        chapterNav.navItems[i].classList.add('past');
      }
      else {
        chapterNav.navItems[i].classList.remove('past');
      }
    }
    console.log(item, target.getAttribute('data-chapter-index'));
    if (chapterNav.activeItem) {
      chapterNav.activeItem.classList.remove('active');
    }
    chapterNav.activeItem = item;
  };

  chapterNav.onNavItemClicked = function (target) {
    var chap;
    var currentPage;
    var scrollTo;
    var chapterElement;
    if (fds.scrollLock) {
      return;
    }
    chapterElement = fds.rootElement.querySelector(target.getAttribute('href'));
    currentPage = chapterElement.querySelector('.page');
    window.location.hash = '&chapter=' + chapterElement.id + '&page=' + currentPage.id;
    scrollTo = chapterElement.offsetTop + Number(currentPage.getAttribute('data-top-target'));
    fds.pages.setCurrentPage(currentPage);
    fds.scrollLock = true;
    fds.performantScrollTo(scrollTo, function () {
      fds.scrollLock = false;
    }, 475);
  };

  chapterNav.onScroll = function (scrollY) {
    var page = fds.pages.getCurrentPage();
    var chapter = page.parentElement;
    var chapterIndex = Number(chapter.getAttribute('data-chapter-index'));
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
