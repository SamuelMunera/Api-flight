//Importaciones generales
import express from 'express';
import * as airportControllers from '../Controllers/airportController.js';

const router = express.Router();

router.post('/create', airportControllers.newAirport);
router.put('/edit/:id', airportControllers.editAirport);
router.get('/getAll', airportControllers.listAirports);
router.get('/get/:id', airportControllers.getAirport);
router.delete('/delete/:id', airportControllers.deleteAirportById);

export default router; 