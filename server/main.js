import { Meteor } from 'meteor/meteor';
import '../imports/api/rooms.js';   // possibly the absense of this import was causing the weirdness in previous attempt
Meteor.startup(() => {
  // code to run on server at startup
});
