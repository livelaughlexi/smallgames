import { Template } from "meteor/templating";
import { SourceImage } from "../../../../api/sourceImages";
import { imagesUtilisees } from "../../../../api/imagesUtilisees";

import "./afficherMot2.html";

let listeMots = [];
Template.afficherMot2.helpers({
    listeMots(){
        listeMots = []; //pour reset la liste
        let motADeviner = imagesUtilisees.findOne({}).mot; //A changer avec l'id des joueurs plus tard
        let nombresRandom = [];
        /* const nombreMots = SourceImage.find({type: "reponse"}).count();
        console.log("nombre mots c'est: " + nombreMots);  */
        for(let i = 0; i < 8; i++)
        {
            let random = Math.floor(Math.random()*10);   //prendre des images aléatoires //changer le 10 en l'ensemble des mots (avec .count)
            /* let random = Math.floor(Math.random()*nombreMots);
            console.log("here"); */

            if(nombresRandom.includes(random)){
                i--;
            }
            else if(SourceImage.findOne({type: "reponse"}, {skip: random}).mot == motADeviner)
            {
                i--;
            }
            else{
                let motAleatoire = SourceImage.findOne({type: "reponse"}, {skip: random}).mot
                if(motAleatoire == motADeviner){
                    i--;
                }
                else{
                    nombresRandom.push(random);
                    listeMots.push(SourceImage.findOne({type: "reponse"}, {skip: random}).nom); //prend uniquement les mots de type reponse
                }
            }
        }
        //ajouter MotADeviner dans la liste dans une place aléatoire
        let placeAleatoire = Math.floor(Math.random()*9);
        listeMots.slice(placeAleatoire, 0, motADeviner);
        
        return listeMots;
    }
});

let motSelectionne = false;
let reponseChoisie = 0;
Template.afficherMot2.events({
    "click .reponsesMots"(event) {
        const target = event.target;
        if(target.style.filter == "opacity(100%)" && !motSelectionne){
            target.style.filter = "opacity(50%)";   //séléctionner
            motSelectionne = true;
            reponseChoisie = (listeMots[target.id]);
        }
        else if(target.style.filter == "opacity(50%)"){
            target.style.filter = "opacity(100%)";  //désélectionner (si le nombre max d'images n'est pas atteint)
            motSelectionne = false;
            reponseChoisie = 0;         
        }
    },
    "click .confirmer"() {
        let motADeviner = imagesUtilisees.findOne({}).mot; //A changer avec l'id des joueurs plus tard

        //changer les window.alert
        if(reponseChoisie == 0)
        {
            window.alert("Vous n'avez pas choisi de mot");
        }
        else if (reponseChoisie == motADeviner)
        {
            window.alert("Vous avez trouvé la bonne réponse");
            //trouver score à attribuer
        }
        else{
            window.alert("Vous etes nul!!!");
        }
    }
});