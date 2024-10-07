const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/BackendDB')
  .then(async () => {
    console.log('Conectado a MongoDB');

    // Eliminar colección de promociones
    await mongoose.connection.db.dropCollection('promotions');
    console.log('Colección de promociones eliminada');

    // Eliminar colección de transacciones
    await mongoose.connection.db.dropCollection('transactions');
    console.log('Colección de transacciones eliminada');

    // Eliminar colección de boletas
    await mongoose.connection.db.dropCollection('boletas');
    console.log('Colección de boletas eliminada');

    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error conectando a MongoDB o eliminando colección:", err);
  });
