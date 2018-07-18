(function (fds, win, doc) {
  var mobileNav = {};
  fds.mobileNav = mobileNav;

  mobileNav.initialize = function (navSelector) {
    var navItems;
    var count;
    var i;
    var item;
    var a;
    mobileNav.nav = doc.getElementById(navSelector);
    navItems = mobileNav.nav.querySelectorAll('li');
    mobileNav.navItems = navItems;
    count = navItems.length;
    for (i = 0; i < count; i++) {
      item = navItems[i];
      a = item.querySelector('a');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        mobileNav.onItemClicked(e.currentTarget);
      });
    }
  };

  mobileNav.onItemClicked = function (item) {
    fds.chapterNav.onNavItemClicked(item);
  };

  mobileNav.setActiveItem = function (targetChapter) {
    var chapterIndex;
    var count = fds.chapterNav.navItems.length;
    var item;
    var i;
    chapterIndex = targetChapter.dataset.chapterIndex;
    item = mobileNav.navItems[chapterIndex];
    if (mobileNav.activeItem) {
      mobileNav.activeItem.classList.remove('active_item');
    }
    mobileNav.activeItem = item;
    item.classList.add('active_item');
  };
}(window.fds = window.fds || {}, window, document));
