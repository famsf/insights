(function (fds, Page, window) {
  var p;
  Page = function (el) {
    this.initialize(el);
    console.log('hihihi');
  };

  p = Page.prototype;
  p.constructor = Page;

  p.onEnter = function () {

  };
  p.onLeave = function () {

  };
  p.initialize = function (el) {
    this.el = el;
    el.setAttribute('data-instance', this);
    el.addEventListener('pageEvent', function (e) {
      console.log('pageEvent', e);
    });
  };
}(window.fds = window.fds || {}, window.fds.Page = window.fds.Page || {}, jQuery, window));
