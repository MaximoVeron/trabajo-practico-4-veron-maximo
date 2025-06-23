import character from '../models/characters.model.js';
import sequelize from '../config/database.js';

// Obtener todos los personajes
export const getAllCharacters = async (req, res) => {
    try {
        const characters = await character.findAll();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
};

// Obtener un personaje por ID
export const getCharacterById = async (req, res) => {
    try {
        const char = await character.findByPk(req.params.id);
        if (!char) return res.status(404).json({ error: 'Personaje no encontrado' });
        res.json(char);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el personaje' });
    }
};

// Crear un nuevo personaje
export const createCharacter = async (req, res) => {
    const { name, race, gender, age, description } = req.body;
    if (!name || !race) {
        return res.status(400).json({ error: 'El nombre y la raza son obligatorios' });
    }
    try {
        const exists = await character.findOne({ where: { name } });
        if (exists) return res.status(409).json({ error: 'El nombre ya existe' });

        const newChar = await character.create({ name, race, gender, age, description });
        res.status(201).json(newChar);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el personaje' });
    }
};

// Actualizar un personaje existente
export const updateCharacter = async (req, res) => {
    const { name, race, gender, age, description } = req.body;
    try {
        const char = await character.findByPk(req.params.id);
        if (!char) return res.status(404).json({ error: 'Personaje no encontrado' });

        if (name) {
            const exists = await character.findOne({
                where: { name, id: { [sequelize.Op.ne]: req.params.id } }
            });
            if (exists) return res.status(409).json({ error: 'El nombre ya existe' });
        }

        await char.update({ name, race, gender, age, description });
        res.json(char);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el personaje' });
    }
};

// Eliminar un personaje
export const deleteCharacter = async (req, res) => {
    try {
        const char = await character.findByPk(req.params.id);
        if (!char) return res.status(404).json({ error: 'Personaje no encontrado' });
        await char.destroy();
        res.json({ message: 'Personaje eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el personaje' });
    }
};