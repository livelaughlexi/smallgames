import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './setPassword.html';

Template.setPassword.events({
    'submit form': function(event, templateInstance){
        event.preventDefault();
        let currentPassword = templateInstance.find('[name=currentPassword]').value;
        let newPassword = templateInstance.find('[name=newPassword]').value;
        Accounts.changePassword(currentPassword, newPassword);
        
    }
})