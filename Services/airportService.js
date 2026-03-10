//Importaciones generales
import airport from "../Models/airport.js";

//Servicio para crear un aeropuerto
export async function createAirport(data) {
    try {
        const { OACI, name, city, country } = data;
        
        const verifyAirport = await airport.findOne({ name });
        if(verifyAirport) {
            throw new Error("Airport name already in use");
        }
        const newAirport = new airport({ OACI, name, city, country });
        await newAirport.save();
 
        return newAirport;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating airport: " + error.message);
    }
};

//Servicio para modificar un aeropuerto
export async function updateAirport(airportToUpdate, updateData) {
    try{ 
        const { OACI, name, city, country } = updateData;
 
        //Validar que haya por lo menos un campo para actualizar
        if (!OACI && !name && !city && !country) {
            throw new Error("At least one field must be provided for update");
        }
 
        //Actualizar solo los campos que se proporcionen
        if (OACI) airportToUpdate.OACI = OACI;
        if (name) airportToUpdate.name = name;
        if (city) airportToUpdate.city = city;
        if (country) airportToUpdate.country = country;

        await airportToUpdate.save();
        return airportToUpdate;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating airport: " + error.message);
    }

};

//Servicio para obtener todos los aeropuertos
export async function getAllAirports()  {
    try{
        return await airport.find();
    
    } catch (error) {
        throw new Error("Error obtaining airport list: " + error.message);
    }
};

//Servicio para obtener un aeropuerto por su ID
export async function getAirportById(airportId) {
    try {
        return await airport.findById(airportId);
    } catch (error) {
        throw new Error("Error obtaining airport: " + error.message);
    }   
};

//Servicio para eliminar un aeropuerto por su ID
export async function deleteAirport(airportId) {
    try {

        const airportDoc = await airport.findById(airportId);
        if (!airport) {
            throw new Error("Airport not found");
        }

        await airport.deleteOne();
        return airport;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting airport: " + error.message);
    } 
};   