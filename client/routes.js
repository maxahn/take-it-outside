import '../imports/ui/main_debate.js';
import '../imports/material-design-template-master/www/index.html';
import '../imports/ui/main_debate.html';

Router.route('/', function() {
  this.render('landingPage');
});

Router.route('/test-room', function() {
  var roomUrl = '/trump';
  this.render('trumpRoom');
});

Router.route('/test-rooms', function() {
  this.render('rooms');
});

