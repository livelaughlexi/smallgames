import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../imports/api/sourceImages.js';
import { Accounts } from 'meteor/accounts-base';



Meteor.startup(() => {
  // code to run on server at startup
  if(SourceImage.find().count() === 0)
  {
    SourceImage.insert({ source:'/jeuImages/reponses/moto.jpg', nom:'moto', type:'reponse'});
  }
  
});

if(Meteor.isServer){
  
  Accounts.onCreateUser(function(options, user) {
    user.score = 0;
    return user;
  });

}


/*
if(Meteor.isServer){
  
  Accounts.onCreateUser((options, user) => (Object.assign({
    score: 0
  },
  user,
  options)))

}
*/


//Meteor.users.insert({name: 'aaaaaa', type: 'aha', nom: 'bon'});



/*
Accounts.onCreateUser((options, user) => {
    const customizedUser = Object.assign({
      score: 0
    }, user);
    
    if(options.profile) {
      customizedUser.profile = options.profile;
    }
  
    return customizedUser;
  })
*/
