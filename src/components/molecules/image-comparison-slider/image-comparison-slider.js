/* eslint-disable */
(function ($) {
  $(document).ready(function () {
    $.fn.BeerSlider = function (options) {
      options = options || {};
      return this.each(function () {
        new BeerSlider(this, options);
      });
    };
  //   setTimeout(function(){
  //     $('.beer-slider').each(function (index, el) {
  //       $(el).BeerSlider(
  //         $(this).find('.beer-reveal').removeClass('pre-load')
  //       );
  //     });
  //   }, 5000);
  });
}(jQuery));
