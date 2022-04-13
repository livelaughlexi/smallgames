import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/pages/home/home';
import '../../ui/pages/jeuImages/jeuImages';

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