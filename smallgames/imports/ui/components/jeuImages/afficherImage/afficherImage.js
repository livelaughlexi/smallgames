import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../api/sourceImages.js';
import { imagesUtilisees } from '../../../../api/imagesUtilisees.js';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './afficherImage.html';


let listeImagesAide = [];   //pour pouvoir accéder sur event
Template.afficherImage.helpers({
    sourceImage(){
        listeImagesAide = []; //pour reset la liste
        let nombresRandom = [];
        let nombreImages = SourceImage.find({type: "aide"}).count();
        console.log("nombre images c'est: " + nombreImages); 
        nombreImages = 50;    //a changer dès que j'ai compris pourquoi nombreImages retourne parfois 7, parfois la bonne réponse
        for(let i = 0; i < 9; i++)
        {  
            let random = Math.floor(Math.random()*nombreImages);

            if(nombresRandom.includes(random)){
                i--;
            }
            else{
                nombresRandom.push(random);
                listeImagesAide.push(SourceImage.findOne({type: "aide"}, {skip: random}).source); //prend uniquement les images de type aide
            }
        }
        // eslint-disable-next-line no-undef
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
            imagesUtilisees.insert({image0: imagesSelectionnes[0], image1: imagesSelectionnes[1], image2: imagesSelectionnes[2], mot: mot});
            //ajouter redirection vers afficherImage2
            FlowRouter.go('/jeuImages2');
        }
        else{
            // eslint-disable-next-line no-undef
            window.alert("vous n'avez pas séléctionné assez d'images");
        }
    }
});