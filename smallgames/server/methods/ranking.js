import { Meteor } from 'meteor/meteor';

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
  /*
  function randomUsernameCorrect(){
    let randomUsername = '';
    let mots = ['Oiseau', 'Chat', 'Cheval', 'Lion', 'Singe'];
    let couleurs = ['Vert', 'Bleu', 'Jaune', 'Violet', 'Orange', 'Gris', 'Noir', ];
    
    randomUsername += 
  }
  */

Meteor.methods({
//methods test pour vérifier la fonctionnalité du leaderboard
        'addPlayer': function(){
          let pongScore = randomScore();
          let imageScore = randomScore();
          let generalScore = pongScore + imageScore;
            Meteor.users.insert({
                username: randomUsername(),
                profile: {
                  pongScore: pongScore,
                  imageScore: imageScore,
                  generalScore: generalScore,
                  },
                },
          )},
        
        'givePointsToCurrentAccountGeneral': function(){
            let currentUser = Meteor.userId();
            Meteor.users.update({ _id: currentUser}, { $inc: { 'profile.generalScore': 12}})
        },
        'givePointsToCurrentAccountPong': function(){
          let currentUser = Meteor.userId();
          Meteor.users.update({ _id: currentUser}, { $inc: { 'profile.pongScore': 12, 'profile.generalScore': 12}})
        },
        'givePointsToCurrentAccountImage': function(){
          let currentUser = Meteor.userId();
          Meteor.users.update({ _id: currentUser}, { $inc: { 'profile.imageScore': 12, 'profile.generalScore': 12}})
      },

});