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

function objthPlay() {
    console.log("Playing the object theater")
    $('.video-container-objth').show();
    objthPlayer.load();
    objthPlayer.play();
}

/**
 * Black
 */
function blackPlay() {
    $('.video-container-objth').fadeOut();
    $('.img-container').hide();
    $('.black').fadeIn();
    $('.dummy').fadeOut();
}

/**
 * Interlude setup
 */
function interludePlay() {
    $('.video-container-objth').hide();
    $('.img-container').hide();
    $('.black').hide();
    $('.dummy').show();
}

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
        $.deck('go', 'interlude-slide')
    }
});

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
