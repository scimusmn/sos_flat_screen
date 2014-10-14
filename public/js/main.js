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
 * I've re-enabled the audio, now that we're showing the program with the surround sound and music.
 *
 * Disable the preloading spinner icon.
 * We don't want to show this to museum visitors while the video is loading.
 */
var objthPlayer = videojs("objth", {
    muted: false,
    children: {
        loadingSpinner: false
    }
});

/**
 * Listen for keystrokes
 *
 * Keystrokes are simulated by the automation system and AutoIt scripts
 * These can be found in the https://github.com/scimusmn/sos_autoit_scripts
 *
 **/
$(document).keydown(function(e){

    /**
     * Q
     */
    if (e.keyCode == 81) {
        console.log('Q - Loading paused Object Theater video.');
        $.deck('go', 'earthmobile-slide')
    }

    /**
     * W
     */
    if (e.keyCode == 87) {
        console.log('W - Playing Object Theater video.');
        $('#earthmobile-slide').find('video').each(function() {
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
     * Z
     */
    if (e.keyCode == 90) {
        console.log('Z pressed');
        $.deck('go', 'earthmobile-interlude');
    }

    /**
     * X
     */
    if (e.keyCode == 88) {
        console.log('X pressed');
        $.deck('go', 'eating-water-interlude');
    }

    /**
     * C
     */
    if (e.keyCode == 67) {
        console.log('C pressed');
        $.deck('go', 'acidifying-oceans-interlude');
    }

    /**
     * V
     */
    if (e.keyCode == 86) {
        console.log('V pressed');
        $.deck('go', "hot-air-interlude");
    }

    /**
     * B
     */
    if (e.keyCode == 66) {
        console.log('B pressed');
        $.deck('go', "human-era-interlude");
    }
});

/**
 * Setup the timer object so that we can talk to it across events
 */
var theTimer;

/**
 * Start the pietimer when you enter a slide
 */
$(document).bind('deck.change', function(event, from, to) {
    // Only load the pietimer on slides with the 'timer-slide' class
    var currentSlide = $.deck('getSlide', to);
    if (currentSlide.hasClass('timer-slide')) {
        theTimer = $('#' + currentSlide.attr('id') + ' .pie-timer').pietimer({
            seconds: 25,
            colour: 'rgba(255, 255, 255, 0.6)',
            width: '150',
            height: '150'
        }, function () {
            // Go to the black slide when the timer is out
            $.deck('go', 'black-slide')
        });
    }
});

/**
 * Teardown the timer when you leave a slide
 *
 * This prevents multiple timers from being loaded when entering a slide
 * for the second time.
 */
$(document).bind('deck.beforeChange', function(event, from, to) {
    var fromSlide = $.deck('getSlide', from);
    if (fromSlide.hasClass('timer-slide')) {
        theTimer.empty();
        clearInterval(interval);
    }
});

/**
 * Pie timer generator
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

/**
 * Old socket io listening code. We are controling the slide deck with
 * simulated keystrokes now. But I want to keep this around for a bit until
 * we can do some more testing.
 */
/*
var iosocket = io.connect();

iosocket.on('connect', function () {
    console.log('connected');
});

iosocket.on('message', function(message) {
    console.log("Got a UDP message");
    switch(message) {
        case 'objth_play':
            objthPlay();
            break;
        case 'interlude':
            interludePlay();
            console.log('other');
            break;
        default:
            console.log('nothing');
    }
});
*/
