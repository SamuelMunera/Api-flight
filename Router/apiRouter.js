//Importaciones generales 
import express from 'express';
import aircraftRouter from './airCraftRouter.js';
import airportRouter from './airportRouter.js';

const router = express.Router(); 

router.use('/airCraft', aircraftRouter);
router.use('/airport', airportRouter);

export default router;