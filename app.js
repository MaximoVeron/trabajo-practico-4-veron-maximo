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

app.get('/api/characters', async (req, res) => {
    try {
        const characters = await character.findAll();
        res.json(characters);
    }
    catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});

app.get ('/api/characters/:id', async (req, res) => {
    try {
        const characters = await character.findAll();
        res.json(characters);
    } catch (error) {
        console.error('Error al obtener el personaje:', error);
        res.status(500).json({ error: 'Error al obtener el personaje' });
    }
});

app.post ('/api/characters', async (req, res) => {
    const {name, race, gender,age, descrption} = req.body;
    if (!name || !race) {
        return res.status(400).json({ error: 'El nombre y la raza son obligatorios' });
    }

    try {
        const exist = await character.findOne({where:{name}})
        if (exist) return res.status(409).json({error: 'El personaje ya existe'});
        const newCharacter = await character.create({name,race,gender,age,descrption});
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({error: 'Error al crear el personaje'});
    }
});

app.put('/api/characters/:id', async (req, res) => {
    const {name,race,gender,age,descrption} = req.body;
    try {
        const char = await character.findByPk(req.params.id);
        if (!char) return res.status(404).json({ error: 'Personaje no encontrado' });
        if (name) {
            const exist = await character.findOne({where:{name,id:{[sequelize.Op.ne]: req.params.id}}});
            if (exist) return res.status(409).json({error: 'El personaje ya existe'});
        }
        await char.update ({name,race,gender,age,descrption});
        res.json(char);
    } catch (error) {
        console.error('Error al actualizar el personaje:', error);
        res.status(500).json({ error: 'Error al actualizar el personaje' });
    }
});

app.delete('/api/characters/:id', async (req, res) => {
    try {
        const char = await character.findByPk(req.params.id);
        if (!char) return res.status(404).json({error: 'Personaje no encontrado'});
        await char.destroy();
        res.json({message: 'Personaje eliminado correctamente'});
    } catch (error) {
        console.error('Error al eliminar el personaje:', error);
        res.status(500).json({ error: 'Error al eliminar el personaje' });
    }
});