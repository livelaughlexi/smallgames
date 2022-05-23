import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const partiesFinies = new Mongo.Collection('partiesFinies');

Meteor.methods({
    'deleteDB'(id){
        check(id, String);
        if (!this.userId){
            throw new Meteor.Error('Not authorized.');
        }
        partiesFinies.remove({_id: id});
    }
})