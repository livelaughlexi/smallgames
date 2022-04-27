import { Template } from "meteor/templating";
import { imagesUtilisees } from "../../../../api/imagesUtilisees";

import "./afficherImage2.html";

Template.afficherImage2.helpers({
    sourceImage(){
        let donneesJoueur1 = imagesUtilisees.findOne({});      // A changer par rapport à l'id des joueurs dès qu'on met ca en place!!
        let listeImagesChoisies = [];
        listeImagesChoisies.push(donneesJoueur1.image0, donneesJoueur1.image1, donneesJoueur1.image2);
        return listeImagesChoisies;
    }
});
