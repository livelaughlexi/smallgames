import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../db/sourceImages.js';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

import './afficherImage.html';

Template.afficherImage.onCreated(function (){
    this.subscribe('sourceJeuImages');
    this.subscribe('imagesUtiliseesDB');        //A enlever sur le final, sert juste à voir si les donnees sont bien rentrées
});

let listeImagesAide = []
Template.afficherImage.helpers({
    sourceImage(){
        listeImagesAide = []
        let nombresRandom = []
        let nombreImages = SourceImage.find({type: "aide"}).count();
        if (nombreImages >= 9) {
            for(let i = 0; i < 9; i++)
            {  
                let random = Math.floor(Math.random()*nombreImages);
    
                if(nombresRandom?.includes(random)){
                    i--;
                }
                else{
                    nombresRandom.push(random);
                    listeImagesAide.push(SourceImage.findOne({type: "aide"}, {skip: random}).source); //prend uniquement les images de type aide
                }
            }
        }
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
            // eslint-disable-next-line meteor/no-session
            let mot = Session.get('mot');
            Meteor.call('insererImagesChoisies', imagesSelectionnes[0], imagesSelectionnes[1], imagesSelectionnes[2], mot);
            //ajouter redirection vers play
            FlowRouter.go('/play');
        }
        else{
            // eslint-disable-next-line no-undef
            window.alert("vous n'avez pas séléctionné assez d'images");
        }
    }
});
