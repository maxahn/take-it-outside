import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Rooms = new Mongo.Collection('rooms');


Meteor.methods({

  'room.save' (topic, creator) {
    

    // console.log(target);
    // alert('topic' + topic);

    var room = new Room();
    
    room.topic = topic;
    room.creator = creator;

    room.save();
    
    }

  // '/room/remove': function(room) {
  //   room.remove();
  // }
});


Room = Class.create({
  name: 'Room',
  collection: Rooms,
  fields: {
    'topic': {
      type: String
      // validator: [
      //   Validators.minLength(3)
      // ]
    },
    'creator': {
      type: String
      // validator: [
      //   Validators.minLength(3)
      // ]
    }

  }
});


// var kittyRoom = 
// {
//   'url': '/kitty-room',
//   'topic': 'kitties are cuter than puppies', 
//   'viewers': ['1', '2', '3'],
//   'creator': {
//     'debaterName': 'Max',
//     'comments': [
//       { 
//         'point': 'just look at em, they\'re so adorable!',
//         'createdAt': new Date(),
//         'reactions': []
//       },
//       { 
//         'point': 'when a kitty mews, no man or woman can resist them',
//         'createdAt': new Date(),
//         'reactions': []
//       }
//     ],
//     'creatorFlag': true,
//   },
//   'challengedDebater': {
//     'debaterName': 'Eamonn',
//     'comments': [
//       { 
//         'point': 'puppies are loyal, kitties will just scratch and bite you.',
//         'createdAt': new Date(),
//         'reactions': []
//       }
//     ],
//     'creatorFlag': false,
//   }
// };
//
// var trumpRoom = 
// {
//   'url': '/trump',
//   'topic': 'Is Trump qualified to run this country?',
//   'viewers': ['2', '333', '4'],
//   'creator': {
//     'debaterName': 'Saeid',
//     'comments': [
//       { 
//         'point': 'Trump has horrible hair. If he can\'t even take care of his hair, how will he take care of this country?', 
//         'createdAt': new Date(),
//         'reactions': []
//       },
//       { 
//         'point': 'Every time Trump speaks, a baby dies somewhere in the world.',
//         'createdAt': new Date(),
//         'reactions': []
//       }
//     ],
//     'creatorFlag': true,
//   },
//   'challengedDebater': {
//     'debaterName': 'Deepak',
//     'comments': [
//       { 
//         'point': 'Trump is a great man. He is the only man for this job.',
//         'createdAt': new Date(),
//         'reactions': []
//       }
//     ],
//     'creatorFlag': false,
//   }
// };

// Rooms.insert(kittyRoom);
// Rooms.insert(trumpRoom);

