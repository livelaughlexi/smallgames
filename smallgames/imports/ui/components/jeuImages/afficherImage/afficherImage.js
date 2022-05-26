import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

import './afficherImage.html';
import { imagesUtilisees } from '../../../../db/imagesUtilisees.js';

Template.afficherImage.onCreated(function (){
    this.subscribe('sourceJeuImages');
    this.subscribe('imagesUtiliseesDB');        //A enlever sur le final, sert juste à voir si les donnees sont bien rentrées

    /* this.subscribe('sourceImage');
    let base = SourceImage.find({}).fetch();       // A utiliser lorsqu'on rajoute de nouveaux éléments dans la base (renvoi la liste des éléments pour ajouter sur main.js cote server)
    console.log(base); */
}); 

let listeImagesAide = []
Template.afficherImage.helpers({
    sourceImage(){
        let idPage = FlowRouter.getParam('_id');
        listeImagesAide = imagesUtilisees.findOne({_id: idPage})?.listeImages;
        return listeImagesAide;
    },
});

let nombreImagesSelectionnees = 0;  //calculer nombre max d'images sélectionnables (3)
let imagesSelectionnes = [];
Template.afficherImage.events({
    "click .aideImage"(event) {
        const target = event.target;
        if(target.style.filter === "opacity(100%)" && nombreImagesSelectionnees < 3){
            target.style.filter = "opacity(50%)";   //séléctionner
            nombreImagesSelectionnees++;
            imagesSelectionnes.push(listeImagesAide[target.id]);
        }
        else if(target.style.filter === "opacity(50%)"){
            target.style.filter = "opacity(100%)";  //désélectionner (si le nombre max d'images n'est pas atteint)
            nombreImagesSelectionnees--;
            imagesSelectionnes = imagesSelectionnes.filter(item => item !== listeImagesAide[target.id]);         
        }
    },
    "click .confirmer"() {
        if(nombreImagesSelectionnees === 3)
        {
            Swal.fire({
                title: 'Voulez vous confirmer votre choix?',
                text: "Vous ne le pourrez plus changer",
                showCancelButton: true,
                icon: 'warning',
                confirmButtonText: 'Confirmer mon choix',
                cancelButtonText: 'Annuler',
            }).then((result => {
                if(result.isConfirmed) {
                    Swal.fire(
                        'Choix confirmé!',
                        "Il suffit désormais d'attendre votre partenaire!",
                        'success'
                    )
                    let idPage = FlowRouter.getParam('_id');
                    Meteor.call('insererImagesChoisies', imagesSelectionnes[0], imagesSelectionnes[1], imagesSelectionnes[2], idPage);
                    nombreImagesSelectionnees = 0;
                    //ajouter redirection vers play
                    FlowRouter.go('/play');
                }
            }));
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: "Vous n'avez pas séléctionné assez d'images"
            });
        } 
    }
});
