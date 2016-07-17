import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Meteor } from 'meteor/meteor';
//import { Router } from '../../../client/routes';
import './body.html';

Template.form.events({
'submit .new-room'(event) { ////new-room is the form class
  event.preventDefault();
  var target = event.target;

  var room = new Room();
  room.topic = target.topic.value;
  room.url = target.url.value;

  var creator = new RoomUser();
  creator.name = target.creator.value; //get it from facebook api
  creator.userType = "creator";

  var challengedPerson = new RoomUser();
  challengedPerson.name = target.challengedPerson.value;
  challengedPerson.userType = "challenged";

  target.topic.value = "";
  target.challengedPerson.value = "";
  target.url.value = "";

  Meteor.call('saveForm', room, creator, challengedPerson, function(err, result) {
    if (err) {
      console.log('error with saveForm Meteor method');
    } else {
      Cookie.set('userId', result.creator._id);
      Router.go('/' + room.url);
    }
  });

  //
  // Router.go('/' + room.url);
  // var creator = new RoomUser();
  // creator.name = "test"
  // creator.userType = "viewer";
  // creator.userRoomId = "123";

  // var arg =  new Argument();
  // arg.message = "test";

  // Meteor.call('saveViewerComment', creator, arg);

}

// "change #challengedId": function(event){
//   var challengedId = $("#challengedId").val();//document.getElementById("challengedId")
//   var confirmChallengedId = $("#confirmChallengedId").val()//document.getElementById("confirmChallengedId");
//   if(confirmChallengedId != challengedId) {
//     alert("ksjdcksjdh");
//     //confirmChallengedId.setCustomValidity("challenged names Don't Match");
//   } else {
// alert("aaaaaaaa");
//     //confirmChallengedId.setCustomValidity('');
//   }
// },

// "change #confirmChallengedId": function(event){

//   var challengedId = $("#challengedId").val();//document.getElementById("challengedId")
//   var confirmChallengedId = $("#confirmChallengedId").val()//document.getElementById("confirmChallengedId");
//   if(confirmChallengedId != challengedId) {
//     alert("ksjdcksjdh");
//     //confirmChallengedId.setCustomValidity("challenged names Don't Match");
//   } else {
// alert("aaaaaaaa");
//     //confirmChallengedId.setCustomValidity('');
//   }
// }








});


