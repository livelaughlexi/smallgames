import { Template } from "meteor/templating";
import { imagesUtilisees } from "../../../../db/imagesUtilisees";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';     
import Swal from 'sweetalert2';

import "./afficherMot2.html";

Template.afficherMot2.onCreated(function(){
    this.subscribe('imagesUtiliseesDB');
    this.subscribe('motsJeuImages');

});

Template.afficherMot2.onRendered(function(){
    this.autorun(() => {
        let idPage = FlowRouter.getParam('_id');
        let motsErrones = imagesUtilisees.findOne({_id: idPage})?.motsErrones;
        console.log(motsErrones);
        if(motsErrones){
            console.log("dans le if");
            for(let i = 0; i < motsErrones.length; i++)
            {
                //let mot = document?.getElementById(motsErrones[i]);
                let mot = this.find(`#${motsErrones[i]}`);
                console.log(mot);
                if(mot){
                    mot.style.backgroundColor = "red";
                    console.log("here");
                }
            }
        }
    });
});

let listeMots = [];
Template.afficherMot2.helpers({
    listeMots(){
        let idPage = FlowRouter.getParam('_id');
        listeMots = imagesUtilisees.findOne({_id: idPage})?.listeMots;
        return listeMots;
    },
    vies(){
        let idPage = FlowRouter.getParam('_id');
        let vies = imagesUtilisees.findOne({_id: idPage})?.vies;
        return vies;
    }
});

let motSelectionne = false;
let reponseChoisie = 0;
Template.afficherMot2.events({
    "click .reponsesMots"(event) {
        const target = event.target;
        if(target.style.filter === "opacity(100%)" && !motSelectionne && target.style.backgroundColor != "red"){
            target.style.filter = "opacity(50%)";   //séléctionner
            motSelectionne = true;
            reponseChoisie = target.id;
        }
        else if(target.style.filter === "opacity(50%)"){
            target.style.filter = "opacity(100%)";  //désélectionner (si le nombre max d'images n'est pas atteint)
            motSelectionne = false;
            reponseChoisie = 0;        
        }
    },
    "click .confirmer"() {
        let idPage = FlowRouter.getParam('_id');
        let motADeviner = imagesUtilisees.findOne({_id: idPage})?.mot; //A changer avec l'id des joueurs plus tard
        if(reponseChoisie === 0)
        {
            Swal.fire({
                icon: 'warning',
                title: "Vous n'avez pas séléctionné de mot"
            });
        }
        else if (reponseChoisie === motADeviner)
        {
            let idPage = FlowRouter.getParam('_id');
            let vies = imagesUtilisees.findOne({_id: idPage})?.vies; 
            //score à attibuer
            let points = vies*30+10;
            Meteor.call('ajouterScoreImagesJeu', idPage, points); //in main.js (server)

            motSelectionne = false;
            FlowRouter.go('/play');
            Swal.fire({
                icon: 'success',
                title: 'Vous avez trouvé la bonne réponse!',
                text: `Vous avez gagné ${points} points.`,
            });
            
        }
        else{
            // ne pas reprendre le meme mot
            // eslint-disable-next-line no-undef
            let mot = document.getElementById(reponseChoisie);
            mot.style.filter = "opacity(100%)";
            mot.style.backgroundColor = "red";
            Meteor.call('perteVie', idPage);
            let vies = imagesUtilisees.findOne({_id: idPage})?.vies;
            Meteor.call('motsErrones', reponseChoisie, idPage);
            motSelectionne = false;
            if(vies === 0)
            {
                let idPage = FlowRouter.getParam('_id');
                let points = 10;
                Meteor.call('ajouterScoreImagesJeu', idPage, points); //in main.js (server)
                reponseChoisie = 0;
                motSelectionne = false;
                FlowRouter.go('/play');
                Swal.fire({
                    icon: 'error',
                    title: 'Vous avez perdu',
                    text: `Le mot était: ${motADeviner}`,
                }).then(() => {
                    Swal.fire({
                        text: 'Vous avez gagné 10 points de participation',
                    })
                });
            }
            else{
                reponseChoisie = 0;
                motSelectionne = false;
                Swal.fire({
                    icon: 'error',
                    title: `Vous avez encore ${vies} vies`,
                });
            }
        }
    }
});

