import express from 'express';
import sequelize from './config/database.js';
import character from './models/chaaracters.model.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('funciona');
});

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa.');
    await character.sync();
    console.log('tabla characters sincronizada.');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});