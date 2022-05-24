import { Template } from 'meteor/templating';
import './redirectNonUsers.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { imagesUtilisees } from '../../../db/imagesUtilisees';

Template.redirectNonUsers.onCreated(function(){
    this.subscribe('imagesUtiliseesDB');
    this.autorun(() => {
            let currentId = FlowRouter.getParam('_id');
            let listeParties = imagesUtilisees.findOne({_id: currentId});
            if(!listeParties){
                FlowRouter.go('/play');
            }
    })
});