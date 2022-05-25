import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import './registerForm.html';

Template.registerForm.events({

    'submit form': function(event, templateInstance){
        event.preventDefault();
        let email = templateInstance.find('[name=email]').value;
        let username = templateInstance.find('[name=username]').value;
        let password = templateInstance.find('[name=password]').value;
        let imageScore = 0;
        let pongScore = 0;
        let generalScore = 0;
        
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                //trouver comment update automatiquement le generalScore...
                generalScore: generalScore,
                imageScore: imageScore,
                pongScore: pongScore,
            }, 
            
        }, function(error){
            if(error){
                if(error.reason == 'Email already exists.'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oups...',
                        text: "Il semble que l'adresse email est déjà prise...",
                        footer: '<a href="/forgotPassword"> Mot de passe oublié ?</a>'
                    })
                } else if (error.reason == 'Username already exists.'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oups...',
                        text: "Ce nom d'utilisateur est déjà pris !",
                        footer: '<a href="/forgotPassword"> Mot de passe oublié ?</a>'
                    })
                } else if (error.reason == 'Need to set a username or email'){
                    Swal.fire(
                        "Tu dois entrer un nom d'utilisateur et une adresse email valide",
                        '',
                        'error'
                    )
                } else if (error.reason == 'Password may not be empty'){
                    Swal.fire(
                        "Tu dois entrer un mot de passe !",
                        '',
                        'error'
                    )
                }
            }
            //console.log(error.reason);
            //document.getElementById('username').innerHTML += error.reason;
            //Swal.fire(error.reason);
        })
        Meteor.call('sendVerificationLink', function(error){
            if(error.reason == "Can't find user."){
                Swal.fire('Oups...', 'Il semble que ton adresse email ne soit pas valide...', 'error')
            }
            console.log(error.reason);
            //document.getElementById('email').innerHTML += 'Entrez une adresse email valide';
            //Swal.fire(error.reason);
        })
        
    }
});

