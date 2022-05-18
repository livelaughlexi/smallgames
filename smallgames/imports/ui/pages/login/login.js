import '../../components/loginForm/loginForm';
import './login.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.login.onRendered(function() {
        console.log('test')
        if (Meteor.user) {
            FlowRouter.go('play')
        }
    
}) 



