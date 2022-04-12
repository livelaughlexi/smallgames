import { Template } from 'meteor/templating';
import { SourceImage } from '../../../../api/sourceImages.js';

import './afficherImage.html';

Template.afficherImage.helpers({
    sourceImage(){
        return SourceImage.findOne({}).source;
    },
});