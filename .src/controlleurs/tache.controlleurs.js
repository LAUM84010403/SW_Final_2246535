// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const modelUtilisateur = require('../models/utilisateur.model');
const modelTache = require('../models/tache.model');
const modelSousTache = require('../models/sousTache.model');

module.exports = {

afficherTousTaches: (req, res) => {    
    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelUtilisateur.trouverUsagerBD(req.headers.authorization)
        .then((resultat) => {
            if (req.query.complete == "true") {
                modelTache.obtenirTousTacheBD(resultat[0].id, true)
                .then(result => {
                    console.log("résult = " + result)
                    res.send(result);
                    
                })
                .catch(error => {
                    console.error('Un erreur est survenue au moment de la récupération des tâches :', error);
                    res.status(500).json({ error: 'Erreur serveur' });
                });
            } else {
                modelTache.obtenirTousTacheBD(resultat[0].id, false)
                .then(result => {
                    res.send(result);
                })
                .catch(error => {
                    console.error('Un erreur est survenue au moment de la récupération des tâches :', error);
                    res.status(500).json({ error: 'Erreur serveur' });
                });
            }
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


creerTache: (req, res) => {
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
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500);
        res.send({
            message: "Votre clé Api n'est pas bonne!"
        });
    })

        
    },

modifierTache: (req,res) => {
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
    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelTache.trouverTacheBD(req.body.id)
        .then(resultat => {
            modelTache.modifierUneTacheBD(req)
                .then((tache) => {
                    res.send({
                        message: "La tâche " + [req.params.id] + " fût modifiée avec succès!",
                        tache: {
                            id: req.params.id,
                            titre: req.body.titre,
                            description: req.body.description,
                            date_debut: req.body.date_debut,
                            date_echeance: req.body.date_echeance,
                            complet: req.body.complete
                        }
                    });
                })
                .catch((erreur) => {
                    console.log('Erreur : ', erreur);
                    res.status(500);
                    res.send({
                        message: "Aucune tache n'existe avec cet ID, est-ce le bon? ID:" + [req.params.id]
                    });
                });
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "La tâche n'existe pas, est-ce le bon ID:" + [req.params.id]
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

supprimerTache: (req, res) => {
    modelUtilisateur.validationCle(req.headers.authorization)
    .then((resultat) => {
        modelTache.trouverTacheBD(req.body.id)
        .then(resultat => {
            modelSousTache.supprimerSousTacheBD(req.query.id)
            .then(resultat => {
                modelTache.supprimerTacheBD(req.query.id)
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
                    message: "Erreur de la suppresion des sous tâches."
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

modifierStatusTache: (req, res) => {
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
        modelTache.trouverTacheBD(req.query.id)
        .then(resultat => {
            modelTache.modifierStatusTacheDB(req.body.complet, req.query.id)
            .then(resultat => {
                res.send({
                    message: "Le statue de la tâche " + [req.query.id] + " fût supprimée avec succès!",
                });
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500);
                res.send({
                    message: "Erreur de la modification du statu de la tâches."
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
    


}