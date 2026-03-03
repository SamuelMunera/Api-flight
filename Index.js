// Importaciones generales 
import express from 'express';
import dotenv from 'dotenv';

//Configuracion de variables generales y de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3020;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});