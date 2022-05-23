import './changePasswordForm.html'
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) { Template.changePasswordForm.events({
    'submit form': function(event){
        event.preventDefault();
        let oldPassword = $('[name=oldPassword]').val();
        let newPassword = $('[name=newPassword]').val();
            Accounts.setPassword(Meteor.userId(), oldPassword, newPassword, function(error){
           
                console.log(error.reason);
            
             });
    
    }
});

}