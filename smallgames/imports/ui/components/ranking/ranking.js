import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './ranking.html';


Template.ranking.helpers({
    'playerNames': function(){
        return Meteor.users.find({}, { sort: {'profile.score': -1}});
    }
})

Template.ranking.events({
    'click .playerName': function(){
        let playerId = this._id;
        Session.set('selectedPlayer', playerId);
    },
    //increment et decrement ne fonctionnent que en sélectionnant notre propre compte parce que le code est dans le clientside, je n'ai pas encore réussi à créer une méthode qui utilise les valeurs de la session
    'click .increment': function(){
        let selectedPlayer = Session.get('selectedPlayer');
        Meteor.users.update({ _id: selectedPlayer }, { $inc: { 'profile.score': 5 } });
    },
    'click .decrement': function(){
        let selectedPlayer = Session.get('selectedPlayer');
        Meteor.users.update({ _id: selectedPlayer }, { $inc: { 'profile.score': -5 } });
    },
    'click .testMethod': function(){
        Meteor.call('addPlayer');
    },
    
    'click .give12PointsToAnotherAccount': function(){
        Meteor.call('givePointsToCurrentAccount');
    }
    
});
