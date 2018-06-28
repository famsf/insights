(function(fds, doc) {

  var pages = fds.pages = {};

  pages.initialize = function (containerSelector, pageSelector, clearElementSelector) {
    pages.container = doc.querySelector(containerSelector);
    pages.pages = doc.querySelectorAll(pageSelector);
    if (!pages.container || !pages.pages.length) {
      console.log('Warning: Failed to initialize pages, check your selectors, but maybe you`re just prototyping isolated components');
      return;
    }
    pages.currentPage = pages.pages[0];
    pages.clearElement = doc.querySelector(clearElementSelector);
    pages.clearElementHeight = pages.clearElement.clientHeight;
  }

  pages.getCurrentPage = function () {
    return pages.currentPage || pages.pages;
  }

  pages.setCurrentPage = function (pageEl) {
    if(pages.currentPage) {
      pages.oldCurrentPage = pages.currentPage;
      pages.oldCurrentPage.classList.remove('current');
    }
    pages.currentPage = pageEl;
    pages.currentPage.classList.add('current');
    return pageEl;
  }

  pages.onScroll = function (scrollY, scrollDir, wh, didResize) {

    var currentPage = pages.getCurrentPage();
    var shouldTriggerTopBar = false;
    var count = pages.pages.length;

    // Loop through pages, we can eventually filter out doing stuff to pages that are offscreen.
    for (var i = 0; i < count; i++) {

      var page = pages.pages[i];
      var chapter = fds.getParentEl(page, '.chapter');

      pageRect = page.getBoundingClientRect();

      var pageTopAboveViewportBottom = pageRect.top < pageRect.height;
      var pageTopBelowViewportBottom = pageRect.top > pageRect.height;
      var pageBottomBelowViewportTop = pageRect.top + pageRect.height > 0;
      var pageBottomAboveViewportTop = pageRect.top + pageRect.height < 0;
      var pageTopAboveViewportTop = pageRect.top < 0;
      var shouldAdvance = false;
      var shouldStabilize = false;

      if(scrollDir === 'down') {

        shouldTriggerTopBar = pageRect.top <= pages.clearElementHeight;

        if (pageBottomAboveViewportTop) {
          pages.pageLeftViewport(page);
        }
        else if (pageTopAboveViewportBottom) {
          pages.pageEnteredViewport(page);
        }
      }
      else if (scrollDir === 'up') {

        shouldTriggerTopBar = pageRect.top + pageRect.height > -1 * pages.clearElementHeight;

        if(pageTopAboveViewportTop && pageBottomBelowViewportTop) {
          pages.pageEnteredViewport(page);
        }
        else if (pageTopBelowViewportBottom ) {
          pages.pageLeftViewport(page);
        }
      }

      if(shouldTriggerTopBar) {
        pages.triggerTopBarEvents(page);
        pages.triggerPage(page);
      }

      if(fds.scrollLock ) return;
      var pageToScrollTo;
      //
      // console.log('| scrolldir | » |', currentPage.id, scrollDir)
      //
      // if( scrollY <= pageRect.top && (
      //     // advance
      //     ( scrollDir === 'down' && scrollY >= pageRect.top - ( 2 * wh * 0.33333 ) ) ||
      //     // stabilize
      //     ( scrollDir === 'up' && scrollY >= pageRect.top - ( wh * 0.33333 ) )
      //   ) ||
      //   scrollY >= pageRect.top && (
      //     // advance
      //     ( scrollDir === 'up' && scrollY <= pageRect.top + ( 2 * wh * 0.33333 ) ) ||
      //     // stabilize
      //     ( scrollDir === 'down' && scrollY <= pageRect.top + ( wh * 0.33333 ) )
      //   )
      // ) {
      //   if(scrollDir === 'down') {
      //     var nextSibling = page.nextElementSibling;
      //     if(!nextSibling) {
      //       nextSibling = chapter.nextElementSibling.querySelector('.page');
      //       nextChapterPages[nextChapterPages.length - 1];
      //     }
      //     pageToScrollTo = nextSibling;
      //   } else if (scrollDir === 'up'){
      //     var prevSibling = page.previousElementSibling;
      //     if(!prevSibling) {
      //       var prevChapterPages = chapter.previousElementSibling.querySelectorAll('.page');
      //       prevSibling = prevChapterPages[prevChapterPages.length - 1];
      //     }
      //     pageToScrollTo = prevSibling;
      //   }
      //   // console.log('scrollSnapTo » |', page.id, scrollDir, page.previousElementSibling, page.nextElementSibling, pageRect.top, chapter.offsetTop, scrollY)
      //   if(!fds.scrollLock) fds.scrollLock = true;
      //   scrollTo = chapter.offsetTop + pageToScrollTo.offsetTop;
      //   fds.performantScrollTo( scrollTo, function(){
      //     fds.scrollLock = false;
      //     console.log('make scrollLock false');
      //   }, 475, page.id);
      // }

    }
  }

  pages.triggerPage = function (page) {
    if (page.classList.contains('in_viewport') && !page.classList.contains('triggered')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'trigger' }
      }));
    }
  }

  pages.pageLeftViewport = function (page) {
    if (page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'leave' }
      }));
    }
  }

  pages.pageEnteredViewport = function (page) {
    if(!page.classList.contains('in_viewport')) {
      page.dispatchEvent(new CustomEvent('pageEvent', {
        bubbles: true,
        detail: { action: 'enter' }
      }));
    }
  }

  pages.triggerTopBarEvents = function (page) {
    // console.log('triggerTopBarEvents', page)
    if (page.classList.contains('invert-top-bar') &&  !fds.topBar.el.classList.contains('inverted-top-bar')) {
      page.dispatchEvent(new CustomEvent('topBarEvent', {
        bubbles: true,
        detail: { action: 'invert' }
      }, { passive: true }));
    }
    else {
      page.dispatchEvent(new CustomEvent('topBarEvent', {
        bubbles: true,
        detail: { action: 'reset' }
      }, { passive: true }));
    }
  }

  // For performance reasons we group our event handlers and create custom evennts
  doc.addEventListener('pageEvent', function (e) {
    switch(e.detail.action) {
        case 'enter':
        e.target.classList.add('in_viewport');
        pages.lastToEnter = e.target;
        break;

      case 'leave':
        e.target.classList.remove('in_viewport');
        e.target.classList.remove('triggered');
        break;

      case 'trigger':
        if(!e.target.classList.contains('triggered')) {
          pages.setCurrentPage(e.target);
          e.target.classList.add('triggered');
        }
        break;

      default:
        console.log('Warning: unknown page event', e.target, e.detail);
        break;
    }
  }, {passive: true});

}(window.fds = window.fds || {}, document));
