import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../db/sourceImages';
import { imagesUtilisees } from '../db/imagesUtilisees';
import { partiesFinies } from '../db/partiesFinies';

Meteor.publish('sourceJeuImages', function publishSourceJeuImages(){
    return SourceImage.find({type: "aide"});
});

Meteor.publish('imagesUtiliseesDB', function imagesUtiliseesDB(){       //a supprimer à la fin (que pour le prototype de afficherImage)
    return imagesUtilisees.find({});
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

Meteor.publish('partiesLancees', function(){
    //return imagesUtilisees.find({},{fields: {_id: 1, idJ1: 1, idJ2: 1, J1termine: 1}});
    return imagesUtilisees.find({});
});

Meteor.publish('sourceImages', function(){
    return SourceImage.find({});                    //pour le développement
});

Meteor.publish('partiesFinies', function(){
    return partiesFinies.find({});
})
