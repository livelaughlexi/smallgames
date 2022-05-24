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
        let imageScore = 0;
        let pongScore = 0;
        let generalScore = imageScore + pongScore;
        
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                //trouver comment update automatiquement le generalScore...
                generalScore: generalScore,
                imageScore: imageScore,
                pongScore: pongScore,
            }
            
        },
        Meteor.call('sendVerificationLink'),
        function(error){
            console.log(error.reason);
        });
    },
});

