(function (fds, cloudimage, win) {
  cloudimage.responsify = function () {
    jScaler.process({
      TOKEN: 'a2coygopn',
      BASE_URL: 'https://insights.famsf.org'
    });
  };
  win.document.addEventListener('DOMContentLoaded', cloudimage.responsify);
}(window.fds = window.fds || {}, window.fds.cloudimage = window.fds.cloudimage || {}, window));
