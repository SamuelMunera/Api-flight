//Importaciones generales 
import express from 'express';
import aircraftRouter from './airCraftRouter.js';
import airportRouter from './airportRouter.js';
import typeUserRouter from './typeUserRouter.js';
import userRouter from './userRouter.js';

const router = express.Router(); 

router.use('/airCraft', aircraftRouter);
router.use('/airport', airportRouter);
router.use('/typeUser', typeUserRouter);
router.use('/user', userRouter);

export default router;