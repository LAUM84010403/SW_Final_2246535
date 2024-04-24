const db = require("../.src/config/pg_db");


const mod = {
    getAll: (utilisateur_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM public.taches WHERE utilisateur_id = $1';
            const value = [utilisateur_id]
            db.query(query, value, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("resolve");
                    resolve(result);
                }
            });
        });
    }
};
module.exports = mod;