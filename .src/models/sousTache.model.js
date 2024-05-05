// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../config/db_pg.js");

//équivalent du main
module.exports = {

    creerSousTacheBD: (req, user_id) =>{
        return new Promise((resolve, reject) => {
            const requete = `INSERT INTO sous_taches (tache_id, titre, complete) VALUES ($1, $2, $3)`;
            const params = [user_id, req.body.titre, req.body.complete];

            db.query(requete, params, (err, resultat) => {
                if (err) {
                    console.log('Erreur sqlState : ' + err);
                    console.log(`Erreur sqlState ${err.sqlState} : ${err.sqlMessage}`);
                    reject(err);
                }
                resolve(resultat);
            });
        });
    },

};