import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Swal from 'sweetalert2';

import './loginForm.html';


Template.loginForm.events({

    'submit form.login': function(event, templateInstance){
        event.preventDefault();
        let email = templateInstance.find('[name=email]').value;
        let password = templateInstance.find('[name=password]').value;

        Meteor.loginWithPassword(email, password, function(error){
           if(error){
               console.log(error.reason)
                if(error.reason == 'User not found' ){
                    Swal.fire("Cet utilisateur n'existe pas !", "<a href='/register'>Tu n'as pas encore de compte ?</a>", 'error');
                } else if (error.reason == 'Incorrect password'){
                    Swal.fire('Mot de passe incorrect', '<a href=/forgotPassword>Mot de passe oublié ?</a>', 'error');
                }
                }
        });
    },

    }
);

/*
Template.loginForm.onRendered(function(){
    $('.login').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minLength: 6,
                number: true
            }
        },
        messages: {
            email: {
                required: Swal.fire('Tu dois entrer ton adresse email !'),
                email: Swal.fire("L'adresse email est invalide"),
            }
        }
    });
})
*/