import Character from '../models/characters.model.js';
import {UniqueConstraintError, ValidationError } from 'sequelize';

// Crear personaje
export const createCharacter = async (req, res) => {
    try {
        const character = await Character.create(req.body);
        return res.status(201).json(character);
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: "Ya existe un personaje con ese nombre."
            });
        }
        if (error instanceof ValidationError) {
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                message: "Error de validación de datos.",
                errors
            });
        }
        return res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }
};

// Obtener todos los personajes
export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();
        return res.json(characters);
    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor al buscar los personajes.",
            error: error.message
        });
    }
};

// Obtener personaje por ID
export const getCharacterById = async (req, res) => {
    try {
        const characterId = req.params.id;
        const character = await Character.findByPk(characterId);
        if (character) {
            return res.json(character);
        } else {
            return res.status(404).json({ message: "Personaje no encontrado." });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }
};

// Actualizar personaje
export const updateCharacter = async (req, res) => {
    const characterId = req.params.id;
    try {
        const character = await Character.findByPk(characterId);
        if (!character) {
            return res.status(404).json({
                message: "Personaje no encontrado."
            });
        }
        const [updatedRows] = await Character.update(req.body, {
            where: { id: characterId },
            individualHooks: true
        });
        if (updatedRows > 0) {
            const updatedCharacter = await Character.findByPk(characterId);
            return res.json(updatedCharacter);
        } else {
            return res.status(400).json({
                message: "No se pudo actualizar el personaje, quizás los datos son los mismos o inválidos."
            });
        }
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: "Ya existe otro personaje con ese nombre. Por favor, elige uno diferente.",
                details: error.errors.map(e => e.message)
            });
        }
        if (error instanceof ValidationError) {
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                message: "Error de validación de datos al actualizar el personaje.",
                errors
            });
        }
        return res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }
};

// Eliminar personaje
export const deleteCharacter = async (req, res) => {
    const characterId = req.params.id;
    try {
        const character = await Character.findByPk(characterId);
        if (!character) {
            return res.status(404).json({
                message: "No se encontró el personaje."
            });
        }
        const deleteRows = await Character.destroy({
            where: { id: characterId }
        });
        if (deleteRows > 0) {
            return res.json({
                message: "Personaje eliminado correctamente."
            });
        } else {
            return res.status(404).json({
                message: "Personaje no encontrado."
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }
};