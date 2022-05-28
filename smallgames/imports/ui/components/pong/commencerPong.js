import './commencerPong.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Random } from 'meteor/random';
import Swal from 'sweetalert2';

Template.commencerPong.events({
    "click .game"(){
        Swal.fire({
            title: 'Prêt·e à lancer une partie de block destroyer?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "C'est parti!",
            denyButtonText: "Règles du jeu",
        }).then((result) => {
            if(result.isConfirmed){ FlowRouter.go('/pong'); }
            else if (result.isDenied){
                //afficher scoreboard
        }
        });
    }
});