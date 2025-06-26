import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect: 'mysql',
    }
);

export default sequelize;
export const initDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("conexion MySQL establecida");
        await sequelize.sync();
    } catch (error) {
        console.error("error al conectar a la base de datos", error);
    }
};
