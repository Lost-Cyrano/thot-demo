# THOT — Instructions de la démonstration

## 1. Démarrer la démo

- **Ouverture directe (recommandée pour une présentation hors ligne)** : extraire l'archive puis double-cliquer sur `index.html`. Aucun serveur ni installation n'est nécessaire.
- **GitHub Pages ou serveur web** : publier le contenu du dossier `thot-main` en conservant la structure des dossiers et des fichiers.
- Utiliser un navigateur récent. La génération de QR code peut nécessiter une connexion Internet pour charger sa bibliothèque externe.

## 2. Connexion et choix du profil

La page d'accueil présente un champ d'identifiant facultatif et un petit interrupteur à bascule. Le curseur rouge sélectionne le profil **Administrateur** ; le curseur gris sélectionne le profil **Utilisateur**. Cliquez sur le curseur pour changer de profil, saisissez éventuellement une valeur quelconque, puis cliquez sur le bouton de connexion. Aucun identifiant ni mot de passe n'est vérifié. Le parcours s'inspire du NIVOL de la Croix-Rouge française uniquement à titre d'exemple : une version de production de THOT peut utiliser la méthode choisie par le client.

## 3. Stockage et limites de la démo

Les données sont fictives et enregistrées sous forme de JSON dans le stockage temporaire de l'onglet : `sessionStorage` sur un site publié, ou `window.name` comme solution de compatibilité lorsque le fichier est ouvert directement en `file://`. Elles restent disponibles pendant la session de l'onglet, y compris après un rechargement, mais ne sont pas envoyées à un serveur, synchronisées entre appareils ou partagées avec d'autres utilisateurs. Elles ne constituent pas une sauvegarde : fermer l'onglet ou la session peut les effacer. Il n'existe aucun mécanisme de récupération. Ne saisissez aucune donnée réelle ou sensible.

Chaque nouvel onglet/session peut repartir du jeu de données initial. Pour réinitialiser, fermez l'onglet de la démo et ouvrez `index.html` à nouveau. Si le navigateur conserve la session, effacez les données de session du site depuis ses outils de développement, puis rechargez la page.

## 4. Espace administrateur

### Tableau de bord
La page d'administration regroupe des alertes sur les inventaires et les dates de péremption, les objets manquants, les incidents et alertes automobiles, le parc automobile, ainsi que la gestion des profils administrateur et bénévole. Utilisez les cartes, boutons et liens de chaque section pour ouvrir les éléments concernés.

### Inventaires
La liste présente les inventaires de démonstration. Ouvrez un inventaire pour consulter son contenu ; les noms d'inventaires peuvent être modifiés et des inventaires peuvent être créés ou supprimés depuis l'administration des inventaires.

Un inventaire est organisé en catégories, puis éventuellement en sous-catégories et sous-parties. Les éléments ont une quantité et peuvent avoir une date de péremption. Dans l'administration, utilisez les actions de création, de modification, de renommage et de suppression disponibles dans chaque vue. La démo contient des exemples de consommables médicaux, d'équipements de bilan, de matériel de brancardage et de sécurité.

### Dates de péremption
Les dates permettent de montrer les différents états visuels de péremption (périmé, proche de la péremption et valide selon les seuils appliqués par l'interface). Modifiez une date pour observer l'actualisation des alertes. Les dates du jeu initial sont générées relativement au jour où la démo est initialisée ; elles sont fictives et ne doivent pas servir à une décision opérationnelle.

### Parc automobile
La section parc automobile présente un véhicule de secours fictif, son kilométrage, les échéances d'assurance et de contrôle, les rendez-vous/entretiens planifiés et un incident déclaré. Selon la page ouverte, vous pouvez consulter les informations, mettre à jour le kilométrage, enregistrer un entretien, renseigner les opérations de nettoyage ou désinfection et signaler un incident. Les types d'incidents disponibles sont ceux proposés par le formulaire de l'application.

### Comptes de démonstration
Les listes d'administrateurs et de bénévoles servent à illustrer les écrans de gestion des profils. Il ne s'agit pas de comptes réels et aucune connexion sécurisée n'est effectuée.

## 5. Espace utilisateur

L'espace utilisateur propose un accès simplifié aux inventaires et au parc automobile. Ouvrez un inventaire depuis la liste pour consulter son contenu et réaliser les actions proposées par l'interface. Dans les vues d'inventaire, vous pouvez parcourir les catégories et sous-catégories, voir les quantités et les dates, et utiliser les commandes disponibles pour signaler un état ou un matériel manquant/retrouvé.

Les pages de suivi d'utilisation permettent également de sélectionner des inventaires et d'enregistrer du matériel utilisé, afin de démontrer le parcours de réarmement d'un sac ou d'un lot.

## 6. Finaliser et suivre un inventaire

1. Ouvrez un inventaire depuis la liste.
2. Parcourez chaque catégorie et sous-catégorie.
3. Comparez le matériel affiché avec le contenu fictif.
4. Utilisez les cases et actions disponibles pour marquer les vérifications, indiquer un objet absent ou le retrouver.
5. Lorsque la vérification est terminée, utilisez **Finaliser l'inventaire** si cette action est disponible.
6. Revenez au tableau de bord pour voir l'effet des changements sur les alertes et les éléments manquants.

## 7. QR codes

Les pages QR code illustrent l'accès rapide aux éléments concernés. La génération du QR code s'appuie sur une bibliothèque chargée depuis un CDN externe ; en ouverture directe et sans Internet, cette partie peut ne pas être disponible. Les autres pages et données locales n'ont pas besoin de ce service.

## 8. Dépannage

- **Page blanche ou boutons inactifs** : vérifiez que l'archive a été entièrement extraite et que `local-store.js` se trouve à côté de `index.html`, avec les autres dossiers conservés.
- **Images absentes sur GitHub Pages** : vérifiez que le dossier `images/` et les deux fichiers de logo sont publiés avec la même casse que dans l'archive. Publiez le contenu du dossier `thot-main`, pas un dossier parent vide.
- **Données qui reviennent à leur état initial** : c'est le comportement attendu lorsque la session de navigateur est terminée ou que le stockage de session est effacé.
- **QR code indisponible hors ligne** : cette fonction dépend d'une bibliothèque externe ; ouvrez la page avec Internet pour la charger.
- **Ne pas utiliser en production** : cette édition n'a ni authentification réelle, ni sauvegarde, ni synchronisation, ni stockage durable. Elle est exclusivement destinée à la démonstration.
