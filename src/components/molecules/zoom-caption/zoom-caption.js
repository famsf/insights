(function (window, $) {
  var $toggleButtons = $('.inline-caption-button');
  $toggleButtons.on('click', function () {
    if ($(this).siblings('.inline-caption-content').hasClass('show')) {
      $(this).siblings('.inline-caption-content').removeClass('show');
      $(this).fadeOut(200, function () {
        $(this).text('＋').fadeIn(200);
      });
    }
    else {
      $(this).siblings('.inline-caption-content').addClass('show');
      $(this).fadeOut(200, function () {
        $(this).text('✕').fadeIn(200);
      });
    }
  });
}(window, jQuery));
