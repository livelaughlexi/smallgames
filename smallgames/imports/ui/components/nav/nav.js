import './nav.html';

import '../../pages/home/home';
import '../../pages/jeuImages/jeuImages';
import '../../pages/register/register';
import '../../pages/login/login';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.nav.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
})