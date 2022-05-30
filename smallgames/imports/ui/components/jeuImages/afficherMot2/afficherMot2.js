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
    },
    "click .cacher3Mots"() {
        let idPage = FlowRouter.getParam('_id');
        let motADeviner = imagesUtilisees.findOne({_id: idPage})?.mot; // Trouver le mot à deviner
        if (imagesUtilisees.findOne({_id: idPage})?.powerupUsed) {
            Swal.fire({
                icon: 'error',
                title: 'Tu as déjà utilisé ce powerup',
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Tu es sûr·e?',
                text: 'Cette action te révèlera 3 mauvaises réponses, mais elle te coûtera 50 points',
                showCancelButton: true,
                confirmButtonText: "Confirmer",
            }).then((result) => {
                if(result.isConfirmed){
                    let unchosenWords = listeMots.filter((word) => word.motErrone == false); // Trouver les mots qui n'ont pas déjà été incorrectement choisis
                    let hidableWords = unchosenWords.filter((word) => word.mot !== motADeviner) // Crée un tableau avec seulement les mots qui sont faux
                    let sortedWords = hidableWords.sort(() => 0.5 - Math.random()); // Mélange aléatoirement les mots de la liste
                    let hiddenWords = sortedWords.splice(0, 3);
                    for (let i=0; i < hiddenWords.length; i++ ) {
                            let mot = hiddenWords[i].mot 
                            let modifiables = document.getElementById(mot);
                            modifiables.style.filter = "opacity(100%)";
                            modifiables.style.backgroundColor = "red";
                            Meteor.call('motsErrones', mot, idPage);
                    }

                    Meteor.call('utiliserPowerupChangerImages', motADeviner, idPage);

                }
            });
        }
    }
});
