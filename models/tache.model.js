// MANIPULATION(model) DE LA BASE DE DONNÉ POUR L'API Tâches

//Base de donnée
//const db = require('../.src/config/db.js');
const db = require("../.src/config/db_pg.js");

//équivalent du main
module.exports = {

    obtenirTousTacheDB: () => {
        return new Promise((resolve, reject) => {    
            const query = 'SELECT * FROM taches ORDER BY id';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
};