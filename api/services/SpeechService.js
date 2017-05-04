const Speech = require('@google-cloud/speech');
var text = "Text was not transcribed properly"; //default text so we know when it wasn't overwritten with transcription of audio file
module.exports = {
    transcribeText: function (file) {
        // Instantiates a client
        const speech = Speech();

        // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
        const filename = file;

        // The encoding of the audio file, e.g. 'LINEAR16'
        const encoding = 'LINEAR16';

        // The sample rate of the audio file, e.g. 16000
        const sampleRate = 16000;

        const request = {
            encoding: encoding,
            sampleRate: sampleRate
        };

        // Detects speech in the audio file
        speech.recognize(filename, request)
        .then((results) => {
            const transcription = results[0];
            text = results[0];
            console.log(`Transcription: ${transcription}`);
        });
    }
    /*
    returnText: function() {
        return text;
    }
    */
}