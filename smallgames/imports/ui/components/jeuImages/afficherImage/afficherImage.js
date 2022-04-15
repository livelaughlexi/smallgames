import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../api/sourceImages.js';

import './afficherImage.html';


Template.afficherImage.helpers({
    sourceImage(){
        let listeImagesAide = [];
        let nombresRandom = [];
        for(let i = 0; i < 9; i++)
        {
            let random = Math.floor(Math.random()*10);   //prendre des images aléatoires
            if(nombresRandom.includes(random)){
                i--;
            }
            else{
                nombresRandom.push(random);
                listeImagesAide.push([SourceImage.findOne({type: "aide"}, {skip: random}).source]); //prend uniquement les images de type aide
            }
        }
        return listeImagesAide;
    },
});

Template.afficherImage.events({
    "click .aideImage"(event) {
       const target = event.target;
        if(target.style.filter == "opacity(100%)")
        {
            target.style.filter = "opacity(50%)";   //séléctionner
        }
        else{
            target.style.filter = "opacity(100%)";  //désélectionner
        }
    }
})