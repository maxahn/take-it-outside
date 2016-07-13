import { Template } from 'meteor/templating';


Template.form.events({
	'click .submit': function(){
		ROOM.insert({
			topic: $('.the_topic').val(),
			url: $('.the_topic').val(),
			creator: $('.the_topic').val(),
			challenger: $('.the_topic').val(),
		})
	}
	});
};