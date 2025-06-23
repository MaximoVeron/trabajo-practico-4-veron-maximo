import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const character = sequelize.define('character',{
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    race:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    age:{
        type:DataTypes.INTEGER,
    },
    description:{
        type:DataTypes.TEXT,
    },
    ki:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },

},{
    tableName: 'characters',
    timestamps: false,
});

export default character;