// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const model = require('../models/tache.model.js');

module.exports = {

afficherTousTaches: (req, res) => {
    const queryParams = req.query;
    if (!queryParams.id) {
        res.status(400);
        res.send("Il manque le ID utilisateur; '/api/tache/tous?id=[id de l'utilisateur]'");
        return;
    }

    if (queryParams.complete == "true") {
        model.obtenirTousTacheDB(queryParams.id, true)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        });

    } else {
        model.obtenirTousTacheBD(queryParams.id, false)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        });
    }},


inventerTache: (req, res) => {
        let msgErreur = "";
        if (!req.body.titre) {
            msgErreur += "titre, ";
        }
        if (!req.body.description) {
            msgErreur += "description, ";
        }
        if (!req.body.date_debut) {
            msgErreur += "date_debut, ";
        }
        if (!req.body.date_echeance) {
            msgErreur += "date_echeance, ";
        }
        if (req.body.complet == null) {
            msgErreur += "complet";
        }
    
        if (msgErreur != "") {
            res.status(400);
            res.send({
                champ_manquant: msgErreur
            });
            return;
        };

        model.trouverUsagerBD(req.headers.authorization)
        .then((resultat) => {
            model.creerTacheBD(req, resultat[0].id)
            .then((tache) => {
                res.send({ message: "la tache " + req.body.titre + " à été ajouter avec succès" });
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Erreur lors de la creation de la tache"
                });
            });
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la recherche de l'utilisateur"
            });
        });
    }





};