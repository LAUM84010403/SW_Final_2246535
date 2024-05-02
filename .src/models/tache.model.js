// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../config/db_pg.js");

//équivalent du main
module.exports = {

    obtenirTousTacheBD: (userID, isComplete) => {
        return new Promise((resolve, reject) => { 
                
            const query = isComplete ? 'SELECT * FROM taches WHERE utilisateur_id = $1 ORDER BY id;'
                                     : 'SELECT * FROM taches WHERE utilisateur_id = $1 AND complete = false ORDER BY id;';
            const values = [userID];

        db.query(query, values, (err, result) => {
            if (err) {
                console.log('Erreur sqlState : ' + err);
                console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                reject(err);
            }

            resolve(result.rows);
        });
        })
    },


    trouverUsagerBD: (api_cle) => {
        return new Promise((resolve, reject) => {
            const requete = `SELECT id FROM utilisateur WHERE cle_api = $1`;
            const params = [api_cle];
    
            sql.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve(resultat.rows);
            });
        });
    },

    creerTacheDB: (req, user_id) =>{
        return new Promise((resolve, reject) => {
            const requete = `INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5, $6)`;
            const params = [user_id, req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete];
            sql.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve(resultat.rows);
            });
        });
    },
};