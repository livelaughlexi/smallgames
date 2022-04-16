import { Template } from "meteor/templating";
import { SourceImage } from "../../../../api/sourceImages";

import "./afficherMot.html";

Template.afficherMot.helpers({
    mot(){
        let random = Math.floor(Math.random() * 2);
        return SourceImage.findOne({type: "reponse"}, {skip: random}).nom;
    },
})