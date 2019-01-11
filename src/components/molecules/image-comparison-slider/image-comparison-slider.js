/* eslint-disable */
(function ($) {
  $(document).ready(function () {
    $.fn.BeerSlider = function (options) {
      options = options || {};
      return this.each(function () {
        new BeerSlider(this, options);
      });
    };
    $('.beer-slider').each(function (index, el) {
      $(el).removeClass('pre-load');
      $(el).BeerSlider();
    });
  });
}(jQuery));
