import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const character = sequelize.define('character',{
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    race:{
        type:DataTypes.STRING,
    },
    gender:{
        type: DataTypes.STRING,
    },
    age:{
        type:DataTypes.INTEGER,
    },
    description:{
        type:DataTypes.TEXT,
    }

},{
    tableName: 'characters',
    timestamps: false,
});

export default character;