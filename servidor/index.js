const express = require('express');
const cors = require('cors');

// crear el servidor
const app = express();
app.use(cors());

//Habilitar express.json    
app.use(express.json({ extended: true}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./client"));
// puerto de la app
const PORT = process.env.PORT || 4000;

//Rutas
app.use('/api/mercadopago', require('./routes/mercadopago'))




// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})
