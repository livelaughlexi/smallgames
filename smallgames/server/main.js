import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../imports/api/sourceImages.js';


Meteor.startup(() => {
  // code to run on server at startup
  if (SourceImage.find().count() === 0) {
        SourceImage.insert({source:'/jeuImages/aides/argent.jpg', nom:'argent', type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/armee.jpg', nom:'armee' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/bois.jpg', nom:'bois' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/cafe.jpg', nom:'cafe' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/carte.jpg', nom:'carte' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/eau.jpg', nom:'eau' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/eclair.jpg', nom:'eclair' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/pomme.jpg', nom:'pomme' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/aides/tempeteMer.jpg', nom:'tempeteMer' , type:'aide'});
        SourceImage.insert({source:'/jeuImages/aides/unil.jpg', nom:'unil' , type:'aide' });
        SourceImage.insert({source:'/jeuImages/reponses/moto.jpg', nom:'moto' , type:'reponse' });
        SourceImage.insert({source:'/jeuImages/reponses/hockey.jpg', nom:'hockey' , type:'reponse'});
  }
});
