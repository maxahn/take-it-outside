import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Rooms = new Mongo.Collection('rooms');
export const RoomUsers = new Mongo.Collection('roomUsers');
export const Arguments = new Mongo.Collection('arguments');


Meteor.methods({

  'saveForm' (room, creator, challenged) {
    var roomId;
    var a = new Date();
    room.expiryTime = a;
    debugger;
    room.save(function(err, id) {
      roomId = id;
    });
    creator.roomId = roomId;
    creator.save();
    challenged.roomId = roomId;
    challenged.save();
  }

});


Room = Class.create({
  name: 'Room',
  collection: Rooms,
  fields: {
    topic: {
      type: String
      // validator: [
      //   Validators.minLength(3)
      // ]
    },
    url: {
       type: String
       // validator: [
//         Validators.minLength(8),
//         Validators.unique()
//       ]
    },
    expiryTime: {
      type: Date
      // validator: [
      //   Validators.minLength(3)
      // ]
    }

  },

  behaviors: {
  timestamp: {
    hasCreatedField: true,
    createdFieldName: 'createdAt',
  }
}
});

RoomUser = Class.create({
  name: 'RoomUser',
  collection: RoomUsers,
  fields: {
    name: {
      type: String
    },
    userType: {
      type: String
    },
    roomId:{
      type: String
    }
  }
});

Argument = Class.create({
  name: 'Argument',
  collection: Arguments,
  fields: {
    message: {
      type: String
    },
    userId: {
      type: String
    },
    roomId:{
      type: String
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
    }
 }
});



