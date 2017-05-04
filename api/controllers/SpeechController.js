/**
 * SpeechController
 *
 * @description :: Server-side logic for managing speechcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `SpeechControllerController.submitSpeech()`
   */
  submitSpeech: function (req, res) {
  	var fileSrc = req.param('file_src');
    
    SpeechService.transcribeText(fileSrc);
  }
};

