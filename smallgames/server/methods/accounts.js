import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    //envoi d'un lien de vérification d'email
'sendVerificationLink': function(){
    let userId = Meteor.userId();
    
    Accounts.sendVerificationEmail( userId );
  },
  //reset du password pour permettre le changement de la part de l'utilisateur
  'setPasswordToBlank': function(){
    let blankPassword = 0;
    let userId = Meteor.userId();
    Accounts.setPassword(userId, blankPassword);
  },
  
})