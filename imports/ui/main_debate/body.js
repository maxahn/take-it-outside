import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Session } from 'meteor/session';
import { RoomUsers } from '../../api/rooms';
import { Arguments } from '../../api/rooms';
import { Views } from '../../api/rooms';
import { Votes } from '../../api/rooms';

var moment = require('moment');

import './body.css';
import './body.html';

Template.debateRoom.helpers({
  setSession() {
    var url = Template.instance().data.roomName;
    Session.set('roomUrl', url);
    // alert('setSession');
    var room = Rooms.findOne({url: url});
    Session.set('roomId', room._id);
    // alert('after set session: ' + Session.get('roomId'));

  },
  getUrl() {
   if (Template.instance().data.roomName)  {return '/' + Template.instance().data.roomName;}
  },
  room() {
    var url = Session.get('roomUrl');
    var room = Rooms.findOne({url: url});
    // alert('room');
    if (room) { 
      return room;
    }
  },
  debaters() {
    var roomId = Session.get('roomId');
    
    var debaters = RoomUsers.find({userRoomId: roomId});
    console.log(debaters);
    return debaters;
  },
  formatDate(date) {
    if (date) {return moment(date).fromNow()};
  },

  getUserType(userId) {
    return RoomUsers.findOne({_id: userId}).userType;
  },
  allArguments() {
    var roomId = Session.get('roomId');
    var creatorId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'creator'}]})._id;
    var challengedId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'challenged'}]})._id;
    return Arguments.find({$or: [{argRoomUserId: creatorId}, {argRoomUserId: challengedId}]});
  },
  getCreator(){
    var roomId = Session.get('roomId');
    return RoomUsers.findOne({$and: [{userRoomId: roomId},{userType:"creator"}]});
  },

    getChallenged(){
    var roomId = Session.get('roomId');
    return RoomUsers.findOne({$and: [{userRoomId: roomId},{userType:"challenged"}]});
  },

  getTotalView(){
    var roomId = Session.get('roomId');
    return Views.find({$and: [{viewRoomId: roomId},{viewFlag:true}]}).count();
  },

  //   getTotalVotes(){
  //   var roomId = Session.get('roomId');
  //   return Votes.find({$and: [{viewRoomId: roomId},{vote:true}]}).count();
  
  // } 



  
});

Template.debateRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    const userId = Cookie.get('userId');

    Meteor.call('saveDebateArgument', text, userId, function(err, result) {
      if (err) {
        console.log('Error caused by saveDebateArgument Meteor method');
      } else {
      
      }
    });
    event.target.text.value = '';
  },

  'click .creator-name h3'(event) {
    const target = event.target;
    console.log(target);
    Session.set('currentUser', 'creator');
    console.log(Session.get('currentUser'));
  },

  'click .challenged-name h3'(event) {
    const target = event.target;
    Session.set('currentUser', 'challengedDebater');
    console.log(Session.get('currentUser'));
  },

  'click .voteCreator'(event){
    var firstVote = new Vote();
    firstVote.voteDebaterId = $(".voteCreator").val();
    firstVote.vote = true;
    var roomId = Session.get('roomId');
    var cookielabel = "voted" + roomId;
    if (Cookie.get(cookielabel)){
    var secondVote = new Vote();
    secondVote.voteDebaterId = $(".voteChallenger").val();
    secondVote.vote = false;
    }
    else {
      Cookie.set(cookielabel, true); //true is value, voted is key
    }

    Meteor.call('saveVote', firstVote);
    Meteor.call('saveVote', secondVote);
  },

  'click .voteChallenger'(event){
    var firstVote = new Vote();
    firstVote.voteDebaterId = $(".voteChallenger").val();
    firstVote.vote = true;
    var cookielabel = "voted" + roomId;
    
    if (Cookie.get(cookielabel)){
    var secondVote = new Vote();
    secondVote.voteDebaterId = $(cookielabel).val();
    secondVote.vote = false;
    }
    else {
      Cookie.set("voted", true); //true is value, voted is key
    }

    Meteor.call('saveVote', firstVote);
    Meteor.call('saveVote', secondVote);
  }

});


var CountDownTimer = function (dt, id)
{
   var end = new Date(dt);
   
   var _second = 1000;
   var _minute = _second * 60;
   var _hour = _minute * 60;
   var _day = _hour * 24;
   var timer;
   
   function showRemaining() {
       var now = new Date();
       var distance = end - now;
       if (distance < 0) {
           
           clearInterval(timer);
           document.getElementById(id).innerHTML = 'EXPIRED!';
           
           return;
       }
       var days = Math.floor(distance / _day);
       var hours = Math.floor((distance % _day) / _hour);
       var minutes = Math.floor((distance % _hour) / _minute);
       var seconds = Math.floor((distance % _minute) / _second);
       
       
       if (String(hours).length < 2){
           hours = 0 + String(hours);
       }
       if (String(minutes).length < 2){
           minutes = 0 + String(minutes);
       }
       if (String(seconds).length < 2){
           seconds = 0 + String(seconds);
       }
       
       
       var datestr = days + ' days ' + 
                     hours + ' hrs ' + 
                     minutes + ' mins ' + 
                     seconds + ' secs';
       
       document.getElementById(id).innerHTML = datestr;
   }
   
   timer = setInterval(showRemaining, 1000);
}


Template.debateRoom.rendered = function(){
  if (!this.rendered){

     var roomId = Template.instance().data.roomId;
     var viewCookiLable = "view"+roomId;

     if(!Cookie.get(viewCookiLable)){
        var view = new View();
        view.viewFlag = true;
        view.viewRoomId = roomId;
        Meteor.call('saveViewRoom', view);
        Cookie.set(viewCookiLable,true);
     }
     
    CountDownTimer(Template.instance().data.expiryTime,'countdown');
    this.rendered = true;
  }
};
