//Importaciones generales 
import { createUser, updateUser, getAllUsers, getUserById, deleteUser } from "../Services/userService.js";

//Controladores para crear un usuario
export async function newUser(req,res){
    try {
        const { name, lastName, email, password, phone, typeUser } = req.body;
        if (!name || !lastName || !email || !password || !phone || !typeUser) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newUser = await createUser({ name, lastName, email, password, phone, typeUser });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error creating user"});
    }
};

//Controladores para actualizar un usuario
export async function editUser(req, res){
    try {
        const {id} = req.params;
        const updateData = req.body;

        const userToUpdate = await getUserById(id);
        if (!userToUpdate) {
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await updateUser(userToUpdate, updateData);

        return res.status(200).json(updatedUser);
    }catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error updating user"});
    }
};
 
//Controladores para obtener todos los usuarios
export async function listUsers(req, res){
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Controladores para obtener un usuario por su ID
export async function getUser(req, res){
    const {id} = req.params;
    try{
        const user = await getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(404).json({message: error.message});

    }
};

//Controladores para eliminar un usuario
export async function removeUser(req, res){
    try {
        const {id} = req.params;
        const deletedUser = await deleteUser(id);
        return res.status(200).json({message: "User deleted successfully",user: deletedUser});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};