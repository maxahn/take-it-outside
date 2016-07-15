import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Meteor } from 'meteor/meteor';
//import { Router } from '../../../client/routes';
import './body.html';

Template.form.events({
// 'click .submit': function(){
	// Rooms.insert({
	// 	topic: $('.the_topic').val(),
	// 	url: $('.the_topic').val(),
	// 	creator: $('.the_topic').val(),
	// 	challenger: $('.the_topic').val()
	// });
// }

'submit .new-room'(event) {
  event.preventDefault();
  alert('lsdkfjal');

  var target = event.target;
  console.log(target);
  var topic = target.topic.value;
  var creator = "Azadeh";//target.creator.value"";
  event.target.topic.value = '';

  Meteor.call('room.save', topic, creator);
  // console.log(target);
  // alert('topic' + topic);
 
}


// 'click [name=save]': function(e, tmpl) {
//     var room = tmpl.data.rooms.get();
//     var topic = 
//     // Meteor.call('rooms.save', room);
 
//     Meteor.call('room.save', room);
//     console.log('clicked');

//     Router.go('newRoom');
//       // Router.routes['asghar']
//     // if (user.validate()) {
//     //   Meteor.call('/user/save', user, function(err) {
//     //     if (!err) {
//     //       Router.go('users');
//     //     } else {
//     //       user.catchValidationException(err);
//     //     }
//     //   });
//     // }
//   }





});



