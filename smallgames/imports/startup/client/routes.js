import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Accounts } from 'meteor/accounts-base';

import '../../ui/pages/home/home';
import '../../ui/pages/jeuImages/jeuImages';
import '../../ui/pages/register/register';
import '../../ui/pages/login/login';
import '../../ui/pages/account/account';
import '../../ui/pages/leaderboard/leaderboard';
import '../../ui/pages/jeuImages/jeuImages2';
import '../../ui/pages/play/play'
import '../../ui/pages/notFound/notFound'

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

FlowRouter.route('/account', {
    name: 'account',
    action() {
        this.render('account');
    },
});

FlowRouter.route('*', {
    action() {
      this.render('notFound');
    }
  });
//configurer la route pour l'email de vérification
FlowRouter.route('/verify-email/:token', {
    name: 'verify-email',
    action( params ) {
        Accounts.verifyEmail( params.token, ( error ) => {
            if ( error ) {
                alert( error.reason, 'danger' );
            } else {
                FlowRouter.go('/');
                alert( 'Adresse email vérifiée !', 'success');
            }
        });
    }
});