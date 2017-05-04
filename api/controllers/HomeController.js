/**
 * HomeControllerController
 *
 * @description :: Server-side logic for managing Homecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    return res.view('main/home', {css: ['../styles/home.css']});
  },

  storyboardSelect: function (req, res) {
  	storyboardService.getStoryboards(res, function(storyboardsArray){
    	return res.view('main/storyboardSelect', {css: ['../styles/storyboardSelect.css'], storyboards: storyboardsArray});
	})
  },

  about: function (req, res) {
    return res.view('main/about', {css: ['../styles/home.css']});
  },

};

