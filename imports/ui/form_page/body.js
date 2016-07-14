import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import './body.html';

Template.form.events({
'click .submit': function(){
	Rooms.insert({
		topic: $('.the_topic').val(),
		url: $('.the_topic').val(),
		creator: $('.the_topic').val(),
		challenger: $('.the_topic').val()
	});
}
});
