const model = require('../model/model');

const controlleur = {
getall: async (req, res) => {
    console.log("controlleur pass");
    const auteur_id = req.params.id;
    try {
        const tache = await model.getAll(auteur_id);
        if (!tache) {
            res.status(404).json({ error: `auteur: ${auteur_id} introuvable` });
        } else {
            res.json(tache);
        }
    } catch (error) {
        console.error(`Error fetching tache with ID ${auteur_id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
}};

module.exports = controlleur;