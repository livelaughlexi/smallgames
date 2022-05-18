import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import './registerForm.html';

Template.registerForm.events({
    'submit form': function(event){
        event.preventDefault();
        let email = $('[name=email]').val();
        let username = $('[name=username]').val();
        let password = $('[name=password]').val();
        //let score = 0;
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                score: 0
            }
            //score: score
        }, function(error){
            console.log(error.reason);
        });
        /*
        Accounts.onCreateUser((options, user) => {
            const customizedUser = Object.assign({
                score: 0
            }, user);
            if (options.profile) {
                customizedUser.profile = options.profile;
            }
            return customizedUser;
        })*/
    }
});

if(Meteor.isServer){
    Meteor.publish('userData', function() {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId }, {
                fields: { score: 1 }
            });
        } else {
            this.ready();
        }
    });
}

if(Meteor.isClient){
    Meteor.subscribe('userData');
}