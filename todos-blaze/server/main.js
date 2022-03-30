import { Meteor } from 'meteor/meteor';
import { imagesCollection } from '../imports/api/imagesCollection';

const insertImage = sourceImage => imagesCollection.insert({ txt : sourceImage });
 
Meteor.startup(() => {
  if (imagesCollection.find().count() === 0) {
    [
      '../../images/pictionary/moto.jpg'
    ].forEach(insertImage)
  }
});
