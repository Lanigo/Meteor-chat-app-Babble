Meteor.methods({  
  	insertBabble: function(babble) {
    	if (Meteor.user()) {
      		Babbles.insert({
        		message: babble,
        		user: Meteor.user().username,
        		timestamp: new Date()
      		});
    	}
  	}
});