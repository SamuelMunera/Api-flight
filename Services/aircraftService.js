//Importaciones generales 
import airCraft from "../Models/airCraft.js";


//Servicio para crear una aeronave
export async function createAirCraft(data) {
    try {
        const { name, type, enterprise } = data;
        
        const verifyAirCraft = await airCraft.findOne({ name });
        if(verifyAirCraft) {
            throw new Error("Aircraft name already in use");
        }
        const newAirCraft = new airCraft({name, type, enterprise});
        await newAirCraft.save();

        return newAirCraft;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating aircraft: " + error.message);
    }
}

//Servicio para modificar una aeronave
export async function updateAirCraft(aircraftToUpdate, updateData) {
    try{ 
        const { name, type, enterprise } = updateData;
 
        //Validar que haya por lo menos un campo para actualizar
        if (!name && !type && !enterprise) {
            throw new Error("At least one field must be provided for update");
        }
 
        //Actualizar solo los campos que se proporcionen
        if (name) aircraftToUpdate.name = name;
        if (type) aircraftToUpdate.type = type;
        if (enterprise) aircraftToUpdate.enterprise = enterprise;

        await aircraftToUpdate.save();
        return aircraftToUpdate;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating aircraft: " + error.message);

    }

};

//Servicio para obtener todos las aeronaves
export async function getAllAirCrafts()  {
  try {
    return await airCraft.find();
    } catch (error) {
        throw new Error("Error obtaining aircraft list"+error.message);
    }
};

//Servicio para obtener una aeronave por su ID
export async function getAirCraftById(aircraftId) {
    try {
        return await airCraft.findById(aircraftId);
    } catch (error) {
        throw new Error("Error obtaining the aircraft: " + error.message);
    }
}

//Servicio para eliminar una aeronave por su ID
export async function deleteAirCraft(aircraftId) {
    try{

       const aircraftDoc = await airCraft.findById(aircraftId); 
        if (!airCraft) {
            throw new Error("Aircraft not found");
        }

        await airCraft.deleteOne();
        return airCraft;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting the aircraft: " + error.message);
    }
}
  