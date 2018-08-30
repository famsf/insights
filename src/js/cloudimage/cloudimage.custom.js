(function (win) {
  win.document.addEventListener('DOMContentLoaded', function () {
    jScaler.process({
      TOKEN: 'a2coygopn',
      BASE_URL: 'https://insights.famsf.org',

      // See: _settings.scss for the Foundation breakpoint configuration.
      //
      // These responsive breakpoints match up with Foundation's breakpoint
      // configuration to ensure images are used at the proper breakpoint.
      //
      // Note: Cloudimage.io uses max-width's for their media queries while
      // Foundation uses min-width, otherwise these 2 configurations would
      // match exactly.
      ORDER: ['xxlarge', 'xlarge', 'large', 'medium', 'small'],
      PRESETS: {
        small: 640,
        medium: 1024,
        large: 1200,
        xlarge: 1440,
        xxlarge: 1920
      },

      // @TODO Cloudimage does not have a nice way of setting default
      // responsive image sizes, so we must do it in this hacky way for now
      // (Cloudimage code evals the string "DEFAULT_WIDTHxDEFAULT_HEIGHT").
      // We'll probably end up specifying the image sizes directly in the Twig
      // template via the `ci-size` img element attribute. Note that the change
      // would also need to get made to CoverPage.js and possibly the two
      // background image implementations (grep for `ci-responsive` to find all
      // usage).
      DEFAULT_TYPE: 'bound',
      DEFAULT_WIDTH: "{small: '320x320', medium:'512x512', large: '600",
      DEFAULT_HEIGHT: "600', xlarge:'720x720', xxlarge:'960x960'}"
    });
  });
}(window));
