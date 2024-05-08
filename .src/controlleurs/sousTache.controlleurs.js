// CODAGE(controlleurs) DE L'API Tâches

//appel des manipulation de la base de donnée
const modelUtilisateur = require('../models/utilisateur.model');
const modelSousTache = require('../models/sousTache.model');

module.exports = {
    inventerSousTache: (req, res) => {
        let msgErreur = "";
        if (!req.body.id) {
            msgErreur += "id_tache, ";
        }
        if (!req.body.titre) {
            msgErreur += "titre, ";
        }
        if (!req.body.complet == true || !req.body.complet == false) {
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





};