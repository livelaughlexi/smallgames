import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/pages/home/home';
import '../../ui/pages/jeuImages/jeuImages';
import '../../ui/pages/jeuImages/jeuImages2';
import '../../ui/pages/play/play'

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

FlowRouter.route('/jeuImages2', {
    name: 'jeuImages2',
    action() {
        this.render('jeuImages2');
    },
});

FlowRouter.route('/play', {
    name: 'play',
    action() {
        this.render('play');
    },
});