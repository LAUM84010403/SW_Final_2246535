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


//AFFICHER TOUTES LES TÂCHES
router.get('/tous', controllerTache.afficherTousTaches);
router.post('/', controllerUtilisateur.ajouterUnUtilisateur)


//Afficher Page
module.exports = router;
