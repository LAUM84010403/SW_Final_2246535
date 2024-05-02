//ROUTES DE l'API Tâches

//configuration
const express = require('express');
const router = express.Router();
const app = express();

//controlleurs
const controllerTache = require('../controlleurs/tache.controlleurs.js');
const controllerUtilisateur = require('../controlleurs/utilisateur.js');


//PAGE D'ACCEUIL DE /api/taches
router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI!</h1>")
});


//CRÉER UNE TACHE
router.get('/', controllerTache.inventerTache)

//AFFICHER TOUTES LES TÂCHES
router.get('/tous', controllerTache.afficherTousTaches);

//AJOUTER UN UTILISATEUR
router.post('/usager', controllerUtilisateur.ajouterUnUtilisateur)
//SITE DE USAGER
router.get('/usager', (req, res) => {
    res.send("<h1>Utilisateur, page!</h1>")
});

//Afficher Page
module.exports = router;
