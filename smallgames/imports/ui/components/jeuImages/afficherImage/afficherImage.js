import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../api/sourceImages.js';

import './afficherImage.html';


Template.afficherImage.helpers({
    sourceImage(){
        let listeImagesAide = [];
        let nombresRandom = [];
        for(let i = 0; i < 9; i++)
        {
            let random = Math.floor(Math.random()*9);
            if(nombresRandom.includes(random)){
                i--;
            }
            else{
                nombresRandom.push(random);
                listeImagesAide.push(SourceImage.findOne({type: "aide"}, {skip: random}).source);
            }
        }
        return listeImagesAide;
    },
});