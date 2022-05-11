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
        const currentUserScore = Meteor.user().profile.score;
        return currentUserScore;
    }
})