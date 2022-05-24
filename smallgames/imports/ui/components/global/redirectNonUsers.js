import { Template } from 'meteor/templating';
import './redirectNonUsers.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { imagesUtilisees } from '../../../db/imagesUtilisees';

/* Template.redirectNonUsers.onRendered(function(){
    this.subscribe('imagesUtiliseesDB');
    this.autorun(() => {
            let currentId = FlowRouter.getParam('_id');
            console.log(currentId);
            let listeParties = imagesUtilisees.findOne({_id: currentId});
            console.log(listeParties);
            if(!listeParties){
                FlowRouter.go('/play');
            }
    })
}); */