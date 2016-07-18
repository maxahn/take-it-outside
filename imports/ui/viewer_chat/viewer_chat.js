import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Meteor } from 'meteor/meteor';
import { Arguments } from '../../api/rooms';
import { RoomUsers } from '../../api/rooms';

import './viewer_chat.html';
import './viewer_chat.css';

var moment = require('moment');


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
  'click span#clicker': function( event, template ) {
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
     // Cookie.set("viewerId", "aGgiWZdAzokJQjkrz");

     
    return Arguments.find({argRoomUserId: Cookie.get("viewerId") }, { sort: { date_created: -1}});
  },

  formatDate(date) {
    if (date) {return moment(date).fromNow()};
  }
});




//..................... for handle ..................//


Template.register.events({
  'submit form': function(event) {
      event.preventDefault();
      var handle = event.target.registerHandle.value;
       Cookie.set('handle', handle);  // need to set experiation on it
  },
  'keydown input#message' : function (event) {
    if (event.which == 13) {
      // if (Meteor.user())
      //     var handle = event.target.registerHandle.value;
        // else // 13 is the enter key event + add code for user session!!
        if (document.getElementById('message').value != "") {
      var viewer = new RoomUser();
      viewer.name = Cookie.get("handle");
      viewer.userType = "viewer";
      viewer.userRoomId = "1";
      var argument = new Argument();
      argument.message = document.getElementById('message').value;
      argument.argRoomUserId = "1";
      Meteor.call('saveViewerComment', viewer, argument);
      }
        document.getElementById('message').value = '';
        message.value = '';
      
    }
  }
});