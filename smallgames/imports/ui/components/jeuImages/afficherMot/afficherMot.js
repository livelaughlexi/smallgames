import { Template } from "meteor/templating";
import { Meteor } from 'meteor/meteor';

import "./afficherMot.html";
import { imagesUtilisees } from "../../../../db/imagesUtilisees";

Template.afficherImage.onCreated(function (){
    this.subscribe('motsJeuImages');
});

Template.afficherMot.helpers({
    mot(){
        let mot = imagesUtilisees.findOne({idJ1: Meteor.userId()})?.mot;
        return mot;
    },
});

