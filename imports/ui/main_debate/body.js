import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Session } from 'meteor/session';
import { RoomUsers } from '../../api/rooms';
import { Arguments } from '../../api/rooms';
import { Views } from '../../api/rooms';
import { Votes } from '../../api/rooms';

var moment = require('moment');


import './body.html';
import './body.css';

Template.debateRoom.helpers({
  setSession() {
    var url = Template.instance().data.roomName;
    Session.set('roomUrl', url);
    // alert('setSession');
    var room = Rooms.findOne({url: url});
    Session.set('roomId', room._id);
    var debaters = RoomUsers.find({userRoomId: room._id});
    
    debaters.forEach(function(debater) {
      console.log('================');
      console.log(debater.name);
      if (debater.userType === 'creator') {
        Session.set('creatorId', debater._id);
      } else if (debater.userType === 'challengedId') {
        Session.set('challengedId', debater._id);
      }
    });
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
    if (creator && currentUserName === creator.name) {
      Cookie.set('userId', creator._id);
      return true;
    } else if (challenged && currentUserName === challenged.name) {
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
  },

  getTotalView(){
    var roomId = Session.get('roomId');
    return Views.find({$and: [{viewRoomId: roomId},{viewFlag:true}]}).count();
  },

  getCreatorVotes(){

    var creatorId = Template.instance().data.creatorId;
    var positiveVotesCreator  = Votes.find({$and: [{voteDebaterId: creatorId},{vote:true}]}).count();
    var negativeVotesCreator  = Votes.find({$and: [{voteDebaterId: creatorId},{vote:false}]}).count();
    return (positiveVotesCreator - negativeVotesCreator);

  }, 

    getChallengedVotes(){
   
    var challengedId = Template.instance().data.challengedId;
    var positiveVotesChallenged  = Votes.find({$and: [{voteDebaterId: challengedId},{vote:true}]}).count();
    var negativeVotesChallenged  = Votes.find({$and: [{voteDebaterId: challengedId},{vote:false}]}).count();
    return (positiveVotesChallenged - negativeVotesChallenged);

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
       window.scrollTo(0,document.body.scrollHeight);
      }
    });
    event.target.text.value = '';
  },


  'change .voteCreator'(event){
    
    var firstVote = new Vote();
    firstVote.voteDebaterId = $(".voteCreator").val();
    firstVote.vote = true;
    Meteor.call('saveVote', firstVote);
    var creatorCookiLable = "voted" + Template.instance().data.creatorId;
    Cookie.set(creatorCookiLable, true);


    var challengedCookiLable = "voted" + Template.instance().data.challengedId;

    if (Cookie.get(challengedCookiLable)){
    var secondVote = new Vote();
    secondVote.voteDebaterId = $(".voteChallenger").val();
    secondVote.vote = false;
    Meteor.call('saveVote', secondVote);
    }
    
   
  },

  'change .voteChallenger'(event){
    
    var firstVote = new Vote();   
    firstVote.voteDebaterId = $(".voteChallenger").val();
    firstVote.vote = true;
    Meteor.call('saveVote', firstVote);
    var challengedCookiLable = "voted" + Template.instance().data.challengedId;
    Cookie.set(challengedCookiLable,true);

    var creatorCookiLable = "voted" + Template.instance().data.creatorId;

    if (Cookie.get(creatorCookiLable)){
    var secondVote = new Vote();
    secondVote.voteDebaterId = $(".voteCreator").val();
    secondVote.vote = false;
    Meteor.call('saveVote', secondVote);
    }
 

  }, 
  'click #facebook-logout'(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error('Logout failed');
      } else {
        Cookie.remove('userId');
      } 
    })
  },

  'click #facebook-login'(event) {
    Meteor.loginWithFacebook({}, function(err) {
      if (err) {
        throw new Meteor.error('Could not login');
      } 
    })
  },

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
           document.getElementById(id).innerHTML = 'Debate Closed';
           
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
  if (!this.rendered){      //things in this rendered are only run once, as its needed for cookies

     var roomId = Template.instance().data.roomId;
     var viewCookiLable = "view"+roomId;

     if(!Cookie.get(viewCookiLable)){
        var view = new View();
        view.viewFlag = true;
        view.viewRoomId = roomId;
        Meteor.call('saveViewRoom', view);
        Cookie.set(viewCookiLable,true);
     }

    var creatorId = Template.instance().data.creatorId;
    var challengedId = Template.instance().data.challengedId;
    var creatorVoteCookie = "voted" + creatorId;
    var challengedVoteCookie = "voted" + challengedId;

    // if(Cookie.get(creatorVoteCookie)){
    //   console.log("now set the button to creator");
    // }


    // if(Cookie.get(challengedVoteCookie)){
    //   console.log("now set the button to challenged");
    //  }
    CountDownTimer(Template.instance().data.expiryTime,'countdown');
    this.rendered = true;

    if (Cookie.set('handle', handle)) {
      $(".formThing").hide();
      $('#messagewindow').css('bottom', '0');
    }  // for hiding handle when coming back to page

  }

  $('.modal-trigger2').on('click', function(){
    // debugger;
    setTimeout(function(){
      //scroll to the bottom. 1billion should do it...
      $("#messagewindow").animate({ scrollTop: 10000000 }, "slow");
    }, 100);
  });


  $('.modal-trigger').leanModal();
  $('.modal-trigger2').leanModal();  
  window.scrollTo(0,document.body.scrollHeight);
};








