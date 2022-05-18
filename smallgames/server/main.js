import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../imports/api/sourceImages.js';
import { Accounts } from 'meteor/accounts-base';
// eslint-disable-next-line no-unused-vars
import { imagesUtilisees } from '../imports/api/imagesUtilisees.js';


Meteor.startup(() => {
  // code to run on server at startup
  if (SourceImage.find().count() === 0) {
        SourceImage.insert({source:'/jeuImages/aides/argent.jpg', nom:'argent', type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/armee.jpg', nom:'armee' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/bois.jpg', nom:'bois' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/cafe.jpg', nom:'cafe' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/carte.jpg', nom:'carte' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/eau.jpg', nom:'eau' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/eclair.jpg', nom:'eclair' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/pomme.jpg', nom:'pomme' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/tempeteMer.jpg', nom:'tempeteMer' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/unil.jpg', nom:'unil' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/reponses/moto.jpg', nom:'moto' , type:'reponse' });
        SourceImage.insert({source:'/jeuImages/reponses/hockey.jpg', nom:'hockey' , type:'reponse'});
  }
    //configuration de l'adresse mail pour envoyer des mails
    process.env.MAIL_URL = 'smtps://adrianfeuler@gmail.com:ceciEst1Test-PourMeteor@smtp.gmail.com:465/';
    //Accounts.emailTemplates.from = 'no-reply@smallgames.com'
  

});

//fonctions de test pour la création d'users random pour vérifier la fonctionnalité du leaderboard
    function randomUsername(){
      let randomUsername = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < 6; i++){
        randomUsername += characters.charAt(Math.ceil(Math.random()*characters.length + 1))
      }
      return randomUsername
    }
    function randomScore(){
      let result = Math.ceil(Math.random()*500);
      return result;
    }

Meteor.methods({
  //methods test pour vérifier la fonctionnalité du leaderboard
          'addPlayer': function(){
              Meteor.users.insert({
                  username: randomUsername(),
                  profile: {
                    score: randomScore()
                    },
                  },
            )},
          
          'givePointsToCurrentAccount': function(){
              let currentUser = Meteor.userId();
              Meteor.users.update({ _id: currentUser}, { $inc: { 'profile.score': 12}})
          },
  //envoi d'un lien de vérification d'email
  'sendVerificationLink': function(){
    let userId = Meteor.userId();
    
    Accounts.sendVerificationEmail( userId );
  },
  

});

//normalement : envoi automatique d'un email à la création du compte
Accounts.config({
  sendVerificationEmail: true,
});

//personnaliser l'email de vérification d'adresse email
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Smallgames] Vérifiez votre adresse email";
  },
  text(user, url) {
    let emailAddress = user.emails[0].address,
        urlWithoutHash = url.replace('#/', ''),
        emailBody = `Pour vérifier votre adresse email (${emailAddress}) cliquez sur ce lien:\n\n${urlWithoutHash}\n\n.`;

    return emailBody;
  }
}