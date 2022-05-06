import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Random } from 'meteor/random';

import './commencerJeuImages.html';
import { imagesUtilisees } from '../../../../db/imagesUtilisees';


/* Template.commencerJeuImages.events({
    "click .game"(){
        let id = Random.id();
        Meteor.call('creerImagesUtilisees', id);
        FlowRouter.go(`/jeuImages/${id}`);
    }
});  */

Template.commencerJeuImages.onCreated(function(){
    this.subscribe('partiesLancees');
});

Template.commencerJeuImages.events({
    "click .game"(){
        //// si joueur n'a pas fini une partie --> directionné sur la partie
        //// si joueur n'a pas de partie commencées -->
                                                    //// si une partie joueur 2 est dispo --> joueur2
                                                    //// si pas de partie joueur 2 --> joueur 1/
        if(imagesUtilisees.findOne({idJ2: Meteor.userId()}))
        {
            //console.log("1");
            let id = imagesUtilisees.findOne({idJ2: Meteor.userId()})._id;
            FlowRouter.go(`/jeuImages2/${id}`);
        }
        else if(imagesUtilisees.findOne({$and: [{idJ1: Meteor.userId()}, {J1termine: false}]})){
            //console.log("2");
            let id = imagesUtilisees.findOne({idJ1: Meteor.userId()})._id;
            FlowRouter.go(`/jeuImages/${id}`);
        }
        else if(imagesUtilisees.findOne({$and: [{idJ1: {$not: Meteor.userId()}}, {J1termine: true}, {idJ2: ""}]})){
            //console.log("3");
            let id = imagesUtilisees.findOne({idJ2: ""})._id;
            Meteor.call('ajouterJoueur2', id);
            FlowRouter.go(`/jeuImages2/${id}`);
        }
        else{
            //console.log("4");
            let id = Random.id();
            Meteor.call('creerImagesUtilisees', id);
            FlowRouter.go(`/jeuImages/${id}`);
        }
        
        
        
    }
}); 