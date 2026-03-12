//Importaciones generales 
import { createTypeUser, updateTypeUser, getAllTypeUsers, getTypeUserById,deleteTypeUser } from "../Services/typeUserService.js";

//Controladores para crear un tipo de usuario
export async function newTypeUser (req, res){
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newTypeUser = await createTypeUser({ name, description });
        return res.status(201).json(newTypeUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error creating type user"});
    }
};

//Controladores para actualizar un tipo de usuario
export async function editTypeUser (req, res){
    try {
        const {id} = req.params;
        const updateData = req.body;

        const typeUserToUpdate = await getTypeUserById(id);
        if (!typeUserToUpdate) {
            return res.status(404).json({message: "Type user not found"});
        }
        const updatedTypeUser = await updateTypeUser(typeUserToUpdate, updateData);

        return res.status(200).json(updatedTypeUser);
    }catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error updating type user"});
    }
};
 
//Controladores para obtener todos los tipos de usuario
export async function listTypeUsers (req, res){
    try {
        const typeUsers = await getAllTypeUsers();
        return res.status(200).json(typeUsers);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Controladores para obtener un tipo de usuario por su ID
export async function getTypeUser (req, res){
    const {id} = req.params;
    try { 
        const typeUser = await getTypeUserById(id);
        return res.status(200).json(typeUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};

//Controladores para eliminar un tipo de usuario
export async function removeTypeUser (req, res){
    try {
        const {id} = req.params;
        const deletedTypeUser = await deleteTypeUser(id);
        return res.status(200).json({message: "Type user deleted", typeUser: deletedTypeUser});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};
