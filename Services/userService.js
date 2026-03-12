//Importaciones generales 
import User from '../Models/User.js';

//Servicio para crear un usuario
export async function createUser(data) {
    try {
        const { name, lastName, email, password, phone, typeUser } = data;
        const verifyUser = await User.findOne({ email, phone });
        if(verifyUser) {
            throw new Error("Email or phone already in use");
        }
        const newUser = new User({ name, lastName, email, password, phone, typeUser });
        await newUser.save();

        return newUser;
        } catch (error){
            console.error(error)
                throw new Error("Error creating user: " + error.message)

        }  
};

//Servicio para modificar un usuario
export async function updateUser(userToUpdate, updateData) {
    try{ 
        const { name, lastName, email, password, phone, typeUser } = updateData;

        //Validar que haya por lo menos un campo para actualizar
        if (!name && !lastName && !email && !password && !phone && !typeUser) {
            throw new Error("At least one field must be provided for update");
        }
         //Actualizar solo los campos que se proporcionen
        if (name) userToUpdate.name = name;
        if (lastName) userToUpdate.lastName = lastName;
        if (email) userToUpdate.email = email;
        if (password) userToUpdate.password = password;
        if (phone) userToUpdate.phone = phone;
        if (typeUser) userToUpdate.typeUser = typeUser;

        await userToUpdate.save();
        return userToUpdate;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating user: " + error.message);
    }
};

//Servicio para obtener todos los usuarios
export async function getAllUsers()  {
    try{
        return await User.find().populate('typeUser',["name"]);
        } catch (error) {
        throw new Error("Error obtaining user list: " + error.message);
    }
};

//Servicio para obtener un usuario por su ID
export async function getUserById(userId) {
    try {
        return await User.findById(userId).populate('typeUser',["name"]);
    } catch (error) {
        throw new Error("Error obtaining user: " + error.message);
    }
};

//Servicio para eliminar un usuario
export async function deleteUser(userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};