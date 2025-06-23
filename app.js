import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import character from './models/chaaracters.model.js';

import {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter
    deleteCharacter
} from './controllers/character.controllers.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('funciona');
});

app.get('/characters', getAllCharacters);
app.get('/characters/:id', getCharacterById);
app.post('/characters', createCharacter);   
app.put('/characters/:id', updateCharacter);
app.delete('/characters/:id', deleteCharacter);

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

