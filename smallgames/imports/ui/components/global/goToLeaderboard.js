import './goToLeaderboard.html'
import { Template } from 'meteor/templating';
import './redirectNonUsers.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.goToLeaderboard.events({
    "click .goToLeaderboard"(){
        FlowRouter.go('/leaderboard');
    }
});