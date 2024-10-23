import express, { Application } from 'express';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env')});

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el http://localhost:${PORT}`);
})