// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const model = require('../models/tache.model.js');

module.exports = {

    afficherTousTaches: (req, res) => {
        model.obtenirTousTacheDB()
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des tâches :', error);
                res.status(500).json({ error: 'Erreur serveur' });
            });
    }








};
