// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const modelUtilisateur = require('../models/utilisateur.model');
const modelTache = require('../models/tache.model');

module.exports = {

afficherTousTaches: (req, res) => {
    const queryParams = req.query;
    if (!queryParams.id) {
        res.status(400);
        res.send("Il manque le ID utilisateur; '/api/tache/tous?id=[id de l'utilisateur]'");
        return;
    }

    if (queryParams.complete == "true") {
        modelTache.obtenirTousTacheDB(queryParams.id, true)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Un erreur est survenue au moment de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        });

    } else {
        modelTache.obtenirTousTacheBD(queryParams.id, false)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Un erreur est survenue au moment de la récupération des tâches :', error);
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
        console.log(req.headers.authorization)
        modelUtilisateur.trouverUsagerBD(req.headers.authorization)
        
        .then((resultat) => {
            modelTache.creerTacheBD(req, resultat)
            .then((tache) => {
                res.send({ message: req.body.titre + " à été créer en tant que tâche!" });
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Un erreur est survenue au moment de la création de la tâche"
                });
            });
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Un erreur est survenue au moment de la recherche de l'utilisateur"
            });
        });
    }





};