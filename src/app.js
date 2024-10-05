const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.log('Error al conectar a MongoDB', err);
});

// Rutas
app.use('/api/transacciones', transactionRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
