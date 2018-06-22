(function (fds, chapterNav, win, doc, log) {
  chapterNav.initialize = function (navSelector, chapterSelector, clearElementSelector) {
    var lastId;
    var nav = doc.querySelector(navSelector);
    var clearElement = doc.querySelector(clearElementSelector);
    var count;
    var anchor;
    var top;
    var i;
    chapterNav.clearHeight = (clearElement) ? clearElement.clientHeight : 0;
    chapterNav.chapters = doc.querySelectorAll(chapterSelector);
    chapterNav.navItems = nav.querySelectorAll('li');
    count = chapterNav.navItems.length;
    for (i = 0; i < count; i++) {
      anchor = chapterNav.navItems[i].querySelector('a');
      top = doc.getElementById(anchor.getAttribute('href').substr(1)).offsetTop;
      anchor.setAttribute('data-top-target', top);
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        win.scrollTo({
          top: e.target.getAttribute('data-top-target'),
          behavior: 'smooth'
        });
      });
    }
  };

  chapterNav.onScroll = function (scrollY) {
    var count;
    // We can probably not perform this loop if we ask pages for
    // 'activeitem' or match against 'current_page'.
    var currentPage = fds.pages.getCurrentPage();
    var chapter = fds.getParentEl(currentPage, '.chapter');
    var id = chapter.id;
    var i;
    var item;
    if (chapterNav.lastId !== id) {
      chapterNav.lastId = id;
      count = chapterNav.navItems.length;
      for (i = 0; i < count; i++) {
        item = chapterNav.navItems[i];
        if (item.querySelector('a').getAttribute('href') !== '#' + id) {
          item.classList.remove('active');
        }
        else {
          item.classList.add('active');
        }
      }
    }
  };
}(
  window.fds = window.fds || {},
  window.fds.chapterNav = window.fds.chapterNav || {},
  window,
  document,
  console.log
));
