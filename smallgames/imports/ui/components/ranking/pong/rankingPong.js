import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './rankingPong.html';


Template.rankingPong.helpers({
    'playerNames': function(){
        return Meteor.users.find({}, { sort: {'profile.pongScore': -1}});
    }
})