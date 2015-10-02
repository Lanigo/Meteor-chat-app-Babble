Meteor.publishComposite('babbles', function(username) {
	return {
		find: function() {
			//find the current user's following users
			return Relationships.find({ befriended_by: username });
		},
		children: [{
			find: function(relationship) {
				//Find babbles from folowed users
				return Babbles.find({user:relationship.befriended});
			}
		}]
	}
});

Meteor.publish('ownBabbles',function(username) {
	return Babbles.find({user: username});
});

Meteor.publish('users',function(username) {
	return Meteor.users.find({}, {
		fields: {'username': 1 },
		limit: 100
	});
});

Meteor.publish('followings',function(username) {
	return Relationships.find({ befriended_by: username})
});

Meteor.publish('followers',function(username) {
	return Relationships.find({ befriended: username})
})