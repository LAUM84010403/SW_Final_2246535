//ROUTES DE l'API Tâches

//configuration
const express = require('express');
const router = express.Router();
const app = express();

//controlleurs
const controllerTache = require('../controlleurs/tache.controlleurs.js');
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
router.post('/ajouter', controllerTache.inventerTache)
//MODIFIER TÂCHE
////router.post('/modifier', controllerTache)
//MODIFIER TÂCHE STATUT
///router.post('/modifierStatut', controllerTache)
//SUPPRIMER TÂCHE
///router.post('/supprimer', controllerTache)

//CRÉER UNE TACHE
router.post('/sous/ajouter'.inventerSousTache)
//MODIFIER TÂCHE
///router.post('/sous/modifier')
//MODIFIER TÂCHE STATUT
///router.post('/sous/modifierStatut')
//SUPPRIMER TÂCHE
///router.post('/sous/supprimer')

//AFFICHER TOUTES LES TÂCHES
router.get('/tous', controllerTache.afficherTousTaches);


//Afficher Page
module.exports = router;
