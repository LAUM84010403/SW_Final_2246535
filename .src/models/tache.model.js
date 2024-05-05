// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../config/db_pg.js");

//équivalent du main
module.exports = {

    obtenirTousTacheBD: (userID, estComplet) => {
        return new Promise((resolve, reject) => { 
                
            const query = estComplet ? 'SELECT * FROM taches WHERE utilisateur_id = $1 ORDER BY id;'
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

    creerTacheBD: (req, user_id) =>{
        return new Promise((resolve, reject) => {
            const requete = `INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5, $6)`;
            const params = [user_id, req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete];
            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve();
            });
        });
    },

    trouverTacheBD: (id_tache) => {
        return new Promise((resolve, reject) => {

            const requete = `SELECT id, titre, description, date_debut, date_echeance, complete FROM taches WHERE id = $1`;
            const params = [id_tache];
    
            db.query(requete, params, (err, resultat) => {
                if (erreur) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve(resultat.rows);
            });
        });
    },
    modifierUneTacheBD: (req) =>{
        return new Promise((resolve, reject) => {
            let requete = `UPDATE taches SET titre = $1, description = $2, date_debut = $3, date_echeance = $4, complete = $5 where id = $6`;
            let params = [req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete, req.params.id]
            
    
            db.query(requete, params, (err, resultat) => {
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