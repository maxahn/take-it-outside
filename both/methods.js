Meteor.methods({
  '/user/save': function(user) {
    if (user.validate()) {
      user.save();
      return user;
    }

    user.throwValidationException();
  },
  '/user/remove': function(user) {
    user.remove();
  }

  '/rooms/save': function(room) {
       if (room.validate()) {
      room.save();
      return room;
    }
    room.throwValidationException();
  }

  '/room/remove': function(room) {
    room.remove();
  }
});



