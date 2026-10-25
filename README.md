# Thot — Maquette de démonstration

> **Tous droits réservés.** Aucune licence n'est accordée pour l'utilisation, la modification ou la distribution de ce code.
> Merci !

---

## À propos

**Thot** est une application de gestion d'inventaires pensée pour les structures de secours et d'intervention : ambulanciers, sapeurs-pompiers, associations de protection civile, etc.

Cette version est une **maquette de démonstration** de l'application Thot. Elle s'appuie sur la solution que nous proposons aujourd'hui à la **Croix-Rouge française** et en reproduit les parcours et fonctionnalités principales, mais **sans aucun serveur, sans base de données distante et sans authentification réelle**. Toutes les données sont fictives et stockées localement dans le navigateur.

### Vous souhaitez utiliser cette solution ?

Si cette application vous intéresse pour votre structure (association, entreprise, service de secours, SDIS, collectivité…), vous pouvez **me contacter** ;)

---

## Ce que contient cette démonstration

La maquette reproduit fidèlement le fonctionnement de l'application réelle, à une différence près : **aucune donnée ne quitte votre navigateur**. Tout est enregistré dans le `localStorage`, ce qui permet de tester librement toutes les fonctionnalités, sans risque et sans compte.

**Important :**
- Les données sont **fictives** et **propres à cet appareil et à ce navigateur**.
- Effacer les données du site (ou cliquer sur « Réinitialiser la démonstration » sur la page de connexion) restaure le jeu de données d'exemple.
- Le parcours de connexion s'inspire de la méthode NIVOL utilisée à la Croix-Rouge française, mais il ne s'agit que d'une **illustration**. Dans une version client, Thot peut s'adapter à la méthode d'authentification choisie par l'organisation (compte Google, identifiant/mot de passe, matricule, téléphone, etc...).
- Aucun NIVOL réel n'est vérifié. **N'importe quelle saisie permet de continuer.**

---

## Démarrage rapide

1. Rendez-vous sur [ce lien github pages](https://lost-cyrano.github.io/thot-demo/)
3. Sur la page de connexion :
   - Saisissez n'importe quoi dans le champ NIVOL (ou laissez vide).
   - Choisissez votre espace via le **switcher** en bas du formulaire : **Utilisateur** (par défaut) ou **Administrateur**.
   - Cliquez sur **Continuer**.
4. Vous êtes redirigé vers le menu principale des utilisateurs ou des administrateurs selon votre choix.

Pour recommencer à zéro : cliquez sur **« Réinitialiser la démonstration »** en bas de la page de connexion.

---

## Fonctionnalités détaillées

### 1. Page de connexion

C'est le point d'entrée de la démonstration. Elle permet de :

- **Charger la base de démonstration** dans le navigateur, la première fois.
- **Choisir le rôle** avec lequel vous souhaitez explorer l'application :
  - **Utilisateur**
  - **Administrateur**
- **Réinitialiser la démo** : efface les données locales et recharge le jeu d'exemple.
- Afficher le **texte d'explication** de la version de démonstration.

> Aucune vérification de NIVOL n'est effectuée. Le champ est purement indicatif.

### 2. Espace bénévole

Vue simplifiée destinée aux utilisateurs terrain.

- **Bandeau d'identité** : nom et NIVOL de l'utilisateur courant.
- **Liste des inventaires** : tous les inventaires disponibles, avec leur dernière date de vérification.
- **Liste du parc automobile** : tous les véhicules, avec la dernière désinfection totale connue.
- **Bouton « Faire des vérifications »** : ouvre la liste des inventaires pour réaliser un inventaire.
- **Bouton « Déconnexion »** : retour à la page de connexion (les données restent).
- **Pagination** : « Afficher plus » permet de voir au-delà des premiers éléments.

### 3. Espace administrateur

Tableau de bord central pour les responsables.

- **Périmés** : tous les objets dont la date de péremption est dépassée ou proche (< 30 jours), tous inventaires confondus. Chaque ligne indique l'objet, sa catégorie, l'inventaire concerné et le nombre de jours restants.
- **Manquants** : tous les objets signalés comme manquants lors des inventaires. Un bouton **✅** permet de les marquer comme retrouvés (l'objet est retiré de la liste et une entrée est ajoutée aux logs de l'inventaire).
- **Inventaires** : liste de tous les inventaires avec leur dernière date de vérification. Un bouton **« Modifier les inventaires »** ouvre la gestion complète (voir § 5).
- **Incidents** : tous les incidents signalés sur les véhicules, triés par priorité (Haute → Basse). Chaque ligne renvoie au véhicule concerné.
- **Alertes Automobiles** : toutes les alertes liées aux véhicules (assurance, contrôle technique, nettoyage, désinfection, entretiens par date ou par kilométrage).
- **Parc Automobile** : liste des véhicules. Un bouton **« Gérer les véhicules »** ouvre la gestion complète (voir § 6).
- **Administrateurs** : gestion des comptes administrateurs, avec hiérarchie des rôles (`Owner` > `PUL` > `DLUS` > `MOT` > `Adjoint Urgence`). Ajout, édition et suppression selon vos droits.
     (NB : la hiérarchie est encore une fois basée sur les demandes de la CRF mais est modulable en fonction des besoins de chacun)
- **Bénévoles** : gestion des comptes utilisateurs. Ajout, édition et suppression.

### 4. Réalisation d'un inventaire

Accessible en cliquant sur un inventaire depuis un des 2 menus principaux.

- **Barre de progression** : nombre d'objets vérifiés sur le total, avec pourcentage.
- **Liste des catégories** avec compteur de vérification (ex. `3/5`). Une coche ✅ apparaît quand toute la catégorie est vérifiée.
- **Sous-catégories** repliables, avec leur propre compteur.
- **Cocher un objet** : cliquez sur la ligne pour la cocher (ou la décocher). L'état est sauvegardé immédiatement. (dans la vrai vertion, ceci ce fais en temps réel sur tout les appareils pour permettre sont utilisation par plusieurs personnes en meme temps)
- **Statuts de péremption** affichés sur chaque objet :
  - 🟢 **OK** : date valide.
  - 🟠 **Proche** : date sous 60 jours.
  - ⚠️ **PÉRIMÉ** : date dépassée.
- **Bouton « 📅 Nouvelle date »** sur les objets proches/périmés : permet de saisir une nouvelle date de péremption, enregistrée immédiatement.
- **Bouton « 🔍 Chercher objet manquant »** : fait défiler vers le premier objet non coché et le met en évidence. Cliquez plusieurs fois pour parcourir tous les objets manquants.
- **Bouton « ✅ Finaliser l'inventaire »** :
  - Affiche la liste des objets non vérifiés (qui seront marqués comme **manquants**).
  - Enregistre la date, l'auteur et la liste des manquants.
  - Réinitialise les coches pour un prochain inventaire.

### 5. Gestion des inventaires

Accessible uniquement aux adminsitrateurs depuis `admin.html` → **« Modifier les inventaires »**.

- **Sélecteur d'inventaire** en haut : choisir, renommer (✏️) ou supprimer (🗑️) un inventaire existant.
- **Bouton « + Créer »** : créer un nouvel inventaire avec un ID unique et un nom affiché.
- **Bouton « 📱 QR Code »** : génère un QR Code pour l'inventaire sélectionné.
- **Arborescence complète** de l'inventaire :
  - **Catégories** (ex. « Tiroir Bilan ») repliables, avec compteur d'objets.
  - **Sous-catégories** (ex. « Poche Avant » → « Pochette Rouge ») récursives.
  - **Objets** avec quantité, date de péremption (statut en couleur) et boutons de modification (✏️) / suppression (🗑️).
  - **Boutons + / −** pour ajuster rapidement les quantités.
  - **Bouton « + Ajouter un objet ou sous-catégorie »** dans chaque catégorie/sous-catégorie.
  - **Bouton « + Nouvelle catégorie »** en bas de page.
- **Historique** repliable en bas de page : toutes les actions effectuées sur l'inventaire (auteur, date, action).
- Les modifications sont **enregistrées immédiatement** dans la base de données.

### 6. Gestion du parc automobile

Accessible uniquement aux adminsitrateurs depuis `admin.html` → **« Gérer les véhicules »**.

- **Sélecteur de véhicule** : choisir, modifier (✏️) ou supprimer (🗑️) un véhicule existant.
- **Bouton « + Créer »** : ajouter un véhicule (immatriculation, nom, carburant, kilométrage, dates d'assurance et de contrôle technique).
- **Bouton « 📱 QR Code »** : génère un QR Code pour le véhicule.
- **Fiche véhicule** organisée en sections :
  - **Informations générales** : immatriculation, nom, carburant, kilométrage (modifiable), assurance et contrôle technique (avec statut coloré).
  - **Nettoyage & Désinfection** : fréquences configurées, dernière date de chaque opération, historique par type (rapide, complète, totale) et date de la prochaine intervention.
  - **Entretiens** : liste des entretiens programmés (vidange, pneus, freins, révision, etc.) avec récurrence en jours ou en kilomètres.
    - **✅ Valider** un entretien : le supprime et le reprogramme automatiquement à la prochaine échéance si une récurrence est définie.
    - **✏️ Modifier** ou **🗑️ Supprimer** un entretien.
  - **Incidents signalés** : liste des incidents avec priorité, description, date et auteur. Possibilité de les supprimer.
  - **Historique** repliable : les actions effectuées sur le véhicule.

### 7. Vue terrain du parc automobile (`parc-auto/index.html`)

Accessible depuis les menus principaux ou en cliquant sur un véhicule dans les listes.

- **Grille de véhicules** avec résumé (entretiens en cours, incidents signalés).
- **Fiche détaillée du véhicule** en lecture seule (informations générales, tableau de désinfection, entretiens, incidents, historique).
- **Boutons d'action terrain** :
  - **✏️ Kilométrage** : mettre à jour le kilométrage actuel (accessible à tous).
  - **🧽 Nettoyage** : enregistrer un nettoyage effectué (date + auteur).
  - **🧴 Désinfection** : enregistrer une désinfection en choisissant le type (Rapide / Complète / Totale).
  - **⚠️ Signaler** : déclarer un nouvel incident (titre, description, priorité).

### 8. Suivi de l'utilisation du matériel

Accessible via `utilisation/` (URL directe à partager à la mains).
Soit l'url : [https://.../utilisation/](https://lost-cyrano.github.io/thot-demo/utilisation/)

- **Filtre d'ajout** : sélectionner tout ou partie des inventaires à utiliser pour la recherche. Le filtre est mémorisé dans l'URL (`?inv=...`) et donc partageable facilement entre les utilisateurs.
- **Bouton « ➕ Ajouter du matériel utilisé »** :
  - **Recherche** plein texte par nom d'objet, de catégorie ou d'inventaire.
  - **Arborescence** complète avec catégories et sous-catégories repliables.
  - **Ajout au panier** : chaque objet ajouté peut être quantifié.
  - **Enregistrement** de l'utilisation (qui, quand, combien).
- **Bouton « 🔄 Réarmer les inventaires »** :
  - Affiche tous les objets actuellement marqués « utilisés ».
  - Permet de **cocher les objets effectivement réarmés** (réapprovisionnés).
  - Les objets non cochés sont **automatiquement marqués comme manquants** dans l'inventaire concerné.
  - Les utilisations sont ensuite effacées.

### 9. Génération de QR Codes

Chaque page génère un **QR Code rouge** (avec le logo Thot au centre) encodant l'URL directe vers l'élément ciblé :

- **Inventaire** : le QR Code encode l'URL `…/inventaire/?inv=<id>`.
- **Véhicule** : le QR Code encode l'URL `…/parc-auto/?vehicule=<id>`.

Le bouton **📥 Télécharger** exporte le QR Code en PNG, avec le nom de l'élément sous le code. Pratique pour coller une étiquette sur un tiroir, un sac, un véhicule.

### 10. Page 404 (`404.html`)

Affichée en cas d'URL incorrecte. Après 3 secondes, redirige automatiquement vers la page de connexion.
Pour toute question ou pour envisager une utilisation de cette solution dans votre structure, merci de me contacter.

---

> **Tous droits réservés.** Aucune licence n'est accordée pour l'utilisation, la modification ou la distribution de ce code.
> Merci !
