/**
 * StoryboardController
 *
 * @description :: Server-side logic for managing storyboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	loadStoryboard: function (req, res) {
		storyboardName = "Sample Storyboard";
		q1 = req.param('q1');
		ra1 = req.param('ra1');
		ia1 = req.param('ia1');
		ra2 = req.param('ra2');
		ia2 = req.param('ia2');
		ra3 = req.param('ra3');
		ia3 = req.param('ia3');
		q2 = req.param('q2');
		rb1 = req.param('rb1');
		ib1 = req.param('ib1');
		rb2 = req.param('rb2');
		ib2 = req.param('ib2');
		rb3 = req.param('rb3');
		ib3 = req.param('ib3');
		q3 = req.param('q3');
		rc1 = req.param('rc1');
		ic1 = req.param('ic1');
		rc2 = req.param('rc2');
		ic2 = req.param('ic2');
		rc3 = req.param('rc3');
		ic3 = req.param('ic3');
    	return res.view('main/storyboard', {css: ['../styles/storyboard.css'], javascript: ['../js/audiodisplay.js', '../js/main.js', '../js/recorder.js', '../js/recorderWorker.js'], 
   		storyboardName: storyboardName,
    	q1: q1,
    	ra1: ra1,
   		ia1: ia1,
   		ra2: ra2,
    	ia2: ia2,
    	ra3: ra3,
    	ia3: ia3,
    	q2: q1,
    	rb1: rb1,
   		ib1: ib1,
   		rb2: rb2,
    	ib2: ib2,
    	rb3: rb3,
    	ib3: ib3,
    	q3: q3,
    	rc1: rc1,
   		ic1: ic1,
   		rc2: rc2,
    	ic2: ic2,
    	rc3: rc3,
    	ic3: ic3,
    });
  },

};

