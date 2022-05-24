import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './ranking.html';


Template.ranking.helpers({
    'playerNames': function(){
        return Meteor.users.find({}, { sort: {'profile.generalScore': -1}});
    }
})

Template.ranking.events({
    'click .testMethod': function(){
        Meteor.call('addPlayer');
    },
    
    'click .give12PointsToCurrentAccountGeneral': function(){
        Meteor.call('givePointsToCurrentAccountGeneral');
    },
    'click .give12PointsToCurrentAccountPong': function(){
        Meteor.call('givePointsToCurrentAccountPong');
    },
    'click .give12PointsToCurrentAccountImage': function(){
        Meteor.call('givePointsToCurrentAccountImage');
    },
    
});

//avoir accès à la collection users sur la db
Meteor.subscribe('usersData');