// the findUser method which is called on client side in followUsers.js
Meteor.methods({  
  	'findUser': function(username) {
    	return Meteor.users.findOne({
      		username: username
    	}, {
      		fields: { 'username': 1 }
    	});
  	},

    // followUser method also called on client side
  	'befriendUser': function(username) {
      	Relationships.insert({
         		befriended_by: Meteor.user().username,
         		befriended: username
        });
    }
});


