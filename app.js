import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';   
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { initDB } from "./src/config/database.js";
import router from "./src/routes/character.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/character", router);
const PORT = process.env.PORT || 4000;

initDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});

