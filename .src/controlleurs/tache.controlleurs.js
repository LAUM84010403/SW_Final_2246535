// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const modelUtilisateur = require('../models/utilisateur.model');
const modelTache = require('../models/tache.model');

module.exports = {

afficherTousTaches: (req, res) => {
    if (!req.query.id) {
        res.status(400);
        res.send("Il manque le ID utilisateur; '/api/tache/tous?id=[id de l'utilisateur]'");
        return;
    }

    if (req.query.complete == "true") {
        modelTache.obtenirTousTacheDB(req.query.id, true)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error('Un erreur est survenue au moment de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        });

    } else {
        modelTache.obtenirTousTacheBD(req.query.id, false)
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

        modelUtilisateur.trouverUsagerBD(req.headers.authorization)
        
        .then((resultat) => {
            modelTache.creerTacheBD(req, resultat[0].id)
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
    },

changerTache: (req,res) => {
    var message = "";

    if (!req.body.id) {
        message += "id, ";
    }
    if (!req.body.titre) {
        message += "titre, ";
    }
    if (!req.body.description) {
        message += "description, ";
    }
    if (!req.body.date_debut) {
        message += "date_debut, ";
    }
    if (!req.body.date_echeance) {
        message += "date_echeance, ";
    }
    if (req.body.complet == null) {
        message += "complete, ";
    }
    if (message != "") {
        res.status(400);
        res.send({
            champ_manquant: message
        });
        return;
    }
    modelTache.trouverTacheBD(req.body.id)
    .then(resultat => {
        Taches.modifierUneTacheBD(req)
        .then((tache) => {
            res.send({ message: "La tâche " + [req.params.id] + " fût modifier avec succès!", 
            tache: { 
                id: req.params.id, 
                titre: req.body.titre, 
                description: req.body.desciption, 
                date_debut: req.body.date_debut, 
                date_echeance: req.body.date_echeance, 
                complet: req.body.complete } 
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Aucune tache n'existe avec ce ID, est-ce le bon? ID:" + [req.params.id]
                });
            });
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "la tâche n'existe pas, est-ce le bon ID:" + [req.params.id]
        });
    })})
    },



};