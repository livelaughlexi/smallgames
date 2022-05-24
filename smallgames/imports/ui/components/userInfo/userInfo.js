import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './userInfo.html';

if(Meteor.isClient){
    Meteor.subscribe('userData');
}

Template.userInfo.helpers({
    currentUsername(){
        const currentUsername = Meteor.user().username;
        return currentUsername;
    },
    currentUserScore(){
        const currentUserScore = Meteor.user().profile.generalScore;
        return currentUserScore;
    }
})
//envoi d'un mail de vérification
Template.userInfo.events({
    'click .sendEmailVerificationLink': function(){
        Meteor.call('sendVerificationLink');
    }
})
