import './play.html';
import '../../components/global/globalHeader';
import '../../components/jeuImages/commencerJeuImages/commencerJeuImages';
import '../../components/global/redirectNonUsers'
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { partiesFinies } from '../../../db/partiesFinies';

Template.play.onCreated(function(){
    this.subscribe('partiesFinies');
})

Template.play.onRendered(function(){
    this.autorun(() => {
        let partiesTerminees = partiesFinies.find({idJ1: Meteor.userId()}).fetch();     //il n'y a que le dernier qui apparait!!
        for(let i = 0; i < partiesTerminees.length; i++){
            Swal.fire({
                title: `Le joueur 2 vient de vinir sa partie!`,
                text: `Vous avez gagné ${partiesTerminees[i].score} points`
            });
            let idPartie = partiesTerminees[0]._id;
            Meteor.call('deleteDB', idPartie);
        }

    });
});
