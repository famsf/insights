(function (fds, win, doc) {
  var mobileNav = {};
  fds.mobileNav = mobileNav;

  mobileNav.initialize = function (navSelector) {
    var navItems;
    mobileNav.nav = doc.getElementById(navSelector);
    navItems = mobileNav.nav.querySelectorAll('li');
    mobileNav.navItems = navItems;
  };

  mobileNav.setActiveItem = function (target) {
    var chapterIndex = target.getAttribute('data-chapter-index');
    var item = mobileNav.navItems[chapterIndex];
    if (mobileNav.activeItem) {
      mobileNav.activeItem.classList.remove('active_item');
    }
    mobileNav.activeItem = item;
    item.classList.add('active_item');
  };
}(window.fds = window.fds || {}, window, document));
