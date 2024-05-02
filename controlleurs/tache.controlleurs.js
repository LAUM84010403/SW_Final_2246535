// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const model = require('../models/tache.model.js');

module.exports = {

    afficherTousTaches: (req, res) => {
        console.log("TRE");
    const queryParams = req.query;
    if (!queryParams.id) {
        res.status(400);
        res.send('Il manque le ID utilisateur; "/api/tache/id?id=?"');
        return;
    }

    if (queryParams.complete) {
        model.obtenirTousTacheDB(queryParams.id, true)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        });

    } else {
        model.obtenirTousTacheDB(queryParams.id, false)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        });
    }},

};


/*
AIDE MÉMOIRE




*/
