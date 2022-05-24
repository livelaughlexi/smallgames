import { Accounts } from 'meteor/accounts-base';

//normalement : envoi automatique d'un email à la création du compte
Accounts.config({
    sendVerificationEmail: true,
  });
  
  //personnaliser l'email de vérification d'adresse email
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return "[Smallgames] Vérifiez votre adresse email";
    },
    text(user, url) {
      let emailAddress = user.emails[0].address,
          urlWithoutHash = url.replace('#/', ''),
          emailBody = `Pour vérifier votre adresse email (${emailAddress}) cliquez sur ce lien:\n\n${urlWithoutHash}\n\n.`;
  
      return emailBody;
    }
  }
  //personnaliser l'email de reset de mot de passe
  Accounts.emailTemplates.resetPassword = {
    subject() {
      return "[Smallgames] Réinitialisez votre mot de passe";
    },
    text(user, url) {
      let emailAddress = user.emails[0].address,
          urlWithoutHash = url.replace('#/', ''),
          emailBody = `Pour réinitialiser le mot de passe du compte smallgames appartenant à (${emailAddress}) cliquez sur ce lien:\n\n${urlWithoutHash}\n\n.`;
  
      return emailBody;
    }
  }