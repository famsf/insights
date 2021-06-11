(function (win) {
  win.document.addEventListener('DOMContentLoaded', function () {
    var host = window.location.host;
    var localHosts = [
      'localhost',
      '0.0.0.0',
      '127.0.0.1',
      'localhost:3000',
      '0.0.0.0:3000',
      '127.0.0.1:3000'
    ];
    if (localHosts.indexOf(host) > -1) {
      // Lets use staging images for local development.
      host = 'staging--famsf-insights.netlify.com';
    }
    jScaler.process({
      TOKEN: 'a2coygopn',
      BASE_URL: 'https://' + host,
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
      DEFAULT_PARAMS: 'q70',
      DEFAULT_TYPE: 'resize',
      DEFAULT_WIDTH: "{small: '320x320', medium:'512x512', large: '600",
      DEFAULT_HEIGHT: "600', xlarge:'720x720', xxlarge:'960x960'}"
    });
    let imgs = document.querySelectorAll('img')
    for (let i = 0; i< imgs.length; i++) {
      let src = imgs[i].getAttribute('src');
      if (typeof src !== 'undefined' && src.indexOf('/resize/0/')) {
        src = 'https://google.com/logos/doodles/2021/uefa-euro-2020-6753651837109267-l.png';//src.replace('/resize/0/', '/resize/1000/');
        imgs[i].setAttribute('src', src);
      }
    }
  });
}(window));
