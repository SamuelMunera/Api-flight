//Importaciones generales
import express from 'express';
import * as userControllers from '../Controllers/userController.js';

const router = express.Router();

router.post('/create', userControllers.newUser);
router.put('/edit/:id', userControllers.editUser);
router.get('/getAll', userControllers.listUsers);
router.get('/get/:id', userControllers.getUser);
router.delete('/delete/:id', userControllers.removeUser);

export default router;