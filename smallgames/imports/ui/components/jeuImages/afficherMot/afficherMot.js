import { Template } from "meteor/templating";
import { SourceImage } from "../../../../db/sourceImages";
import { Session } from 'meteor/session';

import "./afficherMot.html";

Template.afficherImage.onCreated(function (){
    this.subscribe('motsJeuImages');
});

Template.afficherMot.helpers({
    mot(){
        let nombreMots = SourceImage.find({type: "reponse"}).count();

        let random = Math.floor(Math.random() * nombreMots);    
        let mot = SourceImage.findOne({type: "reponse"}, {skip: random})?.nom;
        // eslint-disable-next-line meteor/no-session
        Session.set('mot', mot);
        return mot;
    },
});

