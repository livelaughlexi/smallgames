import { Meteor } from 'meteor/meteor';
import { SourceImage } from '../imports/api/sourceImages.js';


Meteor.startup(() => {
  // code to run on server at startup
  if(SourceImage.find().count() === 0)
  {
    SourceImage.insert({ source:'moto.jpg', nom:'moto'});
  }
});
