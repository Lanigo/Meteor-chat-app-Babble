UserUtils = function() {};    //All variables and functions are automatically file-scoped, meaning that you cannot access them outside of the file you defined them in- no need for var in front of UserUtils

//this function is to find the list already being followed
UserUtils.findBefriendings = function(username) {  
  	var currentBefriendings = Relationships.find({
    	befriended_by: username
  	}).fetch().map(function(data) {
    	return data.befriended;
  	});
  	currentBefriendings.push(Meteor.user().username);

  	return currentBefriendings;
};