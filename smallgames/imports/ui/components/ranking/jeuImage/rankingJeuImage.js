import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './rankingJeuImage.html';


Template.rankingJeuImage.helpers({
    'playerNames': function(){
        return Meteor.users.find({}, { sort: {'profile.imageScore': -1}});
    }
})