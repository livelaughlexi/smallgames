import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './userInfo.html';

if(Meteor.isServer){
    Meteor.publish('userData', function() {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId }, {
                fields: { score: 1 }
            });
        } else {
            this.ready();
        }
    });
}

if(Meteor.isClient){
    Meteor.subscribe('userData');
}

Template.userInfo.helpers({
    currentUsername(){
        const currentUsername = Meteor.user().username;
        console.log(currentUsername);
        return currentUsername;
    },
    currentUserScore(){
        const currentUserScore = Meteor.user().profile.score;
        console.log(currentUserScore);
        return currentUserScore;
    }
})