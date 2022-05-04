import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Random } from 'meteor/random';

import './commencerJeuImages.html';


Template.commencerJeuImages.events({
    "click .game"(){
        let id = Random.id();
        Meteor.call('creerImagesUtilisees', id);
        FlowRouter.go(`/jeuImages/${id}`);
    }
});