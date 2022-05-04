import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/pages/home/home';
import '../../ui/pages/jeuImages/jeuImages';
import '../../ui/pages/jeuImages/jeuImages2';
import '../../ui/pages/play/play';
import '../../ui/pages/notFound/notFound';
import '../../ui/pages/pong/pong';
import '../../ui/pages/pong/newGame';

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

FlowRouter.route('*', {
    action() {
      this.render('notFound');
    }
  });

  FlowRouter.route('/pong', {
    name: 'pong',
    action() {
        this.render('pong');
    },
});

FlowRouter.route('/newGame', {
    name: 'newGame',
    action() {
        this.render('newGame');
    },
});