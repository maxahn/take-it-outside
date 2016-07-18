import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Meteor } from 'meteor/meteor';
//import { Router } from '../../../client/routes';
import './body.html';


// Template.form.helpers({
//   getCountDown() {
//   var expiryDate = new Date();
//   var numberOfDaysToAdd = 7;
//   return expiryDate.setDate(expiryDate.getDate() + numberOfDaysToAdd,);

// }


// });



Template.form.events({
'submit .new-room'(event) { ////new-room is the form class
  event.preventDefault();

//checkConfirm();
  // debugger;
  var target = event.target;

  var room = new Room();
  room.topic = target.topic.value;
  room.url = target.url.value.match(/[^\/]*$/)[0];

  var creator = new RoomUser();
  creator.name = target.creator.value; //get it from facebook api
  creator.userType = "creator";

  var challengedPerson = new RoomUser();
  challengedPerson.name = target.challengedPerson.value;
  challengedPerson.userType = "challenged";

  Meteor.call('saveForm', room, creator, challengedPerson, function(err, result) {
    if (err) {
      console.log('error with saveForm Meteor method');
    } else {
      Cookie.set('userId', result.creator._id); //sets creator id on creator's browswer
    }
  });
  target.topic.value = "";
  target.challengedPerson.value = "";
  target.url.value = "";
  target.confirmChallengedPerson.value = "";
},


"keyup #topic": function(event){

  var topic = $("#topic").val();//document.getElementById("challengedId")
  var url = creatRoomUrl(topic);
  $("#url").val(url);
},

  // Meteor.call('saveForm', room, creator, challengedPerson, function(err, result) {
  //   if (err) {
  //     console.log('error with saveForm Meteor method');
  //   } else {
  //     Cookie.set('userId', result.creator._id);
  //     Router.go('/' + room.url);
  //   }
  // });

  // //
  // // Router.go('/' + room.url);
  // // var creator = new RoomUser();
  // // creator.name = "test"
  // // creator.userType = "viewer";
  // // creator.userRoomId = "123";





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
// }

// "change #confirmChallengedId": function(event){

//   var challengedId = $("#challengedId").val();//document.getElementById("challengedId")
//   var confirmChallengedId = $("#confirmChallengedId").val()//document.getElementById("confirmChallengedId");
//   if(confirmChallengedId != challengedId) {
//     alert("fdddgfgdg");
//     $("#confirmChallengedId").get(0).setCustomValidity("challenged names Don't Match");
//   } else {
// alert("aaaaaaaa");
//     //confirmChallengedId.setCustomValidity('');
//   }
// }

});

function checkConfirm(){

  var challengedId = $("#challengedId").val();//document.getElementById("challengedId")
  var confirmChallengedId = $("#confirmChallengedId").val()//document.getElementById("confirmChallengedId");
  if(confirmChallengedId != challengedId) {
    alert("fdddgfgdg");
    $("#confirmChallengedId").get(0).setCustomValidity("challenged names Don't Match");
  } else {
alert("aaaaaaaa");
    //confirmChallengedId.setCustomValidity('');
  }};


//   //---------------------------------------- countdown

  function creatRoomUrl(topic){

    var url = "";
    topic = topic.replace(/\s+/g, '-');
    topic = topic.substring(0,4); 
    url = "http://localhost:3000/"+topic;
    return url;
  };

//   function getTimeRemaining(endtime) {
//   var t = Date.parse(endtime) - Date.parse(new Date());
//   var seconds = Math.floor((t / 1000) % 60);
//   var minutes = Math.floor((t / 1000 / 60) % 60);
//   var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//   var days = Math.floor(t / (1000 * 60 * 60 * 24));
//   return {
//     'total': t,
//     'days': days,
//     'hours': hours,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// };

// function initializeClock(endtime) {
//   var clock = $("#clockdiv").val();
//   var daysSpan = clock.querySelector('.days');
//   var hoursSpan = clock.querySelector('.hours');
//   var minutesSpan = clock.querySelector('.minutes');
//   var secondsSpan = clock.querySelector('.seconds');

//   function updateClock() {
//     var t = getTimeRemaining(endtime);

//     daysSpan.innerHTML = t.days;
//     hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//     secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   };

//   updateClock();
//   var timeinterval = setInterval(updateClock, 1000);
// };



