/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url_base = "/";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;

function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );

    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    Recorder.setupDownload( blob, "recording.wav" );
    recIndex++;
}

function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.classList.add("recording");
        audioRecorder.clear();
        audioRecorder.record();
    }
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    //updateAnalysers();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio );
var state = 0;
var max = 3;
var questions = [q1,q2,q3]
var responses = [ra1,ra2,ra3,rb1,rb2,rb3,rc1,rc2,rc3];
var images = [ia1,ia2,ia3,ib1,ib2,ib3,ic1,ic2,ic3];

function submit() {
    state = state + 1;
    if(state > max) {
        state = 0;
    }
    if(state < max) {
        document.getElementById("question").innerHTML = questions[state];
        //document.getElementById("p0").src = '../images/storyboards/wendys/' + state + '/background.jpg';
        document.getElementById("res1").innerHTML = responses[0 + 3 * state];
        document.getElementById("p1").src = images[0 + 3 * state];
        document.getElementById("res2").innerHTML = responses[1 + 3 * state];
        document.getElementById("p2").src = images[1 + 3 * state];
        document.getElementById("res3").innerHTML = responses[2 + 3 * state];
        document.getElementById("p3").src = images[2 + 3 * state];
    }else {
        document.getElementById("question").innerHTML = "You've reached the end! Good work!";
        //document.getElementById("p0").src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png';
        document.getElementById("res1").innerHTML = "";
        document.getElementById("p1").src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png';
        document.getElementById("res2").innerHTML = "";
        document.getElementById("p2").src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png';
        document.getElementById("res3").innerHTML = "";
        document.getElementById("p3").src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png';
    }
}

function clearIt() {
    document.getElementById("correct").innerHTML = "Try Again!";
    return false;
}

function playSound() {
    console.log();
    var audio = new Audio(window.recording);
    audio.play();
    return false;
}

function getWord() {
    var phrases = ["Welcome to Wendy's, what would you like to eat?", "That will be $10. Will you pay with cash or credit card?", "Enjoy your meal!"];
    var responses = ["Hamburger", "French Fries", "Soda", "Pay", "With", "Cash", "Thank", "Very", "Much"];
    if(window.currentState != phrases.length) {
        var nextPhrase = phrases[window.currentState]; // Generates random number
        document.getElementById("myWord").innerHTML = nextPhrase; // Sets content of <div> to a phrase
        document.getElementById("r1").innerHTML = responses[3*window.currentState];
        document.getElementById("r2").innerHTML = responses[3*window.currentState+1];
        document.getElementById("r3").innerHTML = responses[3*window.currentState+2];
        window.currentState = window.currentState + 1;
    }
    else{
        document.getElementById("myWord").innerHTML = ".";
        document.getElementById("r1").innerHTML = ".";
        document.getElementById("r2").innerHTML = ".";
        document.getElementById("r3").innerHTML = ".";
        window.currentState = 0;
    }
    document.getElementById("correct").innerHTML = ".";
    return false; // Returns false just to tidy everything up
}

