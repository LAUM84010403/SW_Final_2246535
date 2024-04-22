//ROUTES DE l'API Tâches

//configuration
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

//controlleurs
const controller = require('../controlleurs/tache.controlleurs.js');


//PAGE D'ACCEUIL DE /api/taches
router.get('/', (req, res) => {
    res.send("<h1>BOJUR SUL MON HAPI!</h1>")
});


//AFFICHER TOUTES LES TÂCHES
router.get('/tous', controller.afficherTousTaches);



//Afficher Page
module.exports = router;
