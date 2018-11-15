(function (fds, win, doc) {
  var chapterNav = {};
  fds.chapterNav = chapterNav;
  fds.chapterNav.isHidden = false;

  chapterNav.initialize = function (navSelector, chapterSelector, clearElementSelector) {
    var lastId;
    var navItems;
    var clearElement;
    var currentChapterIndex;
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
        }, false);
      }
    }
    chapterNav.hideNav();
  };

  chapterNav.setActiveItem = function (targetChapter) {
    var chapterIndex;
    var count = chapterNav.navItems.length;
    var item;
    var i;
    chapterIndex = targetChapter.dataset.chapterIndex;
    chapterNav.currentChapterIndex = chapterIndex;
    item = chapterNav.navItems[chapterIndex];
    for (i = 0; i < count; i++) {
      if (i <= chapterIndex) {
        item.classList.add('past');
      }
      else {
        item.classList.remove('past');
      }
    }
    if (chapterNav.activeItem) {
      chapterNav.activeItem.classList.remove('active_item');
    }
    chapterNav.activeItem = item;
    item.classList.add('active_item');
    chapterNav.updateIndicator();
  };

  chapterNav.showNav = function () {
    chapterNav.nav.classList.remove('hidden');
    chapterNav.nav.classList.add('showy');
    chapterNav.isHidden = false;
  };

  chapterNav.hideNav = function () {
    chapterNav.nav.classList.add('hidden');
    chapterNav.nav.classList.remove('showy');
    chapterNav.isHidden = true;
  };

  chapterNav.onNavItemClicked = function (clickTarget) {
    var page;
    var pageEl;
    var chapter;
    var scrollDir;
    chapter = fds.rootElement.querySelector(clickTarget.getAttribute('href'));
    pageEl = chapter.querySelector('.page');
    page = fds.pages.byId[pageEl.id];
    // console.log(':::', chapter.dataset.chapterIndex, chapterNav.currentChapterIndex);
    if (fds.pages.currentPage) {
      if (chapter.dataset.chapterIndex > chapterNav.currentChapterIndex) {
        scrollDir = 'down';
      }
      else {
        scrollDir = 'up';
      }
    }
    fds.pages.snapScroll(page, {
      scrollDir: scrollDir,
      unpin: true
    });
  };

  chapterNav.updateIndicator = function () {
    var scrollY = win.pageYOffset;
    var page = fds.pages.getCurrentPage();
    var chapter = page.chapter;
    var chapterIndex = page.chapterIndex;
    var pageIndex = page.index ? page.index : 0;
    var pageCount = page.chapterLength;
    var chapterNavSegmentHeight = Math.round(chapterNav.height / (chapterNav.chapters.length - 1));
    var pageToChapterRatio = page.el.clientHeight / chapter.clientHeight;
    var id = page.id;
    var count;
    var i;
    var item;
    var href;
    var scrollbarHeight;
    var pageSegmentHeight = chapterNavSegmentHeight / pageCount;
    // console.log('updatingIndicator number of pages in the chapter is', pageCount, ' the current page index is', page.index, 'and a page segment is', pageSegmentHeight, 'pixels tall');
    scrollbarHeight = (chapterIndex * chapterNavSegmentHeight);
    scrollbarHeight += pageSegmentHeight * pageIndex;
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
