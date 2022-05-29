import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Accounts } from 'meteor/accounts-base';

import '../../ui/pages/home/home';
import '../../ui/pages/jeuImages/jeuImages';
import '../../ui/pages/register/register';
import '../../ui/pages/login/login';
import '../../ui/pages/account/account';
import '../../ui/pages/leaderboard/leaderboard';
import '../../ui/pages/jeuImages/jeuImages2';
import '../../ui/pages/play/play';
import '../../ui/pages/notFound/notFound';
import '../../ui/pages/pong/pong';
import '../../ui/pages/pong/newGame';
import '../../ui/pages/logout/logout';
import '../../ui/pages/account/account';
import '../../ui/pages/jeuImages/reglesJeuImages';
import'../../ui/pages/forgotPassword/forgotPassword';


import '../../ui/pages/play/play'
import '../../ui/pages/notFound/notFound'
import '../../ui/pages/onResetPasswordLink/onResetPasswordLink';

FlowRouter.route('/', {
    name: 'home',
    action() {
        this.render('home');
    },
});

FlowRouter.route('*', {
    action() {
      this.render('notFound');
    }
  });

FlowRouter.route('/jeuImages/:_id', {
    name: 'jeuImages',
    action() {
        this.render('jeuImages');
    },
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        this.render('login');
    },
});

FlowRouter.route('/register', {
    name: 'register',
    action() {
        this.render('register');
    },
});

FlowRouter.route('/leaderboard', {
    name: 'leaderboard',
    action() {
        this.render('leaderboard');
    }
})
FlowRouter.route('/jeuImages2/:_id', {
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

FlowRouter.route('/account', {
    name: 'account',
    action() {
        this.render('account');
    },
});

FlowRouter.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout();
        this.render('logout');
    },
});
FlowRouter.route('/account', {
    name: 'account',
    action() {
        this.render('account');
    },
});
FlowRouter.route('/reglesJeuImages', {
    name: 'reglesJeuImages',
    action() {
        this.render('reglesJeuImages');
    },
});

FlowRouter.route('/forgotPassword', {
    name: 'forgotPassword',
    action(){
        this.render('forgotPassword');
    },
})

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

FlowRouter.route('/reset-password/:token', {
    action(){
        this.render('onResetPasswordLink')
    }
});