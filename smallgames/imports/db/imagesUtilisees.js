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
        imagesUtilisees.insert({_id: id, idJ1: Meteor.userId(), J1termine: false, idJ2: "", image0: "", image1: "", image2: "", mot: "", listeImages: null, listeMots: null});
    },
    'insererImagesChoisies'(imgSel0, imgSel1, imgSel2){
        check(imgSel0, String);
        check(imgSel1, String);
        check(imgSel2, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({idJ1: Meteor.userId()}, {$set:{J1termine: true, image0: imgSel0, image1: imgSel1, image2: imgSel2}});
    },
    'ajouterJoueur2'(id){
        check(id, String);
        imagesUtilisees.update({_id: id}, {$set:{idJ2: Meteor.userId()}});
    },
    'removeBase'(id){
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.remove({_id: id});
    },
    'ajouterListeImages'(listeImages){
        check(listeImages, Array);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({idJ1: Meteor.userId()}, {$set:{listeImages: listeImages}});
    },
    'ajouterMot'(mot){
        check(mot, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({idJ1: Meteor.userId()}, {$set:{mot: mot}});
    },
    'ajouterListeMots'(listeMots){
        check(listeMots, Array);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({idJ1: Meteor.userId()}, {$set:{listeMots: listeMots}});
    }
});
 
