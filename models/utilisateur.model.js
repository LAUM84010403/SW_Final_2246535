// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches(Utilisateurs)

const bcrypt = require('bcrypt');
//Base de donnée
const db = require("../.src/config/db_pg.js");

//équivalent du main
module.exports = {
    ajouterUtilisateurBD: (req) => {
    return new Promise((resolve, reject) => {
        const cle = uuidv4.v4();
        const mdpHash = bcrypt.hash(req.body.mot_de_passe)
        const query = `INSERT INTO utilisateur(nom, prenom, courriel, cle_api, password) VALUES ($1, $2, $3, $4, $5)`;    
        const params = [req.body.nom, req.body.prenom, req.body.courriel, cle, mdpHash];
        

            db.query(query, params, (err, resultat) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("Votre clé api PERSONELLE:D " + cle);
                    }
                });
            })
            .catch(err => reject(err));
    },
};