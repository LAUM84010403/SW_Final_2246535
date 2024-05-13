const utilisateurModel = require("../models/utilisateur.model");

module.exports = {

    ajouterUnUtilisateur: (req, res) => {
        let msgErreur = "";
        if (!req.body.nom) {
            msgErreur += "nom, ";
        }
        if (!req.body.prenom) {
            msgErreur += "prenom, ";
        }
        if (!req.body.courriel) {
            msgErreur += "courriel, ";
        }
        if (!req.body.mot_de_passe) {
            msgErreur += "mot_de_passe, ";
        }
        
        if (msgErreur !== "") {
            res.status(400).json({
                erreur: "Certains champs sont manquants",
                champs_manquants: msgErreur
            });
            return;
        } 

        utilisateurModel.ajouterUtilisateurBD(req)
        .then(utilisateur => {
            res.status(200).json({
                message: [req.body.prenom]+ " " +[req.body.nom] + " a été ajouté avec succès comme utilisateur", "cle_api": utilisateur })
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la creation de " + [req.body.prenom]+ " " +[req.body.nom]
            });
        });
    },
    
    modifierAPI: (req, res) => {
        if (!req.body.courriel) {
            msgErreur += "courriel, ";
        }
        if (!req.body.mot_de_passe) {
            msgErreur += "mot_de_passe, ";
        }
        if (msgErreur !== "") {
            res.status(400).json({
                erreur: "Certains champs sont manquants",
                champs_manquants: msgErreur
            });
            return;
        } 
        
        utilisateurModel.modifierAPIBD(req)
        .then(utilisateur => {
            res.status(200).json({
                message: "la clé fut modifier", "cle_api": utilisateur })
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "echec lors de la creation de " + [req.body.prenom]+ " " +[req.body.nom]
            });
        });



    }

};