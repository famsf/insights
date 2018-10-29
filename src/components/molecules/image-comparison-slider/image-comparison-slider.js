/* eslint-disable */
$.fn.BeerSlider = function( options ) {
  options = options || {};
  return this.each( function () {
    new BeerSlider( this, options );
  });
};
$( ".beer-slider" ).each( function( index, el ) {
  $( el ).BeerSlider( {start: $( el ).data( "start" ) } )
});