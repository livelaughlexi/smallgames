//import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import './home.html';
if (Meteor.isClient) {

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

}
