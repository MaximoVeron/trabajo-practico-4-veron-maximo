import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const character = sequelize.define('character',{
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    race:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:  {
                args: [["male", "female"]],
                msg: "defina Male o Female"
            },
        },
    },
    age:{
        type:DataTypes.INTEGER,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull: true,
    },
    ki:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate:{
            isInt:{
                msg: "El ki debe ser un numero entero"
            },
        },
    },

},{
    tableName: 'characters',
    timestamps: false,
});

export default character;