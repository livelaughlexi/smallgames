import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/pages/home/home';
import '../../ui/pages/jeuImages/jeuImages';
import '../../ui/pages/register/register';
import '../../ui/pages/login/login';
import '../../ui/pages/leaderboard/leaderboard';

FlowRouter.route('/', {
    name: 'home',
    action() {
        this.render('home');
    },
});

FlowRouter.route('/jeuImages', {
    name: 'jeuImages',
    action() {
        this.render('jeuImages');
    },
});

FlowRouter.route('/register', {
    name: 'register',
    action() {
        this.render('register');
    },
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        this.render('login');
    },
});

FlowRouter.route('/leaderboard', {
    name: 'leaderboard',
    action() {
        this.render('leaderboard');
    }
})