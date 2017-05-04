module.exports = {

  getStoryboards: function(res, next){
    Storyboard.find().exec(function(err, storyboards){
      if(err){
        console.log(err)
        return res.serverError(err)
      }
      if(!storyboards){
        return res.notFound('Could not find storyboards, sorry.')
      }

      next(storyboards)
    })
  },

  getOneStoryboard: function(res, storyboardName, next){
    Storyboard.findOne({name: storyboardName}).exec(function (err, storyboard){
		  if (err) {
		    return res.serverError(err);
		  }
		  if (!storyboard) {
		    return res.notFound('Could not find that storyboard, sorry.');
		  }

      next(storyboard)
		});
  }

}