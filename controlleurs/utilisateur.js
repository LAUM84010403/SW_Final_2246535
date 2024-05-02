const Utilisateurs = require("../models/utilisateur.model");
const bcrypt = require('bcrypt');

module.exports = {

    ajouterUnUtilisateur: (req, res) => {
        let message = "";
        if (!req.body.nom) {
            message += "nom, ";
        }
        if (!req.body.prenom) {
            message += "prenom, ";
        }
        if (!req.body.courriel) {
            message += "courriel, ";
        }
        if (!req.body.mot_de_passe) {
            message += "mot_de_passe, ";
        }
        
        if (message !== "") {
            res.status(400).json({
                erreur: "Certains champs sont manquants",
                champs_manquants: message
            });
            return;
        } 


        Utilisateurs.ajouterUtilisateurBD(req)
                .then(utilisateur => {
                    res.status(200).json({
                        message: [req.body.prenom]+ " " +[req.body.nom] + " a été ajouté avec succès comme utilisateur", "cle_api": Utilisateurs })
                })
                .catch((erreur) => {
                    console.log('Erreur : ', erreur);
                    res.status(500)
                    res.send({
                        message: "echec lors de la creation de " + [req.body.prenom]+" " +[req.body.nom]
                    });
                });
        }
};