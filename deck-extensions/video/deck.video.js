/*!

Plays all video elements inside a slide when the slide becomes active
and pauses them when the user navigates away.

Modified from https://gist.github.com/1873472

*/

(function($, deck, undefined) {
  $(document).bind('deck.change', function(e, from, to) {

    // When leaving a slide, pause the video
    $.deck('getSlide', from).find('video').each(function() {
      var myPlayer = _V_(this);
      myPlayer.pause();
    });

    // When entering a slide, play the video
    $.deck('getSlide', to).find('video').each(function() {
      var myPlayer = _V_(this);
      myPlayer.play();
    });

  });
})(jQuery, 'deck');
