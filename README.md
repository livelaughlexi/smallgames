# 🎮 smallgames v1.0

Projet réalisé par Sébastien Franzone, André Santiago, Marie Fasel et Lennox Fretz dans le cadre du cours _Programmation pour Internet II - Meteor.js_, donné par Loïc Cattani et Loris Rimaz.

Université de Lausanne - Faculté de Lettres - Section des sciences du langage et de l'information - Semestre de printemps 2022

## Description

Le projet smallgames a pour but de proposer une plateforme de mini-jeux en ligne, permettent des rapides sessions de jeu en solo ou entre amis. Le public ciblé est vaste, le projet s'adressant à toutes les personnes qui souhaitent faire des mini-jeux dès qu'ils ont un moment de libre. Le classement permet de fidéliser les joueurs et les encourage à revenir perfectionner leurs scores. 

### picture it
Un jeu coopératif à deux joueurs. Le premier joueur a un mot et 9 images proposés devant lui. Il doit en choisir 3 qui vont être envoyées à son partenaire dans le but qu'il devine le mot. Le deuxième joueur a devant lui les trois images choisies par son partenaire, ainsi que 9 propositions de mots. Le joueur a 3 tentatives pour trouver le bon mot. S'il le souhaite, il peut utiliser un poweup, qui lui permet de révéler 3 mauvaises réponses, moyennant une déduction de 25 points au score final.

### block destroyer
Le classique réinventé! En utilisant sa souris ou son trackpad, le joueur déplace le paddle et fait rebondir une balle. L'objectif: détruire tous les blocs! Attention, la balle accélère à chaque fois qu'elle touche le paddle. De temps à autre, des petits cœurs apparaissent à la destruction d'un bloc. Ceux-ci vous permettent de récupérer des vies!

### Classement
Un classement est établi par jeu, et un classement général est aussi maintenu. Ceci permet aux utilisateurs de se comparer entre eux, et aussi de se comparer à tous les autres utilisateurs. 

## Interface

_À faire avec images_

## Base de donées

_À faire_

## License
Ce programme est un logiciel gratuit.

smallgames a été développé avec le framework de développement web en Javascript _Meteor_ dans sa version 2.7.2 [meteor.com](https://meteor.com)

Les principaux modules Meteor utilisés dans ce projet sont:
- Blaze Layout (Render des templates)
- reactiveVar (variables réactives)
- FlowRouter (Gestion des URL)
- Accounts-base & Accounts-password (Gestion des comptes utilisateurs)
- Sweetalert2 (Alertes pop-up stylisées)
- Kaboom (Développement du jeu block destroyer)

Certaines libraries et modules utilisés pour le développement sont parfois soumis à un copyright par leurs auteurs respectifs.

Copyright © 2022 - l'équipe de développement de _smallgames_ : Sébastian Franzone, André Santiago, Marie Fasel & Lennox Fretz