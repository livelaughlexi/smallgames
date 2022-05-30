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
        imagesUtilisees.insert({_id: id, idJ1: Meteor.userId(), J1termine: false, idJ2: "", image0: "", image1: "", image2: "", mot: "", listeImages: null, listeMots: null, vies: 3, powerupUsed: false});
    },
    'insererImagesChoisies'(imgSel0, imgSel1, imgSel2, id){
        check(imgSel0, String);
        check(imgSel1, String);
        check(imgSel2, String);
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({_id: id}, {$set:{J1termine: true, image0: imgSel0, image1: imgSel1, image2: imgSel2}});
    },
    'ajouterJoueur2'(id){
        check(id, String);
        imagesUtilisees.update({_id: id}, {$set:{idJ2: Meteor.userId()}});
    },
    'ajouterListeImages'(listeImages, id){
        check(listeImages, Array);
        check(id, String);
        if (!this.userId){ 
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({_id: id}, {$set:{listeImages: listeImages}});
    },
    'ajouterMot'(mot, id){
        check(mot, String);
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({_id: id}, {$set:{mot: mot}});
    },
    'ajouterListeMots'(listeMots, id){
        check(listeMots, Array);
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({_id: id}, {$set:{listeMots: listeMots}});
    },
    'perteVie'(id){
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        imagesUtilisees.update({_id: id},{$inc: {vies: -1}});
    },
    'motsErrones'(mot, id){
        check(mot, String);
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        let objetMot = imagesUtilisees.findOne({_id: id}).listeMots;
        for(let i = 0; i < objetMot.length; i++){
            if(objetMot[i].mot === mot){
                objetMot[i].motErrone = true;
                imagesUtilisees.update({_id: id}, {$set: {listeMots: objetMot}});
            }
        }
    },
    "utiliserPowerupChangerImages"(mot, id){
        check(mot, String);
        check(id, String);
        imagesUtilisees.update({_id:id},{$set:{powerupUsed: true}});

    }
});
 