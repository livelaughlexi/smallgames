import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../db/sourceImages';
import { imagesUtilisees } from '../db/imagesUtilisees';

Meteor.publish('sourceJeuImages', function publishSourceJeuImages(){
    return SourceImage.find({type: "aide"});
});

Meteor.publish('imagesUtiliseesDB', function imagesUtiliseesDB(){       //a supprimer à la fin (que pour le prototype de afficherImage)
    return imagesUtilisees.find({idJ1: Meteor.userId()});
});

Meteor.publish('motsJeuImages', function(){
    return SourceImage.find({type: "reponse"});
});

Meteor.publish('idPartie', function(){
    return imagesUtilisees.find({idJ1: Meteor.userId()});
}); 

Meteor.publish('imagesUtilisees', function imagesUtiliseesDB(){
    return imagesUtilisees.find({idJ2: Meteor.userId()}, {fields: {idJ1: 0, idJ2: 0}});
});