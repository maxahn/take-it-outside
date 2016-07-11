import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
//import '../imports/ui/body.js';
import '../imports/material-design-template-master/www/index.html';

Router.route('/', function() {
  this.render('landingPage');
});
var $ = require("jquery"),
    materialize = require("materialize");
