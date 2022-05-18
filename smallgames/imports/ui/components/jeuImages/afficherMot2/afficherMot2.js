import { Template } from "meteor/templating";
import { imagesUtilisees } from "../../../../db/imagesUtilisees";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

import "./afficherMot2.html";

Template.afficherMot2.onCreated(function(){
    this.subscribe('imagesUtiliseesDB');
    this.subscribe('motsJeuImages');
});

let listeMots = [];
Template.afficherMot2.helpers({
    listeMots(){
        let idPage = FlowRouter.getParam('_id');
        listeMots = imagesUtilisees.findOne({_id: idPage})?.listeMots;
        return listeMots;
    }
});

let motSelectionne = false;
let reponseChoisie = 0;
let vies = 3;
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

        //changer les window.alert
        if(reponseChoisie === 0)
        {
            // eslint-disable-next-line no-undef
            window.alert("Vous n'avez pas choisi de mot");
        }
        else if (reponseChoisie === motADeviner)
        {
            // eslint-disable-next-line no-undef
            window.alert("Vous avez trouvé la bonne réponse");
            
            let idPage = FlowRouter.getParam('_id'); 
            //trouver score à attribuer
            let points = vies*30+10;
            Meteor.call('ajouterScoreImagesJeu', idPage, points); //in main.js (server)

            motSelectionne = false;
            FlowRouter.go('/play');
        }
        else{
            // ne pas reprendre le meme mot
            let mot = document.getElementById(reponseChoisie);
            mot.style.filter = "opacity(100%)";
            mot.style.backgroundColor = "red";
            vies--;
            motSelectionne = false;
            if(vies === 0)
            {
                // eslint-disable-next-line no-undef
                window.alert("Vous avez perdu");
                
                //trouver score à attribuer

                let idPage = FlowRouter.getParam('_id');
                let points = 10;
                Meteor.call('ajouterScoreImagesJeu', idPage, points); //in main.js (server)
                reponseChoisie = 0;
                motSelectionne = false;
                FlowRouter.go('/play');
            }
            else{
                // eslint-disable-next-line no-undef
                window.alert(`Vous avez encore ${vies} vies`);
            }
        }
    }
});

