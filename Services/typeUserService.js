//Importaciones generales
import TypeUser from "../Models/typeUser.js";

//Servicio para crear un tipo de usuario
export async function createTypeUser(data) {
    try {
        const { name, description } = data;

        const verifyTypeUser = await TypeUser.findOne({ name, description });
        if(verifyTypeUser) {
            throw new Error("Type user already in use");
        }
        const newTypeUser = new TypeUser({ name, description });
        await newTypeUser.save();

        return newTypeUser;
        } catch (error){
            console.error(error)
                throw new Error("Error creating type user: " + error.message)
            
        }  
};

//Servicio para modificar todos un tipo de usuario
export async function updateTypeUser(typeUserToUpdate, updateData) {
    try{ 
        const { name, description } = updateData;

        //Validar que haya por lo menos un campo para actualizar
        if (!name && !description) {
            throw new Error("At least one field must be provided for update");
        }

        //Actualizar solo los campos que se proporcionen
        if (name) typeUserToUpdate.name = name;
        if (description) typeUserToUpdate.description = description;

        await typeUserToUpdate.save();
        return typeUserToUpdate;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating type user: " + error.message);
    }
};

//Servicio para obtener todos los tipos de usuario
export async function getAllTypeUsers()  {
    try{
        return await TypeUser.find();

    } catch (error) {
        throw new Error("Error obtaining type user list: " + error.message);
    }
};

//Servicio para obtener un tipo de usuario por su ID
export async function getTypeUserById(typeUserId) {
    try {
        return await TypeUser.findById(typeUserId);
    } catch (error) {
        throw new Error("Error obtaining type user: " + error.message);
    }
};

//Servicio para eliminar un tipo de usuario por su ID
export async function deleteTypeUser(typeUserId) {
     try {
        const typeUserDoc = await TypeUser.findById(typeUserId);
        if (!typeUserDoc) {
            throw new Error("Type user not found");
        }
        await typeUserDoc.deleteOne();
        return typeUserDoc;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting type user: " + error.message);
    }
};