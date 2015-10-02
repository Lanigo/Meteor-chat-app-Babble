// helper method that pushes var changes into the HTML
Template.bubble.helpers({  
	charCount: function() {
		return 140 - Session.get('numChars');
	},

	charClass: function() {
		if (Session.get('numChars') > 140) {
			return 'errCharCount';    //css class name
		} else {
			return 'charCount';       //css class name
		}
	},

	disableButton: function() {
		if (Session.get('numChars') <= 0 ||
			Session.get('numChars') > 140 ||
			!Meteor.user()) {
			return 'disabled';
		}
	}
});

// an event listener that listens for input in the box
Template.bubble.events({  
	'input #bubbleText': function() {
		Session.set('numChars', $('#bubbleText').val().length);
	},

	'click button': function() {  
		var babble = $('#bubbleText').val();
		$('#bubbleText').val("");
		Session.set('numChars', 0);
		Meteor.call('insertBabble', babble);
	}
});

// we count characters here. It sets the initial count to 0 when the template is rendered
Template.bubble.onRendered(function () {  
	Session.set('numChars', 0);
});



