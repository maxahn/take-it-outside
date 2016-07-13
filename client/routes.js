import '../imports/ui/home_page/body.js';
import '../imports/ui/home_page/body.html';	

import '../imports/ui/form_page/body.html';

// import '../imports/ui/main_debate/body.js';
// import '../imports/ui/main_debate/body.html'; //breaking the app, must be problem with template? 

Router.route ('/', function() {
  this.render('homepage');
 });

 Router.route('/test-room', function() {
  this.render('rooms');
 });

 Router.route('/form', function(){
 	this.render('form');
 });