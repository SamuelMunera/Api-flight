//Importaciones generales 
import {createAirport, updateAirport, getAllAirports, getAirportById, deleteAirport} from "../Services/airportService.js";

//Controladores para crear un aeropuerto
export async function newAirport (req, res){
    try {
        const {OACI, name, city, country} = req.body;

        if (!OACI || !name || !city || !country) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newAirport = await createAirport({ OACI, name, city, country });
        return res.status(201).json(newAirport);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error creating airport"});
    }
};

//Controladores para actualizar un aeropuerto 
export async function editAirport (req, res){
    try {
        const {id} = req.params;
        const updateData = req.body;

        const airportToUpdate = await getAirportById(id);
        if (!airportToUpdate) {
            return res.status(404).json({message: "Airport not found"});
        }
        const updatedAirport = await updateAirport(airportToUpdate, updateData);

        return res.status(200).json(updatedAirport);
    }catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error updating airport"});
    }
};

//Controladores para obtener todos los aeropuertos
export async function listAirports (req, res){
    try {
        const airports = await getAllAirports();
        return res.status(200).json(airports);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Controladores para obtener un aeropuerto por su ID
export async function getAirport (req, res){
    const { id } = req.params;
    try {
        const airport = await getAirportById(id);
        return res.status(200).json(airport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};

//Controladores para eliminar un aeropuerto
export async function deleteAirportById (req, res){
        try {
        const { id } = req.params;
        const deletedAircraft = await deleteAirport(id);
        return res.status(200).json({message: "Airport deleted", airport: deletedAircraft});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};
