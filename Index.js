// Importaciones generales 
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/Mongoconnect.js';
import apiRouter from './Router/apiRouter.js';

//Configuracion de variables generales y de entorno
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3020;


//Rutas de la API
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});


//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});