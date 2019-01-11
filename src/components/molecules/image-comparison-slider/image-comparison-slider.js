/* eslint-disable */
(function ($) {
  $(document).ready(function () {
    $.fn.BeerSlider = function (options) {
      options = options || {};
      return this.each(function () {
        new BeerSlider(this, options);
      });
    };
    setTimeout(function(){
      $('.beer-slider').each(function (index, el) {
        $(el).removeClass('pre-load');
        $(el).BeerSlider();
      });
    }, 5000);
  });
}(jQuery));
