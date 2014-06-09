/**
 * Video player settings
 *
 * Mute any music
 * Any audio comes from the SOS.
 * This will help demonstrate any problems caused by switching on the amp.
 *
 * Disable the preloading spinner icon.
 * We don't want to show this to museum visitors while the video is loading.
 */

/**
 * Clear everything to start
 */
$('.video-container-objth').hide();
$('.img-container').hide();

/**
 * Objecth Theater video setup
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
 * Interlude setup
 */
function interludePlay() {
    $('.video-container-objth').hide();
    $('.img-container').show();
}

/**
 * Listen for keystrokes
 */
$(document).keydown(function(e){
    /**
     * #1
     */
    if (e.keyCode == 81) {
        console.log('Q pressed');
        objthPlay();
    }
    /**
     * #2
     */
    if (e.keyCode == 87) {
        console.log('W pressed');
        interludePlay();
    }
});

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
        case 'other':
            console.log('other');
            break;
        default:
            console.log('nothing');
    }
});
