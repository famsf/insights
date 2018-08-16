(function (fds, cloudimage, win) {
  cloudimage.responsify = function () {
    jScaler.process({
      TOKEN: 'a2coygopn',
      BASE_URL: 'https://insights.famsf.org',

      // Set the responsive image breakpoints.
      ORDER: ['xl', 'lg', 'md', 'sm', 'xs'],
      PRESETS: {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920
      },

      // Set the srcset image sizes per breakpoint.
      DEFAULT_TYPE: 'crop',
      AUTO: [
        '50x100',
        '100x125',
        '150x150',
        '200x175',
        '300x200'
      ]
    });
  };
  win.document.addEventListener('DOMContentLoaded', cloudimage.responsify);
}(window.fds = window.fds || {}, window.fds.cloudimage = window.fds.cloudimage || {}, window));
