import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../imports/db/sourceImages.js';
import { imagesUtilisees } from '../imports/db/imagesUtilisees.js';
import { partiesFinies } from '../imports/db/partiesFinies.js';
import '../imports/api/jeuImagesPublications';
import { check } from 'meteor/check';


// eslint-disable-next-line no-unused-vars
import './methods/ranking';
import './methods/accounts';
import './email/email';
import './publish/publish';

Meteor.startup(() => {
  // code to run on server at startup
  //if (SourceImage.find().count() === 0) {
        baseSourceImage.forEach(x => SourceImage.insert(x));
  //}
    //configuration de l'adresse mail pour envoyer des mails
    process.env.MAIL_URL = 'smtps://adrianfeuler@gmail.com:ceciEst1Test-PourMeteor@smtp.gmail.com:465/';
    //Accounts.emailTemplates.from = 'no-reply@smallgames.com'
  
});

Meteor.methods({
  'ajouterScoreImagesJeu'(idPartie, score){
    check(idPartie, String);
    check(score, Number);
    if (!this.userId){
      throw new Meteor.Error('Not authorized.');
    }
    let joueur1 = imagesUtilisees.findOne({_id: idPartie}).idJ1;
    let joueur2 = imagesUtilisees.findOne({_id: idPartie}).idJ2;
    Meteor.users.update({_id: joueur1}, {$inc: {'profile.generalScore': score}});
    Meteor.users.update({_id: joueur2}, {$inc: {'profile.generalScore': score}});
    Meteor.users.update({_id: joueur1}, {$inc: {'profile.imageScore': score}});
    Meteor.users.update({_id: joueur2}, {$inc: {'profile.imageScore': score}});
    let nomJ2 = Meteor.users.findOne({_id: joueur2}).username;
    partiesFinies.insert({idJ1: joueur1, score: score, nomJ2: nomJ2});
    imagesUtilisees.remove({_id: idPartie});
  }
});

Meteor.methods({
  'ajouterScorePong'(score){
    check(score, Number);
    /* if (!this.userId){
      throw new Meteor.Error('Not authorized.');
    } */
    let joueur = Meteor.userId();
    Meteor.users.update({_id: joueur}, {$inc: {'profile.generalScore': score}});
    Meteor.users.update({_id: joueur}, {$inc: {'profile.pongScore': score}});
  }
});


let baseSourceImage = [
  {
    "_id": "X8fHK53Qk9ipKkrE4",
    "source": "/jeuImages/aides/argent.jpg",
    "nom": "argent",
    "type": "aide"
  },
  {
    "_id": "24wj6FfQQZ4YhxH7p",
    "source": "/jeuImages/aides/armee.jpg",
    "nom": "armee",
    "type": "aide"
  },
  {
    "_id": "ah3sFnwnBwx2q8hrD",
    "source": "/jeuImages/aides/bois.jpg",
    "nom": "bois",
    "type": "aide"
  },
  {
    "_id": "hFrnqfmXxESa6a2By",
    "source": "/jeuImages/aides/cafe.jpg",
    "nom": "cafe",
    "type": "aide"
  },
  {
    "_id": "xZBg4aqkdNgBJeyoa",
    "source": "/jeuImages/aides/carte.jpg",
    "nom": "carte",
    "type": "aide"
  },
  {
    "_id": "sjH799m7Ay4L3xxMH",
    "source": "/jeuImages/aides/eau.jpg",
    "nom": "eau",
    "type": "aide"
  },
  {
    "_id": "xgFNHtSSa6nZGxBiF",
    "source": "/jeuImages/aides/eclair.jpg",
    "nom": "eclair",
    "type": "aide"
  },
  {
    "_id": "KJEhY8KX5WjRspnRc",
    "source": "/jeuImages/aides/pomme.jpg",
    "nom": "pomme",
    "type": "aide"
  },
  {
    "_id": "BAMLoi3XEdbS3E8HB",
    "source": "/jeuImages/aides/tempeteMer.jpg",
    "nom": "tempeteMer",
    "type": "aide"
  },
  {
    "_id": "fcsbZJZrM9wMApdSn",
    "source": "/jeuImages/aides/unil.jpg",
    "nom": "unil",
    "type": "aide"
  },
  {
    "_id": "7dp5gGjZAZYTrk8Er",
    "source": "/jeuImages/aides/2personnes.jpg",
    "nom": "2personnes",
    "type": "aide"
  },
  {
    "_id": "LeSMzNSmm3uPxQw8k",
    "source": "/jeuImages/aides/langage.jpg",
    "nom": "langage",
    "type": "aide"
  },
  {
    "_id": "Rgbg7dLKXQnRrDWg4",
    "source": "/jeuImages/aides/nuage.jpg",
    "nom": "nuage",
    "type": "aide"
  },
  {
    "_id": "zuwFtjQfxWaq3wkkh",
    "source": "/jeuImages/aides/fumee.jpg",
    "nom": "fumee",
    "type": "aide"
  },
  {
    "_id": "4tp2mqyrqTbfNmZC7",
    "source": "/jeuImages/aides/piste.jpg",
    "nom": "piste",
    "type": "aide"
  },
  {
    "_id": "HZoWG6MrFmvB7P6Kv",
    "source": "/jeuImages/aides/meuble.jpg",
    "nom": "meuble",
    "type": "aide"
  },
  {
    "_id": "3puKejy4Xok8SCfpp",
    "source": "/jeuImages/aides/tele.jpg",
    "nom": "tele",
    "type": "aide"
  },
  {
    "_id": "yRRz9zhGPSKdmNKHx",
    "source": "/jeuImages/aides/nourriture.jpg",
    "nom": "nourriture",
    "type": "aide"
  },
  {
    "_id": "TTARrh4kN2EYqQQeL",
    "source": "/jeuImages/aides/terre.jpg",
    "nom": "terre",
    "type": "aide"
  },
  {
    "_id": "xWELcLjxatxsyrks8",
    "source": "/jeuImages/aides/guerre.jpg",
    "nom": "guerre",
    "type": "aide"
  },
  {
    "_id": "uvQ28DNQDA5GnGBvA",
    "source": "/jeuImages/aides/casque.jpg",
    "nom": "casque",
    "type": "aide"
  },
  {
    "_id": "npssXCtr5wTnYQRWi",
    "source": "/jeuImages/aides/roue.jpg",
    "nom": "roue",
    "type": "aide"
  },
  {
    "_id": "NSu86kBE3j76znsav",
    "source": "/jeuImages/aides/java.JPG",
    "nom": "java",
    "type": "aide"
  },
  {
    "_id": "EJRpCmaYBkLGA33Aj",
    "source": "/jeuImages/aides/neige.jpg",
    "nom": "neige",
    "type": "aide"
  },
  {
    "_id": "8KtmEbGmJFezh9fP7",
    "source": "/jeuImages/aides/montagne.jpg",
    "nom": "montagne",
    "type": "aide"
  },
  {
    "_id": "YDmqscFBWgafGAuYg",
    "source": "/jeuImages/aides/baseball.jpg",
    "nom": "baseball",
    "type": "aide"
  },
  {
    "_id": "zwEk3Q7L5uX6vhLrm",
    "source": "/jeuImages/aides/rocher.jpg",
    "nom": "rocher",
    "type": "aide"
  },
  {
    "_id": "xDGwJoQxJk7Q5YiGm",
    "source": "/jeuImages/aides/ordinateur.jpg",
    "nom": "ordinateur",
    "type": "aide"
  },
  {
    "_id": "HvprJ7A2ou4k6bECr",
    "source": "/jeuImages/aides/baskets.jpg",
    "nom": "baskets",
    "type": "aide"
  },
  {
    "_id": "nGgQCK8ksaAgCbG8B",
    "source": "/jeuImages/aides/savanne.jpg",
    "nom": "savanne",
    "type": "aide"
  },
  {
    "_id": "7kXAfxAWpWELMMeg4",
    "source": "/jeuImages/aides/prairie.jpg",
    "nom": "prairie",
    "type": "aide"
  },
  {
    "_id": "o2PycN2d9qayH3Hr4",
    "source": "/jeuImages/aides/baguette.jpg",
    "nom": "baguette",
    "type": "aide"
  },
  {
    "_id": "ufy7MygE55p3mMqwR",
    "source": "/jeuImages/aides/etoiles.jpg",
    "nom": "etoiles",
    "type": "aide"
  },
  {
    "_id": "CL6Q5zQXyv7gWtzwh",
    "source": "/jeuImages/aides/musique.jpg",
    "nom": "musique",
    "type": "aide"
  },
  {
    "_id": "QqEu5nqqzBPKXZPgb",
    "source": "/jeuImages/aides/fusee.jpg",
    "nom": "fusee",
    "type": "aide"
  },
  {
    "_id": "wz4FsqAdPJ2EdrjPv",
    "source": "/jeuImages/aides/bras.jpg",
    "nom": "bras",
    "type": "aide"
  },
  {
    "_id": "nXW4S7jitY9GCNs4u",
    "source": "/jeuImages/aides/chateau.jpg",
    "nom": "chateau",
    "type": "aide"
  },
  {
    "_id": "ZvSYZoj6YgwnmjBXu",
    "source": "/jeuImages/aides/tour.jpg",
    "nom": "tour",
    "type": "aide"
  },
  {
    "_id": "LTkf4pZRqZRrwBxMy",
    "source": "/jeuImages/aides/glace.jpg",
    "nom": "glace",
    "type": "aide"
  },
  {
    "_id": "YcFfmCChhjiM5vWGf",
    "source": "/jeuImages/aides/extincteur.jpg",
    "nom": "extincteur",
    "type": "aide"
  },
  {
    "_id": "XSrWeYhk9FSozpphg",
    "source": "/jeuImages/aides/route.jpg",
    "nom": "route",
    "type": "aide"
  },
  {
    "_id": "FXjQXkeyt6q82A9Bu",
    "source": "/jeuImages/aides/trophe.jpg",
    "nom": "trophe",
    "type": "aide"
  },
  {
    "_id": "RrYtYR6yf5gX448Yj",
    "source": "/jeuImages/aides/lapin.jpg",
    "nom": "lapin",
    "type": "aide"
  },
  {
    "_id": "7bxdXwJjWtdrJ6iYB",
    "source": "/jeuImages/aides/planete.jpg",
    "nom": "planete",
    "type": "aide"
  },
  {
    "_id": "zeAPH8xpLRho3KsPQ",
    "source": "/jeuImages/aides/auditoire.jpg",
    "nom": "auditoire",
    "type": "aide"
  },
  {
    "_id": "J6D4PCLWgpQz6XvmA",
    "source": "/jeuImages/aides/mouton.jpg",
    "nom": "mouton",
    "type": "aide"
  },
  {
    "_id": "ZT63BCh2xkBA22For",
    "source": "/jeuImages/aides/basketball.jpg",
    "nom": "basketball",
    "type": "aide"
  },
  {
    "_id": "99MGEpkvrQYhtmHZo",
    "source": "/jeuImages/aides/securite.jpg",
    "nom": "securite",
    "type": "aide"
  },
  {
    "_id": "HdYf8agG2DTQbh4hH",
    "source": "/jeuImages/aides/oiseau.jpg",
    "nom": "oiseau",
    "type": "aide"
  },
  {
    "_id": "Km82gmfN7uYMGWZTB",
    "source": "/jeuImages/aides/fleurs.jpg",
    "nom": "fleurs",
    "type": "aide"
  },
  {
    "_id": "bAynZSgiiZcAddxcG",
    "source": "/jeuImages/reponses/moto.jpg",
    "nom": "moto",
    "type": "reponse",
    "image1": "route",
    "image2": "casque",
    "image3": "fumee"
  },
  {
    "_id": "w44RonFSXNK8bs8Cc",
    "source": "/jeuImages/reponses/avion.jpg",
    "nom": "avion",
    "type": "reponse",
    "image1": "nuage",
    "image2": "guerre",
    "image3": "etoiles"
  },
  {
    "_id": "2RBQYEAopxMPGYH4P",
    "source": "/jeuImages/reponses/colombe.jpg",
    "nom": "colombe",
    "type": "reponse",
    "image1": "guerre",
    "image2": "nuage",
    "image3": "oiseau"
  },
  {
    "_id": "xm23XzKL9hXLrT7bv",
    "source": "/jeuImages/reponses/danse.jpg",
    "nom": "danse",
    "type": "reponse",
    "image1": "musique",
    "image2": "etoiles",
    "image3": "fleurs"
  },
  {
    "_id": "wrryr5vwX3WJaAA7w",
    "source": "/jeuImages/reponses/football.jpg",
    "nom": "football",
    "type": "reponse",
    "image1": "basketball",
    "image2": "baskets",
    "image3": "baseball"
  },
  {
    "_id": "2vGF5f2Ln52NEPrSb",
    "source": "/jeuImages/reponses/etudiant.jpg",
    "nom": "étudiant",
    "type": "reponse",
    "image1": "unil",
    "image2": "langage",
    "image3": "auditoire"
  },
  {
    "_id": "tRBvMmYsfBkL6Hh2R",
    "source": "/jeuImages/reponses/golf.jpg",
    "nom": "golf",
    "type": "reponse",
    "image1": "prairie",
    "image2": "baseball",
    "image3": "argent"
  },
  {
    "_id": "jygyYgAD8xGkdkvb7",
    "source": "/jeuImages/reponses/ski.jpg",
    "nom": "ski",
    "type": "reponse",
    "image1": "neige",
    "image2": "montagne",
    "image3": "argent"
  },
  {
    "_id": "jsBsZ95kZ3Kcns96P",
    "source": "/jeuImages/reponses/appartement.jpg",
    "nom": "appartement",
    "type": "reponse",
    "image1": "meuble",
    "image2": "tele",
    "image3": "ordinateur"
  },
  {
    "_id": "qSK7bRFqAq4BrK293",
    "source": "/jeuImages/reponses/carotte.jpg",
    "nom": "carotte",
    "type": "reponse",
    "image1": "nourriture",
    "image2": "terre",
    "image3": "lapin"
  },
  {
    "_id": "34s2Psd8niawyew8r",
    "source": "/jeuImages/reponses/conversation.jpg",
    "nom": "conversation",
    "type": "reponse",
    "image1": "2personnes",
    "image2": "langage",
    "image3": "unil"
  },
  {
    "_id": "gvG6QYKvDorYriZrt",
    "source": "/jeuImages/reponses/course.jpg",
    "nom": "course",
    "type": "reponse",
    "image1": "piste",
    "image2": "baskets",
    "image3": "trophe"
  },
  {
    "_id": "raRMumCs7ZxeSpocy",
    "source": "/jeuImages/reponses/feu.jpg",
    "nom": "feu",
    "type": "reponse",
    "image1": "bois",
    "image2": "fumee",
    "image3": "extincteur"
  },
  {
    "_id": "Pdt7r5C62uYZ8gvDm",
    "source": "/jeuImages/reponses/tempete.jpg",
    "nom": "tempete",
    "type": "reponse",
    "image1": "nuage",
    "image2": "tempeteMer",
    "image3": "eclair"
  }
];
