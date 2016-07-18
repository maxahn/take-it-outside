import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Rooms = new Mongo.Collection('rooms');
export const RoomUsers = new Mongo.Collection('roomUsers');
export const Arguments = new Mongo.Collection('arguments');
export const Views = new Mongo.Collection('views');



Meteor.methods({

  'saveForm' (room, creator, challenged) {
    var roomId;
    var expiryDate = new Date();
    var numberOfDaysToAdd = 7;
    expiryDate.setDate(expiryDate.getDate() + numberOfDaysToAdd); 

    room.expiryTime = expiryDate;
    room.save(function(err, id) {
      roomId = id;
    });

    creator.userRoomId = roomId;
    creator.save();

    challenged.userRoomId = roomId;
    challenged.save();

  },

  'saveViewerComment' (viewer, comment) {
    var viewerId;
    
    viewer.save(function(err, id) {
      viewerId = id;
    });
    comment.argRoomUserId = viewerId;
    comment.save();

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
    userRoomId:{
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
    argRoomUserId: {
      type :String
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
    }
 }
});

View = Class.create({
  name: 'View',
  collection: Views,
  fields: {
    totalView: {
      type: Number
    },
    viewRoomId: {
      type : String
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
    }
 }
});




