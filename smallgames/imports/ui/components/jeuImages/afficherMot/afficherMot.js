import { Template } from "meteor/templating";
import { SourceImage } from "../../../../api/sourceImages";
import { Session } from 'meteor/session';

import "./afficherMot.html";

Template.afficherMot.helpers({
    mot(){
        let random = Math.floor(Math.random() * 2);     //changer le 2 en l'ensemble des photos (avec .count)
        let mot = SourceImage.findOne({type: "reponse"}, {skip: random}).nom;
        // eslint-disable-next-line meteor/no-session
        Session.set('mot', mot);
        return mot;
    },
})