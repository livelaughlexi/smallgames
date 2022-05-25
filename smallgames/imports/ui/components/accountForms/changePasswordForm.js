import './changePasswordForm.html'
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

Template.changePasswordForm.events({
    'submit form': function(event, templateInstance){
        event.preventDefault();
        let oldPassword = templateInstance.find('[name=oldPassword]').value;
        let newPassword = templateInstance.find('[name=newPassword]').value;
        Accounts.changePassword(oldPassword, newPassword, function(error){
        if(error){
            console.log(error.reason);
            Swal.fire(error.reason);
        
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Mot de passe modifié !',
                showConfirmButton: false,
                timer: 1700
              })
        }
            });
    }
});

