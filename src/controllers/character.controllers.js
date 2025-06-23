import character from '../models/characters.model.js';
import { Op } from 'sequelize';

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
    const { name, ki, race, gender, age, description } = req.body;

    // Validaciones
    if (!name || !race || !gender || ki === undefined) {
        return res.status(400).json({ error: 'Los campos name, ki, race y gender son obligatorios.' });
    }
    if (!Number.isInteger(ki)) {
        return res.status(400).json({ error: 'El campo ki debe ser un número entero.' });
    }
    if (gender !== 'Male' && gender !== 'Female') {
        return res.status(400).json({ error: 'El campo gender solo puede ser "Male" o "Female".' });
    }
    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ error: 'El campo description debe ser una cadena de texto.' });
    }

    // Unicidad de name
    const exists = await character.findOne({ where: { name } });
    if (exists) {
        return res.status(400).json({ error: 'Ya existe un personaje con ese nombre.' });
    }

    try {
        const newChar = await character.create({ name, ki, race, gender, age, description });
        res.status(201).json(newChar);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el personaje.' });
    }
};

// Actualizar un personaje existente
export const updateCharacter = async (req, res) => {
    const { name, ki, race, gender, age, description } = req.body;
    const { id } = req.params;

    // Verifica existencia
    const char = await character.findByPk(id);
    if (!char) {
        return res.status(404).json({ error: 'Personaje no encontrado.' });
    }

    // Validaciones
    if (name !== undefined && name.trim() === '') {
        return res.status(400).json({ error: 'El campo name no puede estar vacío.' });
    }
    if (ki !== undefined && !Number.isInteger(ki)) {
        return res.status(400).json({ error: 'El campo ki debe ser un número entero.' });
    }
    if (gender !== undefined && gender !== 'Male' && gender !== 'Female') {
        return res.status(400).json({ error: 'El campo gender solo puede ser "Male" o "Female".' });
    }
    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ error: 'El campo description debe ser una cadena de texto.' });
    }

    // Unicidad de name (excepto el propio)
    if (name) {
        const exists = await character.findOne({
            where: { name, id: { [Op.ne]: id } }
        });
        if (exists) {
            return res.status(400).json({ error: 'Ya existe un personaje con ese nombre.' });
        }
    }

    try {
        await char.update({ name, ki, race, gender, age, description });
        res.json(char);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el personaje.' });
    }
};

// Eliminar un personaje
export const deleteCharacter = async (req, res) => {
    const { id } = req.params;
    const char = await character.findByPk(id);
    if (!char) {
        return res.status(404).json({ error: 'Personaje no encontrado.' });
    }
    try {
        await char.destroy();
        res.json({ message: 'Personaje eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el personaje.' });
    }
};