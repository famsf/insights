(function (components, win, $) {
  var inDepthSliderOptions = {
    margin: 0,
    autoPlay: 1000,
    slideSpeed: 1000,
    smartSpeed: 1000,
    mouseDrag: false,
    loop: false,
    nav: true,
    dots: true,
    items: 1
  };
  components.inDepthSlider = {};
  components.inDepthSlider.trigger = function (page) {
  };
  components.inDepthSlider.untrigger = function (page) {
  };
  components.inDepthSlider.instantiate = function (page) {
    var $pageEl = $(page.el);
    var inDepthSlider = $pageEl.find('.in-depth-slider > .horizontal-image-slider');
    console.log('!');
    $('.slide--in-depth__intro__button').click(function () {
      $(this).closest('.in-depth-slider').toggleClass('open');
    });
    $('.in-depth__toggle').click(function () {
      $(this).closest('.in-depth-slider').toggleClass('open');
      // Simulate a click on the first slide dot nav link.
      $(this).siblings('.owl-carousel').find('.owl-dots .owl-dot:first-of-type').trigger('click');
    });
    if (Foundation.MediaQuery.is('small only')) {
      inDepthSlider.addClass('off');
    }
    else {
      inDepthSlider.owlCarousel(inDepthSliderOptions);
    }
    $(win).resize(function () {
      if (Foundation.MediaQuery.atLeast('medium')) {
        if ($('.owl-carousel').hasClass('off')) {
          inDepthSlider.owlCarousel(inDepthSliderOptions);
          inDepthSlider.removeClass('off');
        }
      }
      else {
        inDepthSlider.removeClass('owl-hidden');
        if (!$('.owl-carousel').hasClass('off')) {
          inDepthSlider.addClass('off').trigger('destroy.owl.carousel');
          inDepthSlider.find('.owl-stage-outer').children(':eq(0)').unwrap();
        }
      }
    });
  };
}(window.fds.components = window.fds.components || {}, window, jQuery));
