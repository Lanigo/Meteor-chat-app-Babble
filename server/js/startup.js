Meteor.startup(function () {  
  Relationships._ensureIndex({befriended_by: 1, befriended: 1}, {unique: 1});
});