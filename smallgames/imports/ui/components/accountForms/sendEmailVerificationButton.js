import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './sendEmailVerificationButton.html';

Template.sendEmailVerificationButton.events({
    'click .sendEmailVerificationLink': function(event){
        event.preventDefault();
        Meteor.call('sendVerificationLink');

    }
})