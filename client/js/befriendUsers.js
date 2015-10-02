// template helpers
Template.befriendUsers.helpers({  
  	'foundUser': function() {
    		return Session.get('foundUser');
  	},

  	'recommendedUsers': function() {
        if (Meteor.user()) {
            var currentBefriendings = UserUtils.findBefriendings(Meteor.user().username);

            var recUsers = Meteor.users.find({
                username: {
                    $nin: currentBefriendings
                }
            },{
                fields: { 'username':1 },
                limit: 5
            }).fetch();

            return recUsers; 
  	    }
    }
});

//event listener for submit button of searchUser- the method findUser will be defined on server side
Template.befriendUsers.events({  
		'submit form': function(event) {
				var searchUser = event.target.searchUser.value;

				var foundUser = Meteor.call('findUser', searchUser, function(err, res) {
						if (res) Session.set('foundUser', res);
				});
				return false;
		},
		// server side method followUser called here on event
  	'click #befriend': function() {
    			Meteor.call('befriendUser', Session.get('foundUser').username);
  	},

    'click #befriendRec': function(event) {
        Meteor.call('befriendUser', this.username);
    }
});

Template.befriendUsers.onCreated(function () {  
    if (Meteor.user()) {
        this.subscribe('users', Meteor.user().username)
        this.subscribe('befriendings', Meteor.user().username);
    }
});
