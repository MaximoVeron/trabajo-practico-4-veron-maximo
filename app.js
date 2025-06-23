import sequelize from './config/database.js';
import character from './models/chaaracters.model.js';

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa.');
    await character.sync();
    console.log('tabla characters sincronizada.');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}