import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import "./afficherMot.html";
import { imagesUtilisees } from "../../../../db/imagesUtilisees";

Template.afficherImage.onCreated(function (){
    this.subscribe('motsJeuImages');
});

Template.afficherMot.helpers({
    mot(){
        let idPage = FlowRouter.getParam('_id');
        let mot = imagesUtilisees.findOne({_id: idPage})?.mot;
        return mot;
    },
});

