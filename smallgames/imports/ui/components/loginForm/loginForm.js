import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';




import './loginForm.html';


Template.loginForm.events({
    'submit form': function(event){
        event.preventDefault();
        let email = $('[name=email]').val();
        let password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
           
            console.log(error.reason);
            
        });
    }
});