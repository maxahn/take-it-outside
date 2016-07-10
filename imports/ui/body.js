import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  arguments: [
    { topic: 'Is chocolate the best icecream flavour?', creator: {name: 'Max'}, challenged: {name: 'Eamonn'}, createdAt: new Date()}, 
    { topic: 'Is Obama really American?', creator: {name: 'Saeid'}, challenged: {name: 'Deepak'}, createdAt: new Date()},
    { topic: 'Is Bugs Bunny really smart, or Elmer Fudd just really stupid?' , creator: {name: 'Bugs Bunny'}, challenged: {name: 'Elmer Fudd'}, createdAt: new Date()}
  ],
});