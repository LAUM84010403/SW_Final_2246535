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
            modelSousTache.creerSousTacheBD(req, resultat[0].id)
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
    }





};