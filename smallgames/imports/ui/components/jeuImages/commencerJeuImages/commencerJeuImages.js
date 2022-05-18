import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Random } from 'meteor/random';
import Swal from 'sweetalert2';

import './commencerJeuImages.html';
import { imagesUtilisees } from '../../../../db/imagesUtilisees';
import { SourceImage } from '../../../../db/sourceImages';


Template.commencerJeuImages.onCreated(function(){
    this.subscribe('partiesLancees');
    this.subscribe('sourceJeuImages');
    this.subscribe('motsJeuImages'); 
});

Template.commencerJeuImages.events({
    "click .game"(){
        Swal.fire({
            title: 'Bienvenu sur le jeu des images!',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "règles",
            denyButtonText: "scoreboard",
            cancelButtonText: "Jouer!",
        }).then((result) => {
            if(result.isConfirmed){
                //afficher règles
            }
            else if (result.isDenied){
                //afficher scoreboard
            }
            else if (result.isDismissed){
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
                    let nombreMots = SourceImage.find({type: "reponse"}).count();
        
                    let random = Math.floor(Math.random() * nombreMots);    
                    let mot = SourceImage.findOne({type: "reponse"}, {skip: random})?.nom;
                    Meteor.call('ajouterMot', mot, id);
        
                    let listeImagesAide = [];
                    let listeRandomId = [];
                    let nombreImages = SourceImage.find({type: "aide"}).count();
                    if (nombreImages >= 9) {
                        let imageReponseRandom = Math.ceil(Math.random()*3);
                        let nomImageReponse = "";
                        if(imageReponseRandom == 1)
                        {
                            nomImageReponse = SourceImage.findOne({nom: mot})?.image1; 
                        }
                        else if(imageReponseRandom == 2)
                        {
                            nomImageReponse = SourceImage.findOne({nom: mot})?.image2; 
                        }
                        else if(imageReponseRandom == 3)
                        {
                            nomImageReponse = SourceImage.findOne({nom: mot})?.image3; 
                        }
                        listeImagesAide.push(SourceImage.findOne({nom: nomImageReponse})?.source);
                        listeRandomId.push(SourceImage.findOne({nom: nomImageReponse})?._id);
                        for(let i = 0; i < 8; i++)
                        {  
                            let random = Math.floor(Math.random()*nombreImages);
                            let randomId = SourceImage.findOne({type: "aide"}, {skip: random})._id;
                
                            if(listeRandomId?.includes(randomId)){
                                i--;
                            }
                            else{
                                listeRandomId.push(randomId);
                                listeImagesAide.push(SourceImage.findOne({_id: randomId}).source); //prend uniquement les images de type aide
                            }
                        }
                    }
                    //shuffle la liste:
                    shuffle(listeImagesAide);  
                    Meteor.call('ajouterListeImages', listeImagesAide, id);
        
                    let listeMots = []; //pour reset la liste
                    let nombresRandom = [];
                    if(nombreMots >= 8) {
                        for(let i = 0; i < 8; i++)
                        {
                            let random = Math.floor(Math.random()*nombreMots);
                            let motAleatoire = SourceImage.findOne({type: "reponse"}, {skip: random}).nom;
        
                            if(nombresRandom.includes(random)){
                                i--;
                            }
                            else if(motAleatoire === mot)
                            {
                                i--;
                            }
                            else{
                                    nombresRandom.push(random);
                                    listeMots.push(SourceImage.findOne({type: "reponse"}, {skip: random}).nom); //prend uniquement les mots de type reponse
                            }
                        }
                        //ajouter MotADeviner dans la liste dans une place aléatoire
                        let placeAleatoire = Math.floor(Math.random()*9);
                        listeMots.splice(placeAleatoire, 0, mot);
                    }
                    Meteor.call('ajouterListeMots', listeMots, id);
                
                
                    FlowRouter.go(`/jeuImages/${id}`);
                }
            }
        });
        
        
        
    }
}); 


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }