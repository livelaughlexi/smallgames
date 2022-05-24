import './changePasswordForm.html'
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Template.changePasswordForm.events({
    'submit form': function(event, templateInstance){
        event.preventDefault();
        let oldPassword = templateInstance.find('[name=oldPassword]').value;
        let newPassword = templateInstance.find('[name=newPassword]').value;
        Accounts.changePassword(oldPassword, newPassword, function(error){
        
            console.log(error.reason);
        
            });

    }
});

