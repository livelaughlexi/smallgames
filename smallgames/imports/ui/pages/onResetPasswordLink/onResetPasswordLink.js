import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

import './onResetPasswordLink.html';

//ne fonctionne pas encore
Template.onResetPasswordLink.events({
    'submit .resetPassword': function(event, templateInstance){
        event.preventDefault();
        let newPassword = templateInstance.find('[name=newPassword]').value;
        let token = this.token;
        Accounts.resetPassword(token, newPassword, function(error){
            if(error){
                console.log(error.reason)
                //match failed ?
            }
        });
    }
})


/*
Accounts.onResetPasswordLink(function(templateInstance){
    let newPassword = templateInstance.find('[name=newPassword]').value;
    Accounts.resetPassword('', newPassword);
})
let currentPassword = 0;
Meteor.call('setPasswordToBlank');
Accounts.changePassword(currentPassword, newPassword);
*/