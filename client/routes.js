import '../imports/ui/home_page/body.js';
import '../imports/ui/home_page/body.html';

import '../imports/ui/main_debate/body.js';
import '../imports/ui/main_debate/body.html';

Router.route ('/', function() {
  this.render('homepage');
});

Router.route('/test-room', function() {
  this.render('trumpRoom');
});
