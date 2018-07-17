(function (fds, win, doc) {
  var chapterNav = {};
  fds.chapterNav = chapterNav;
  fds.chapterNav.isHidden = false;

  chapterNav.initialize = function (navSelector, chapterSelector, clearElementSelector) {
    var lastId;
    var navItems;
    var clearElement;
    var count;
    var i;
    var navItem;
    var a;
    var footerOffset;
    chapterNav.nav = doc.getElementById(navSelector);
    navItems = chapterNav.nav.querySelectorAll('li');
    chapterNav.navItems = navItems;
    clearElement = fds.rootElement.querySelector(clearElementSelector);
    count = navItems.length;
    chapterNav.height = chapterNav.nav.querySelector('ul').clientHeight;
    chapterNav.clearHeight = (clearElement) ? clearElement.clientHeight : 0;
    chapterNav.chapters = fds.rootElement.querySelectorAll(chapterSelector);
    chapterNav.scrollPercent = chapterNav.nav.querySelector('.scroll_percent');
    footerOffset = document.getElementById('insights__footer').parentElement.offsetTop + document.getElementById('insights__footer').offsetTop;
    for (i = 0; i < count; i++) {
      navItem = chapterNav.navItems[i];
      a = navItem.querySelector('a');
      if (chapterNav.chapters[i] && navItem.id !== 'chapter_nav__footer_link') {
        a.setAttribute('data-top-target', chapterNav.chapters[i].offsetTop);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          chapterNav.onNavItemClicked(e.currentTarget);
        }, false);
      }
      else if (navItem.id === 'chapter_nav__footer_link') {
        /* We wouldnt need this sillyness if footer was a chapter */
        a.addEventListener('click', function (e) {
          e.preventDefault();
          fds.pages.scrollToFooter(footerOffset);
        });
      }
    }
    chapterNav.hideNav();
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

  chapterNav.showNav = function () {
    chapterNav.nav.classList.remove('hidden');
    chapterNav.isHidden = false;
  };

  chapterNav.hideNav = function () {
    chapterNav.nav.classList.add('hidden');
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
    console.log('currentPage', fds.pages.currentPage.id);
    if(fds.pages.currentPage) {
      if (page.index > fds.pages.currentPage.index) {
        scrollDir = 'down';
      }
      else {
        scrollDir = 'up';
      }
    }
    fds.pages.snapScroll(page, scrollDir, win.innerHeight, true);
  };

  chapterNav.onScroll = function () {
    var scrollY = win.pageYOffset;
    var page = fds.pages.getCurrentPage();
    var chapter = page.chapter;
    var chapterIndex = page.chapterIndex;
    var pageIndex = page.index ? page.index : 0;
    var pageCount = page.chapterLength;
    var chapterNavSegmentHeight = chapterNav.height / chapterNav.chapters.length;
    var pageToChapterRatio = page.el.clientHeight / chapter.clientHeight;
    var id = page.id;
    var count;
    var i;
    var item;
    var href;
    var scrollbarHeight;
    scrollbarHeight = (chapterIndex * chapterNavSegmentHeight);
    scrollbarHeight += (pageIndex > 0) ? (chapterNavSegmentHeight / pageCount) * pageIndex : 0;
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
