/**
 * Storyboard.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
  		type: 'text',
  		unique: true,
  		required: true
  	},

  	numberOfQuestions: {
  		type: 'int',
  		defaultsTo: 5,
  	},

  	questions: {
  		type: 'array',
  		required: true
  	},

  	numberOfResponseWordsPerQ: {
  		type: 'int',
  		defaultsTo: 3,
  	},

  	responseWords: {
		  type: 'array',
  		required: true,
  	},
    
    description: {
      type: 'mediumtext',
      required: true,
    }
  }
};

