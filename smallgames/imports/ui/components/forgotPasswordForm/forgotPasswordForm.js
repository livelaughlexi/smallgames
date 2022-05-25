import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'

import './forgotPasswordForm.html';
import Swal from 'sweetalert2';

Template.forgotPasswordForm.events({
    //formulaire d'envoi de mail de réinitialisation de password
    'submit form.forgotPasswordForm': function(event, templateInstance){
        event.preventDefault();
        let email = templateInstance.find('[name=email]').value;
        let options = {};
        options.email = email;
        console.log(options);
        Accounts.forgotPassword(options, function(error){  
            if (error) { 
              console.log(error.reason);
            }else{
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Email envoyé',
                showConfirmButton: true,
                timer: 1500
              })
            } 
          });
        },
})

