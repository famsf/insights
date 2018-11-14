(function (document, window) {
  var captions = document.getElementsByClassName('zoom-caption');
  var i;
  if (captions.length > 0) {
    for (i = 0; i < captions.length; i++) {
      captions[i].style.left = captions[i].dataset.xCoord + '%';
      captions[i].style.top = captions[i].dataset.yCoord + '%';
    }
  }
}(document, window));
