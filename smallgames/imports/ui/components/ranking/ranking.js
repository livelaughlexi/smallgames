import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './ranking.html';

Template.ranking.helpers({
    'playerNames': function(){
        return Meteor.users.find({}, { sort: {score: -1}});
    }
})

Template.ranking.events({
    'click .playerName': function(){
        console.log('tu as cliqué sur un username')
    }
})