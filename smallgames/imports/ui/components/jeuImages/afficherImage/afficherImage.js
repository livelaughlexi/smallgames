import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

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
            Meteor.call('insererImagesChoisies', imagesSelectionnes[0], imagesSelectionnes[1], imagesSelectionnes[2]);
            //ajouter redirection vers play
            FlowRouter.go('/play');
        }
        else{
            // eslint-disable-next-line no-undef
            window.alert("vous n'avez pas séléctionné assez d'images");
        }
    }
});
