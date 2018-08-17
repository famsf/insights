(function (win) {
  win.document.addEventListener('DOMContentLoaded', function () {
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

      // @TODO Cloudimage does not have a nice way of setting default
      // responsive image sizes, so we must do it in this hacky way for now
      // (Cloudimage code evals the string "DEFAULT_WIDTHxDEFAULT_HEIGHT").
      // We'll probably end up specifing the image sizes directly in the Twig
      // template via the `ci-size` img element attribute. Note that the change
      // would also need to get made to CoverPage.js and possibly the two
      // background image implementations (grep for `ci-responsive` to find all
      // usage).
      DEFAULT_TYPE: 'crop',
      DEFAULT_WIDTH: "{xs: '50x100', sm:'100x125', md: '150",
      DEFAULT_HEIGHT: "150', lg:'200x175', xl:'300x200'}"
    });
  });
}(window));
