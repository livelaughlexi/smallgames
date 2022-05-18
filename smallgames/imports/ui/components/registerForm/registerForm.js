import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import './registerForm.html';

Template.registerForm.events({
    'submit form': function(event, templateInstance){
        event.preventDefault();
        let email = templateInstance.find('[name=email]').value;
        let username = templateInstance.find('[name=username]').value;
        let password = templateInstance.find('[name=password]').value;
        
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                score: 0
            }
            
        },
        Meteor.call('sendVerificationLink'),
        function(error){
            console.log(error.reason);
        });
    }
});

