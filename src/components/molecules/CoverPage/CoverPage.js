
document.addEventListener("DOMContentLoaded", function(){

  /*
   * Call the polyfill
   *
   * patternID : the unique ID of the SVG pattern
   * patternURL : the URL to the background-image
   * class : the css-class applied to the SVG
   */

  element.backgroundClipPolyfill({
    'patternID' : 'mypattern',
    // todp, put patternnURL into a data-attribute
    'patternURL' : 'https://3.bp.blogspot.com/-RE9D7tm8uVU/VvecOJZ5ddI/AAAAAAAAgqc/TUZpJwTFqH4TR7oG4J3GzuFhr1NOAuYJw/w1200-h630-p-k-no-nu/Lady%2Bwith%2BHat%2Band%2BFeather%2BBoa%2Bby%2BGustav%2BKlimt.jpg',
    'class' : 'headline'
  });


  var coverPage = document.getElementById('CoverPage')
  var container = coverPage.querySelector('.cover_lodaer_container');
  var maskLoader = container.querySelector('.mask_loader')
  var underlay = coverPage.querySelector('.underlay');
  console.log(container, maskLoader, underlay)
  setTimeout(function() {
    maskLoader.classList.add('open')
    setTimeout(function() {
      container.classList.add('fadeout')
      setTimeout(function(){
        underlay.classList.add('to_top')
        maskLoader.style.display = 'none'
        container.style.display = 'none'
      }, 750)
    }, 1250)
  }, 3000)
})
