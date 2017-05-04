/**
 * StoryboardController
 *
 * @description :: Server-side logic for managing storyboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadStoryboard: function (req, res) {
		storyboardName = req.param('storyboard_name');
		storyboardService.getOneStoryboard(res, storyboardName, function(storyboard) {
    		return res.view('main/storyboard', {css: ['../styles/storyboard.css'], javascript: ['../js/audiodisplay.js', '../js/main.js', '../js/recorder.js', '../js/recorderWorker.js'], storyboard: storyboard});
    	});
  },

};

