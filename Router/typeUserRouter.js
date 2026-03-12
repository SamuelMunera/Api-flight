//Importaciones generales 
import express from 'express';
import * as typeUserControllers from '../Controllers/typeUserController.js';

const router = express.Router();

router.post('/create', typeUserControllers.newTypeUser);
router.put('/edit/:id', typeUserControllers.editTypeUser);
router.get('/getAll', typeUserControllers.listTypeUsers);
router.get('/get/:id', typeUserControllers.getTypeUser);
router.delete('/delete/:id', typeUserControllers.removeTypeUser);

export default router;