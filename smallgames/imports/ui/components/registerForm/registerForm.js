import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import './registerForm.html';

Template.registerForm.events({
    'submit form': function(event){
        event.preventDefault();
        let email = $('[name=email]').val();
        let password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password,
            score: 0
        });
        
    }
});