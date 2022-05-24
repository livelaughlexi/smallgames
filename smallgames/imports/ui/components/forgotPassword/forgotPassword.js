import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'

import './forgotPassword.html';

Template.forgotPassword.events({
    //formulaire d'envoi de mail de réinitialisation de password
    'submit form.forgotPassword': function(event, templateInstance){
        event.preventDefault();
        let email = templateInstance.find('[name=email]').value;
        let options = {};
        options.email = email;
        console.log(options);
        Accounts.forgotPassword(options, function(error){  
            if (error) { 
              console.log(error);
            }else{
              alert('Check your mailbox!');
            } 
          });
        },
})

