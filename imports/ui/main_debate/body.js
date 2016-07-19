import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Session } from 'meteor/session';
import { RoomUsers } from '../../api/rooms';
import { Arguments } from '../../api/rooms';

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
  isDebater(currentUserName) {     //i'm so sorry for this atrocity 
    var debaters = RoomUsers.find({userRoomId: Session.get('roomId')});
    var creator;
    var challenged;
    // for (let counter = 0; counter < debaters.length; counter++) {   //iterates and sets the creator and challenged debater belonging to room
    //   if (debaters[counter].userType === 'creator') {
    //     creator = debaters[counter];
    //   } else if (debaters[counter].userType === 'challenged') {
    //     challenged = debaters[counter];
    //   }
    // }
    debaters.forEach(function(user) { 
      if (user.userType === 'creator') {
        creator = user; 
      } else if (user.userType === 'challenged') {
        challenged = user;
      }
    }); 
//    debugger;
    if (currentUserName === creator.name) {
      Cookie.set('userId', creator._id);
      return true;
    } else if (currentUserName === challenged.name) {
      Cookie.set('userId', challenged._id);
      return true;
    }
    return user && user.userType === 'creator' || user.userType === 'challenged';
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
  }


  
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
    var roomId = Session.get('roomId');
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


Template.debateRoom.rendered = function(){
  if (!this.rendered){

     var roomId = Template.instance().data.roomId;
     var viewCookiLable = "view"+roomId;

     if(!Cookie.get(viewCookiLable)){

        alert("save view");
        var view = new View();
        view.viewFlag = true;
        view.viewRoomId = roomId;
        Meteor.call('saveViewRoom', view);
        Cookie.set(viewCookiLable,true);
     }
    
    this.rendered = true;
  }
};
