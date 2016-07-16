import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';

import './viewer_chat.html';
import './viewer_chat.css';
Messages = new Mongo.Collection( 'messages' );
User = new Mongo.Collection( 'user' );
Accounts = new Meteor.Collection('accounts');

var moment = require('moment');


//................... For dynamic tabs.........................//


Template.index.onCreated( function() {
  this.currentTab = new ReactiveVar( "books" );
});

Template.index.helpers({
  tab: function() {
    return Template.instance().currentTab.get();
  },
  tabData: function() {
    var tab = Template.instance().currentTab.get();

    var data = {

      "books": [
        { "name": "Viewer chat", "creator": "Eamonn" }
        
      ],
      "movies": [
        { "name": "Ghostbusters", "creator": "Dan Aykroyd" },
        
      ],
      "games": [
        { "name": "Grand Theft Auto V", "creator": "Rockstar Games" },
        
      ]
    };

    return data[ tab ];
  }
});

Template.index.events({
  'click .nav-wrapper li a': function( event, template ) {
    var currentTab = $( event.target ).closest( "li" );

    currentTab.addClass( "active" );
    $( ".nav-wrapper li a" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  }
});



//.................... For slide out panel .....................//

Template.slideOutThing.events({
  'click button#clicker': function( event, template ) {
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
    return Messages.find({}, { sort: { date_created: -1}});
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
      if (Meteor.user())
          var handle = event.target.registerHandle.value;
        else // 13 is the enter key event + add code for user session!!
      var handle = Cookie.get("handle");
      var message = document.getElementById('message');
      if (message.value != '') {
        Messages.insert({
          handle: handle,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
});








