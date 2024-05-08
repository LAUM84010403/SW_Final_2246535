//ROUTES DE l'API Tâches

//configuration
const express = require('express');
const router = express.Router();
const app = express();

//controlleurs
const controllerTache = require('../controlleurs/tache.controlleurs.js');
const controllerSousTache = require('../controlleurs/sousTache.controlleurs.js');
const controllerUtilisateur = require('../controlleurs/utilisateur.controlleurs.js');


//PAGE D'ACCEUIL DE /api/taches
router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI!</h1>")
});

//AJOUTER UN UTILISATEUR
router.post('/usager', controllerUtilisateur.ajouterUnUtilisateur)
//SITE DE USAGER
router.get('/usager', (req, res) => {
    res.send("<h1>Utilisateur, page!</h1>")
});

//CRÉER UNE TACHE
router.post('/ajouter', controllerTache.creerTache)
//MODIFIER TÂCHE
router.post('/modifier', controllerTache.modifierTache)
//MODIFIER TÂCHE STATUT
///router.post('/modifierStatut', controllerTache)
//SUPPRIMER TÂCHE
///router.post('/supprimer', controllerTache)

//CRÉER UNE SOUS-TACHE
router.post('/sous/ajouter', controllerSousTache.creerSousTache)
//MODIFIER SOUS-TÂCHE
router.post('/sous/modifier', controllerSousTache.changerSousTache)
//MODIFIER SOUS-TÂCHE STATUT
///router.post('/sous/modifierStatut')
//SUPPRIMER SOUS-TÂCHE
///router.post('/sous/supprimer')

//AFFICHER TOUTES LES TÂCHES
router.get('/tous', controllerTache.afficherTousTaches);


//Afficher Page
module.exports = router;
