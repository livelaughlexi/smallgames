import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';




import './loginForm.html';


Template.loginForm.events({
    'submit form.login': function(event, templateInstance){
        event.preventDefault();
        let email = templateInstance.find('[name=email]').value;
        let password = templateInstance.find('[name=password]').value;
        Meteor.loginWithPassword(email, password, function(error){
           
            console.log(error.reason);
            
        });
    },

    }
);