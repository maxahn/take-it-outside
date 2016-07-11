import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  rooms: [
    { topic: 'Is chocolate the best icecream flavour?', creator: {name: 'Max', arguments: [{point: 'blah1', createdAt: new Date()},{point: 'blah2', createdAt: new Date()}]}, challenged: {name: 'Eamonn'}, createdAt: new Date()}, 
    { topic: 'Is Obama really American?', creator: {name: 'Saeid'}, challenged: {name: 'Deepak'}, createdAt: new Date()},
    { topic: 'Is Bugs Bunny really smart, or Elmer Fudd just really stupid?' , creator: {name: 'Bugs Bunny'}, challenged: {name: 'Elmer Fudd'}, createdAt: new Date()}
  ],

});
