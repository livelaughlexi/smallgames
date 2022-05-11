import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../db/sourceImages.js';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

import './afficherImage.html';

Template.afficherImage.onCreated(function (){
    this.subscribe('sourceJeuImages');
    this.subscribe('imagesUtiliseesDB');        //A enlever sur le final, sert juste à voir si les donnees sont bien rentrées

    this.subscribe('sourceImage');
    let base = SourceImage.find({}).fetch();
    console.log(base);
    //console.log(JSON.stringify(SourceImage.find({}).collection));
});

let listeImagesAide = []
Template.afficherImage.helpers({
    sourceImage(){
        listeImagesAide = [];
        let listeRandomId = [];
        let nombreImages = SourceImage.find({type: "aide"}).count();
        if (nombreImages >= 9) {
            let mot = Session.get('mot');
            let imageReponseRandom = Math.ceil(Math.random()*3);
            let nomImageReponse = "";
            if(imageReponseRandom == 1)
            {
                nomImageReponse = SourceImage.findOne({nom: mot})?.image1; 
            }
            else if(imageReponseRandom == 2)
            {
                nomImageReponse = SourceImage.findOne({nom: mot})?.image2; 
            }
            else if(imageReponseRandom == 3)
            {
                nomImageReponse = SourceImage.findOne({nom: mot})?.image3; 
            }
            listeImagesAide.push(SourceImage.findOne({nom: nomImageReponse})?.source);
            listeRandomId.push(SourceImage.findOne({nom: nomImageReponse})?._id);
            for(let i = 0; i < 8; i++)
            {  
                let random = Math.floor(Math.random()*nombreImages);
                let randomId = SourceImage.findOne({type: "aide"}, {skip: random})._id;
    
                if(listeRandomId?.includes(randomId)){
                    i--;
                }
                else{
                    listeRandomId.push(randomId);
                    listeImagesAide.push(SourceImage.findOne({_id: randomId}).source); //prend uniquement les images de type aide
                }
            }
        }
        //shuffle la liste:
        shuffle(listeImagesAide);
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


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }