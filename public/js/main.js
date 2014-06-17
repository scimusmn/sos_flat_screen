/**
 * Init the slide deck
 */
$(function() {
    $.deck('.slide');
});

/**
 * Video setup
 *
 * Mute any music
 * Any audio comes from the SOS.
 * This will help demonstrate any problems caused by switching on the amp.
 *
 * Disable the preloading spinner icon.
 * We don't want to show this to museum visitors while the video is loading.
 */
var objthPlayer = videojs("objth", {
    muted: true,
    children: {
        loadingSpinner: false
    }
});

/**
 * Listen for keystrokes
 */
$(document).keydown(function(e){

    /**
     * Q
     */
    if (e.keyCode == 81) {
        console.log('Q - Loading paused Object Theater video.');
        $.deck('go', 'objth-slide')
    }

    /**
     * W
     */
    if (e.keyCode == 87) {
        console.log('W - Playing Object Theater video.');
        $('#objth-slide').find('video').each(function() {
            var myPlayer = _V_(this);
            myPlayer.play();
        });
    }

    /**
     * E
     */
    if (e.keyCode == 69) {
        console.log('E pressed');
        $.deck('go', 'black-slide')
    }

    /**
     * R
     */
    if (e.keyCode == 82) {
        console.log('R pressed');
        $.deck('go', 'interlude-slide');

    }
});

/**
 * Start the timer on the interlude slide, reset it when we leave this slide
 */
$("#interlude-slide").on({
    'deck.becameCurrent': function(ev, direction) {
        $('.next-timer').pietimer({
            seconds: 20,
            colour: '#B32037'
        }, function () {
            $.deck('go', 'black-slide')
        });
    },
    /**
    * Reset the timer if we leave the interlude screen
    */
    'deck.lostCurrent': function(ev, direction) {
        clearInterval(interval);
    }
});

/**
 * Pie timer
 */
jQuery.fn.pietimer = function( options, callback ) {
    var settings = {
        'seconds': 5,
        'colour': 'rgba(255, 255, 255, 0.8)',
        'height': this.height(),
        'width': this.width()
    };
    if ( options ) {
        $.extend( settings, options );
    }
    this.html('<canvas id="pie_timer" width="'+settings.height+'" height="'+settings.height+'"></canvas>');
    var val = 360;
    interval = setInterval(timer, 40);
    function timer(){
        var canvas = document.getElementById('pie_timer');
        if (canvas.getContext){
            val -= ( 360 / settings.seconds ) / 24;
            if ( val <= 0 ){
                clearInterval(interval);
                canvas.width = canvas.width;
                if(typeof callback == 'function'){
                    callback.call();
                }
            } else {
                canvas.width = canvas.width;
                var ctx = canvas.getContext('2d');
                var canvas_size = [canvas.width, canvas.height];
                var radius = Math.min(canvas_size[0], canvas_size[1]) / 2;
                var center = [canvas_size[0]/2, canvas_size[1]/2];
                ctx.beginPath();
                ctx.moveTo(center[0], center[1]);
                var start = ( 3 * Math.PI ) / 2;
                ctx.arc(
                    center[0],
                    center[1],
                    radius,
                        start - val * ( Math.PI / 180 ),
                    start,
                    false
                );
                ctx.closePath();
                ctx.fillStyle = settings.colour;
                ctx.fill();
            }
        }
    }
    return this;
}


//var iosocket = io.connect();

//iosocket.on('connect', function () {
    //console.log('connected');
//});

//iosocket.on('message', function(message) {
    //console.log("Got a UDP message");
    //switch(message) {
        //case 'objth_play':
            //objthPlay();
            //break;
        //case 'interlude':
            //interludePlay();
            //console.log('other');
            //break;
        //default:
            //console.log('nothing');
    //}
//});
