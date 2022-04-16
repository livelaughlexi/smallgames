import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../api/sourceImages.js';

import './afficherImage.html';


Template.afficherImage.helpers({
    sourceImage(){
        let listeImagesAide = [];
        let nombresRandom = [];
        const nombreImages = SourceImage.find({type: "aide"}).count();
        console.log("nombre images c'est: " + nombreImages); 
        for(let i = 0; i < 9; i++)
        {
            let random = Math.floor(Math.random()*10);   //prendre des images aléatoires
            console.log("here");

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

let nombreImagesSelectionnees = 0;  //calculer nombre max d'images sélectionnables (3)
Template.afficherImage.events({
    "click .aideImage"(event) {
        const target = event.target;
        if(target.style.filter == "opacity(100%)" && nombreImagesSelectionnees < 3){
            target.style.filter = "opacity(50%)";   //séléctionner
            nombreImagesSelectionnees++;
        }
        else if(target.style.filter == "opacity(50%)"){
            target.style.filter = "opacity(100%)";  //désélectionner (si le nombre max d'images n'est pas atteint)
            nombreImagesSelectionnees--;         
        }
    }
})