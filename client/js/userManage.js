Template.userManage.helpers({
	'babbles': function() {
		if (Meteor.user()) {
			return Babbles.find({ user: Meteor.user().username}).count();
		}
	},

	'befriended': function() {
		if (Meteor.user()) {
			return Relationships.find({ befriended_by: Meteor.user().username }).count();
		}
	},

	'befriended_by': function() {
		if (Meteor.user()) {
			return Relationships.find({ befriended: Meteor.user().username }).count();
		}
	}
});


// user management event listener(listens for signup button)
Template.userManage.events({  
	'click #signup': function() {
		var user = {
		username: $('#signup-username').val(),
		password: $('#signup-password').val(),
		profile: {
		fullname: $('#signup-fullname').val()
	}
};

		Accounts.createUser(user, function (error) {
			if(error) alert(error);
		});
	},

	'click #login': function() {
		var username = $('#login-username').val();
		var password = $('#login-password').val();

		Meteor.loginWithPassword(username, password, function(error) {
			if(error) alert(error);
		});
	},

	// for logout
	'click #logout': function() {
		Meteor.logout();
	}
});

Template.befriendUsers.onCreated( function() {
	if (Meteor.user()) {
		this.subscribe('befriendings', Meteor.user().username);
		this.subscribe('befriended_by', Meteor.user().username);	
		this.subscribe('babbles', Meteor.user().username);	
	}
});