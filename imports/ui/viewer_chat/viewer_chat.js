import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Meteor } from 'meteor/meteor';
import { Arguments } from '../../api/rooms';
import { RoomUsers } from '../../api/rooms';
import { Votes } from '../../api/rooms';
import { Views } from '../../api/rooms';

import './viewer_chat.html';
import './viewer_chat.css';

var moment = require('moment');

// Messages = new Meteor.Collection('messages');


//................... For dynamic tabs.........................//


Template.index.onCreated( function() {
  this.currentTab = new ReactiveVar( "chatbox" );
});

Template.index.helpers({
  tab: function() {
    return Template.instance().currentTab.get();
  },
  tabData: function() {
    var tab = Template.instance().currentTab.get();

    var data = {
      "chatbox": [
        { "name": "Viewer chat here: From Darwin to Munger", "creator": "Peter Bevelin" }
        
      ],
      "Analytics": [
        { "name": "Ghostbusters", "creator": "Dan Aykroyd" },
        
      ],
      "FAQ": [
        { "name": "Grand Theft Auto V", "creator": "Rockstar Games" },
        
      ]
    };

    return data[ tab ];
  }
});

Template.index.events({
  'click .nav-pills li': function( event, template ) {
    var currentTab = $( event.target ).closest( "li" );

    currentTab.addClass( "active" );
    $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  }
});



//.................... For slide out panel .....................//

Template.slideOutThing.events({
  'click i.material-icons': function( event, template ) {
    $('#slide-out').toggleClass('show-slider');  
  }
});


//.................... To keep username clean currently not working .....................//

export default function( value ) {
  return value.replace( /[^A-Za-z0-9\s]/g, '' ).toLowerCase().trim();
}


//....................  For messaging .........................//

Template.messages.helpers({

  messages: function() {
  // debugger;
  //var viewers = RoomUsers.find({ $and:[{userRoomId: Session.get('roomId')}, {userType: 'viewer'}] });
  var roomId = Session.get('roomId');
  var viewers = RoomUsers.find({$and: [{userRoomId: roomId}, {userType: 'viewer'}]});
  // var viewers = RoomUsers.find({});
  var rooms = Rooms.find({});
  var viewerIds = [];
  // debugger;
  // for each (let viewer in viewers) {
  //     viewerIds.push(viewer._id);
  // }
  // debugger;
  // for (let counter = 0; viewers.length < viewers.length; counter++) {
  //   viewerIds.push(viewers[counter]._id);
  // }
  

  viewers.forEach(function(viewer) {
    viewerIds.push(viewer._id);
  });
  // debugger;
  return Arguments.find({argRoomUserId: {$in: viewerIds}}, { sort: { date_created: -1}});
   // return Arguments.find({});
  },

  formatDate(date) {
    if (date) {return moment(date).fromNow()};
  }
});



//..................... helper for handle so cannot set twice ..................//

Template.register.helpers({
    getCookie: function(name,value) {
    var handle = event.target.registerHandle.value;
    Cookie.set('handle', handle);
      if(document.handle.indexOf(name) == 0) 
          return -1<document.handle.indexOf(value?name+"="+value+";":name+"=")
    }
});

// helper not exactly working yet



//..................... for handle ..................//


Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var handle = event.target.registerHandle.value;
    Cookie.set('handle', handle);  // need to set experiation on it
    
    Meteor.call('saveViewer', Cookie.get('handle'), Session.get('roomId'), function(err, viewer) {
      if (err) {
        console.log('error with Meteor method saveViewer');
      } else {
        var viewerId = viewer._id;
        Cookie.set('userId', viewerId);
      }

    });


  },
  'keydown input#message' : function (event) {
    if (event.which == 13) {
      // if (Meteor.user())
      //     var handle = event.target.registerHandle.value;
        // else // 13 is the enter key event + add code for user session!!
      if (document.getElementById('message').value != "") {
        var argument = new Argument();
        argument.message = document.getElementById('message').value;
        argument.argRoomUserId = Cookie.get('userId');
        
        Meteor.call('saveViewerComment', argument, function(err, result) {
          if (err) {
            console.log('error with saveForm Meteor method');
          }
        });
        document.getElementById('message').value = '';
        message.value = '';
        
      }
    }
  }
});