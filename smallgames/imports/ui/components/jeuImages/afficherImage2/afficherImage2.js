import { Template } from "meteor/templating";
import { imagesUtilisees } from "../../../../db/imagesUtilisees";

import './afficherImage2.html';

Template.afficherImage2.onCreated(function(){
    this.subscribe('imagesUtilisees');
});

Template.afficherImage2.helpers({
    sourceImage(){
        let donneesJoueur1 = imagesUtilisees?.findOne({});      // Se référe deja plus qu'a l'id de l'utilisateur
        let listeImagesChoisies = [];
        listeImagesChoisies.push(donneesJoueur1?.image0, donneesJoueur1?.image1, donneesJoueur1?.image2);
        return listeImagesChoisies;
    },
});


