import { Template } from 'meteor/templating';

import './body.html';
import '/public/compatibility/typed.js';
import '/public/compatibility/custom-min.js';
import '/public/stylesheets/custom-min.css';
import '/public/stylesheets/font-awesome.min.css';
import '/public/stylesheets/materialize.css';
import '/public/stylesheets/plugin-min.css';
import '/public/stylesheets/style.css';
import '/imports/ui/form_page/body.js';
import { Meteor } from 'meteor/meteor';
// import '../custom-min.js';
// import '../plugin-min.js';

Template.homepage.events({

'click #facebook-logout'(event) {
    Meteor.logout(function(err) {
      if (err) {
        throw new Meteor.error('Logout failed');
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

	$('.modal-trigger').leanModal();


Template.homepage.onRendered(function(){
 $('.modal-trigger').leanModal();

});

