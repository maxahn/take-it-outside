import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';

import './viewer_chat.html';
import './viewer_chat.css';




// For dynamic tabs


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
        { "name": "Viwer chat", "creator": "Peter Bevelin" }
        
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




















