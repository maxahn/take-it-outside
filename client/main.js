var $ = require("jquery"),
    materialize = require("materialize");

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.MyButton.events({
  'click #clickme': function () {
    Router.go('/debate-room');
  }
});