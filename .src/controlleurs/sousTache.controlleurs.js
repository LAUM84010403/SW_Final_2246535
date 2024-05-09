// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const modelUtilisateur = require('../models/utilisateur.model');
const modelSousTache = require('../models/sousTache.model');

module.exports = {

afficherSousTaches: (req, res) => {
    let message = "";
    if (!req.query.id) {
        message += "id de la tache manquant";
    }
    if (msgErreur != "") {
        res.status(400);
        res.send({
            champ_manquant: msgErreur
        });
        return;
    };

    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelUtilisateur.trouverUsagerBD(req.headers.authorization)
        .then((resultat) => {
            modelSousTache.trouverSousTacheBD(resultat[0].id, true)
                .then(result => {
                    console.log("résult = " + result)
                    res.send(result);
                })
                .catch(error => {
                    console.error('Un erreur est survenue au moment de la récupération des sous-tâches :', error);
                    res.status(500).json({ error: 'Erreur serveur' });
                });
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "L'utilisateur n'a pas été trouvé!"
            });
        })
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({
            message: "Votre clé Api n'est pas bonne!"
        });
    })

},

creerSousTache: (req, res) => {
    let msgErreur = "";
    if (!req.body.id) {
        msgErreur += "id_tache, ";
    }
    if (!req.body.titre) {
        msgErreur += "titre, ";
    }
    if (typeof req.body.complet !== 'boolean') {
        msgErreur += "complet doit être true / false";
    }

    if (msgErreur != "") {
        res.status(400);
        res.send({
            champ_manquant: msgErreur
        });
        return;
    };
    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelUtilisateur.trouverUsagerBD(req.headers.authorization)
        .then((utilisateur_id) => {
            modelSousTache.creerSousTacheBD(req, utilisateur_id)
            .then((tache) => {
                res.send({ 
                message: req.body.titre + " à été ajouter avec succès" });
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Un erreur est survenue au moment de la creation de la tâche"
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
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({
            message: "Votre clé Api n'est pas bonne!"
        });
    })
},


changerSousTache: (req, res) => {
    var message = "";
    if (!req.body.id) {
        message += "id, ";
    }
    if (!req.body.tache_id) {
        message += "tache_id, ";
    }
    if (!req.body.titre) {
        message += "titre, ";
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
    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelSousTache.trouverSousTacheBD(req.body.id)
        .then(resultat => {
            modelSousTache.modifierUneSousTacheBD(req)
            .then((tache) => {
                res.send({ message: "La Sous tâche " + [req.params.id] + " fût modifier avec succès!", 
                tache: { 
                    id: req.params.id, 
                    titre: req.body.titre, 
                    complet: req.body.complete } 
                })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Aucune sous tâche n'existe avec ce ID, est-ce le bon? ID:" + [req.params.id]
                });
            });
            })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "la sous tâche n'existe pas, est-ce le bon ID : " + [req.params.id]
            });
        })})
    })
    .catch((erreur) => {
    console.log('Erreur : ', erreur);
    res.status(500);
    res.send({
        message: "Votre clé Api n'est pas bonne!"
    });
    })
},
supprimerSousTache: (req, res) => {
    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelSousTache.trouverSousTacheBD(req.body.id)
        .then(resultat => {
            modelSousTache.supprimerSousTacheBD(req.query.id)
            .then(resultat => {
                res.send({
                    message: "La tâche " + [req.query.id] + " fût supprimée avec succès!",
                });
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500);
                res.send({
                    message: "Une erreur est survenue"
                });
            })
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "La tâche n'existe pas, est-ce le bon ID:" + [req.query.id]
            });
        });
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({
            message: "Votre clé Api n'est pas bonne!"
        });
    })

},
modifierStatusSousTache: (req, res) => {
    let msgErreur = "";
    if (!req.query.id) {
        message += "id, ";
    }
    if (typeof req.body.complet !== 'boolean') {
        msgErreur += "complet doit être true / false";
    }

    if (msgErreur != "") {
        res.status(400);
        res.send({
            champ_manquant: msgErreur
        });
        return;
    };

    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelSousTache.trouverSousTacheBD(req.query.id)
        .then(resultat => {
            modelSousTache.modifierStatusSousTacheDB(req.body.complet, req.query.id)
            .then(resultat => {
                res.send({
                    message: "Le statue de la sous tâche " + [req.query.id] + " fût supprimée avec succès!",
                });
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500);
                res.send({
                    message: "Erreur de la modification des sous tâches."
                });
            });
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "La tâche n'existe pas, est-ce le bon ID:" + [req.query.id]
            });
        });
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({
            message: "Votre clé Api n'est pas bonne!"
        });
    })
},



};