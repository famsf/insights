(function (window, $) {
  var $toggleButtons = $('.inline-caption-button');
  $toggleButtons.on('click', function () {
    if ($(this).parent().siblings('.inline-caption-content').hasClass('show')) {
      $(this).parent().siblings('.inline-caption-content').removeClass('show');
      $(this).fadeOut(200, function () {
        $(this).text('＋').fadeIn(200);
      });
    }
    else {
      $(this).parent().siblings('.inline-caption-content').addClass('show');
      $(this).fadeOut(200, function () {
        $(this).text('✕').fadeIn(200);
      });
    }
  });
}(window, jQuery));
