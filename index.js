//PAGE DE BASE DE LA PAGE, C'EST ICI QUE TOUT COMMENCE

console.log("Je suis prêt à commencer");

const express = require('express');

const router = express.Router();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//ACCEUIL
app.get('/', (req, res) => {
    res.send("<h1>Mon premier serveur web d0 sur express !</h1>");
});

//initier swagger-ui + DOCUMENTATIONS
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./.src/config/documentation.json');
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

//ROUTES POKEMON
//const routesPokemon = require('./routes/routes_pokemon.js');
//app.use('/api/pokemon/', routesPokemon);


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});



