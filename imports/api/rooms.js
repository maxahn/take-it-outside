import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Rooms = new Mongo.Collection('rooms');
export const RoomUsers = new Mongo.Collection('roomUsers');
export const Arguments = new Mongo.Collection('arguments');
export const Votes = new Mongo.Collection('votes')
export const Views = new Mongo.Collection('views');


Meteor.methods({

  'saveForm' (room, creator, challenged) { // saveform is the method created, 3 params put in
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

    return {
      room: room,
      creator: creator,
    }

  },

  'saveViewerComment' (viewer, comment) {
    var viewerId;
    viewer.save(function(err, id) {
      viewerId = id;
    });
    comment.argRoomUserId = viewerId;
    comment.save();
  },

  'saveDebateArgument'(msg, userId) {
    var argument = new Argument();
    argument.argRoomUserId = userId;
    argument.message = msg;
    argument.createdAt = new Date();
    argument.save();

  },

  'saveVote'(vote) {
  	vote.save();

  }, 

  'saveViewRoom'(view) {
    view.save();
  }, 



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
    viewFlag: {
      type: Boolean
    },
    viewRoomId: {
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

Vote = Class.create({
	name: 'Vote',
	collection: Votes,
	fields: {
		voteDebaterId: {
			type: String
		},
		vote: {
			type:Boolean
		}
		

	},
	behaviors: {
	    timestamp: {
	      hasCreatedField: true,
	      createdFieldName: 'createdAt',
	    }
 }});

//  View = Class.create({
// 	name: 'View',
// 	collection: Views,
// 	fields: {
// 		totalNumber: {
// 			type: String
// 		},
// 		vote: {
// 			type:Boolean
// 		}

// 	},
// 	behaviors: {
// 	    timestamp: {
// 	      hasCreatedField: true,
// 	      createdFieldName: 'createdAt',
// 	    }
//  }


// })





