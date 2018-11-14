(function (window, $) {
  var $toggleButtons = $('.inline-caption-button');
  $toggleButtons.on('click', function () {
    $toggleButtons.removeClass('close');
    if ($(this).parent().siblings('.inline-caption-content').hasClass('show')) {
      $(this).parent().siblings('.inline-caption-content').removeClass('show');
    }
    else {
      $toggleButtons.parent().siblings('.inline-caption-content').removeClass('show');
      $(this).parent().siblings('.inline-caption-content').addClass('show');
      $(this).addClass('close');
    }
  });
}(window, jQuery));
