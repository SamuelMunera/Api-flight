//Importaciones generales
import express from 'express';
import * as aircraftControllers from '../Controllers/aircraftControllers.js';


const router = express.Router();

router.post('/create', aircraftControllers.newAirCraft);
router.put('/edit/:id', aircraftControllers.editAirCraft);
router.get('/getAll', aircraftControllers.listAirCrafts);
router.get('/get/:id', aircraftControllers.getAirCraft);
router.delete('/delete/:id', aircraftControllers.removeAirCraft);


export default router;