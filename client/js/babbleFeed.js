Template.babbleFeed.helpers({
	'babbleMessage': function() {
		return Babbles.find({}, { sort: {timestamp:-1}, limit: 10 });
	}
});

// server is publishing all the content of babbles and the client is subscribing to it inside of a template
Template.babbleFeed.onCreated(function() { 
	if (Meteor.user()) { 
  		this.subscribe('babbles', Meteor.user().username);
  		this.subscribe('ownBabbles', Meteor.user().username);
  	}
});