/*!

Plays all audio elements inside a slide when the slide becomes active
and pauses them when the user navigates away.

Modified from https://gist.github.com/1873472

*/

(function($, deck, undefined) {
  $(document).bind('deck.change', function(e, from, to) {

    // When leaving a slide, pause the audio and rewind it
    // to the beginning.
    $.deck('getSlide', from).find('audio').each(function() {
      this.pause && this.pause();
      this.currentTime = 0;
    });

    // When entering a slide, rewind the audio to the beginning
    // and play it.
    $.deck('getSlide', to).find('audio').each(function() {
      //this.load && this.load();
      this.currentTime = 0;
      this.play && this.play();
    });

  });
})(jQuery, 'deck');
