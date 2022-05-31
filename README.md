# 🎮 smallgames v0.3.5

Projet réalisé par Sébastien Franzone, André Santiago, Marie Fasel et Lennox Fretz dans le cadre du cours _Programmation pour Internet II - Meteor.js_, donné par Loïc Cattani et Loris Rimaz.

Université de Lausanne - Faculté de Lettres - Section des sciences du langage et de l'information - Semestre de printemps 2022

## Description

Le projet smallgames a pour but de proposer une plateforme de mini-jeux en ligne, permettent des rapides sessions de jeu en solo ou entre amis. Le public ciblé est vaste, le projet s'adressant à toutes les personnes qui souhaitent faire des mini-jeux dès qu'ils ont un moment de libre. Le classement permet de fidéliser les joueurs et les encourage à revenir perfectionner leurs scores. 

### Picture it
Un jeu coopératif à deux joueurs. Le premier joueur a un mot et 9 images proposés devant lui. Il doit en choisir 3 qui vont être envoyées à son partenaire dans le but qu'il devine le mot. Le deuxième joueur a devant lui les trois images choisies par son partenaire, ainsi que 9 propositions de mots. Le joueur a 3 tentatives pour trouver le bon mot. S'il le souhaite, il peut utiliser un poweup, qui lui permet de révéler 3 mauvaises réponses, moyennant une déduction de 25 points au score final.

### Block destroyer
Le classique réinventé! En utilisant sa souris ou son trackpad, le joueur déplace le paddle et fait rebondir une balle. L'objectif: détruire tous les blocs! Attention, la balle accélère à chaque fois qu'elle touche le paddle. De temps à autre, des petits cœurs apparaissent à la destruction d'un bloc. Ceux-ci vous permettent de récupérer des vies!

### Classement
Un classement est établi par jeu, et un classement général est aussi maintenu. Ceci permet aux amis qui jouent ensemble de se comparer entre eux, et aussi de se comparer à tous les autres utilisateurs. 

## Interface

![Page d'accueil](/smallgames/public/images/readme/home.png)
La page d'accueil pour les utilisateurs non-connectés, qui leur présente le site et leur permet de se connecter ou de se créer un compte

---

![Page login](/smallgames/public/images/readme/login.png)
La page de connexion, qui permet de se connecter à son compte. Celle-ci est accompagnée de deux autres pages qui permettent respectivement de créer un compte et de récupérer son mot de passe si on venait à l'oublier.

---

![Page play](/smallgames/public/images/readme/play.png)
La page _play_, le cœur de l'application, qui accueille les joueurs connectés et leur permet d'accéder rapidement aux jeux et au classement

---

![Page de règles](/smallgames/public/images/readme/rules.png)
Cette page explique à l'utilisateur les règles du jeu Picture it. Une page similaire est disponible pour le jeu Block destroyer.

---

![Page Picture it - joueur 1](/smallgames/public/images/readme/pictureItPlayerOneNew.png)
L'interface pour le joueur 1 du jeu Picture it. En haut de l'écran, le joueur voit le mot qu'il doit faire deviner à son partenaire. Sur la gauche, les 9 images à choix dont il doit en sélectionner 3. Sur la droite, le bouton qui permet de confirmer son choix.

---

![Page Picture it - joueur 1](/smallgames/public/images/readme/pictureItPlayerTwoNew.png)
L'interface pour le joueur 2 du jeu Picture it. Sur la gauche, les 3 images choisies par son partenaire ainsi que les 9 propositions de mots. Sur la droite, le nombre de tentatives restantes, l'option d'utiliser un powerup, et le bouton pour confirmer son choix.

---

![Exemple de pop up](/smallgames/public/images/readme/popupNew.png)
Exemple de notification _pop-up_, ici pour demander à l'utilisateur de confirmer son choix des images.

---

![Page bloc Destroyer](/smallgames/public/images/readme/blockDestroyerNew.png)
L'interface pour le jeu Block destroyer. 

---

![Page classement](/smallgames/public/images/readme/leaderboard.png)
La page du classement, qui répertorie le classement général, ainsi que le classement par jeu

## Base de données

L'application contient 4 collections MongoDB:
- La collection _users_ est gérée par les modules de gestion des comptes
- Les collections _imagesUtilisees_, _source_ et _partiesFinies_ sont utilisées pour le jeu Picture it. 

## License
Ce programme est un logiciel gratuit.

smallgames a été développé avec le framework de développement web en Javascript _Meteor_ dans sa version 2.7.2. (Plus d'informations concernant Meteor et son installation sont disponibles sur [meteor.com](https://meteor.com))

Les principaux modules Meteor utilisés dans ce projet sont:
- Blaze Layout (Render des templates)
- reactiveVar (Variables réactives)
- FlowRouter (Gestion des URL)
- Accounts-base & Accounts-password (Gestion des comptes utilisateurs)
- Sweetalert2 (Alertes pop-up stylisées)
- Kaboom (Développement du jeu Block destroyer)

La police de caractères utilisées sur l'ensemble de l'app est **Gordita**, designée par Thomas Gillett.

Certaines libraries et modules utilisés pour le développement sont parfois soumis à un copyright par leurs auteurs respectifs.

Copyright © 2022 - l'équipe de développement de _smallgames_ : Sébastian Franzone, André Santiago, Marie Fasel & Lennox Fretz