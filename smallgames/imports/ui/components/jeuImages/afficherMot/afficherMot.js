import { Template } from "meteor/templating";
import { SourceImage } from "../../../../api/sourceImages";
import { Session } from 'meteor/session';

import "./afficherMot.html";

Template.afficherMot.helpers({
    mot(){
        let nombreMots = SourceImage.find({type: "reponse"}).count();
        console.log("nombre mots c'est: " + nombreMots); 
        nombreMots = 16;          //a changer dès que j'ai compris pourquoi nombreImages retourne parfois 7, parfois la bonne réponse

        let random = Math.floor(Math.random() * nombreMots);    
        let mot = SourceImage.findOne({type: "reponse"}, {skip: random}).nom;
        // eslint-disable-next-line meteor/no-session
        Session.set('mot', mot);
        return mot;
    },
}) 