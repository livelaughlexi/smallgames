import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const imagesUtilisees = new Mongo.Collection('imagesUtilisees');

Meteor.methods({
    'creerImagesUtilisees'(id){
        check(id, String);
        
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.insert({_id: id, idJ1: Meteor.userId(), idJ2: "", image0: "", image1: "", image2: "", mot: ""});
    },
    'insererImagesChoisies'(imgSel0, imgSel1, imgSel2, motSel){
        check(imgSel0, String);
        check(imgSel1, String);
        check(imgSel2, String);
        check(motSel, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({idJ1: Meteor.userId()}, {$set:{image0: imgSel0, image1: imgSel1, image2: imgSel2, mot: motSel}});
        //Que pour le prototype, à enlever dès que JeuImages1 et 2 ne sont plus dépendants
        imagesUtilisees.update({idJ1: Meteor.userId()}, {$set:{idJ2: Meteor.userId()}}); 
    },
    'removeBase'(id){
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.remove({_id: id});
    },
});

