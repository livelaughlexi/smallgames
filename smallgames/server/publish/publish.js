import { Meteor } from 'meteor/meteor';

//publier la collection users avec seulement le username et le profile dispo
Meteor.publish('usersData', function(){
    return Meteor.users.find({}, {
      fields: {username: 1, profile: 1}
    });
  });
  
//enlever aux utilisateurs la possibilité de modifier eux-mêmes leurs profils
Meteor.users.deny({ update: () => true }, { remove: () => true }, { insert: () => true }, )