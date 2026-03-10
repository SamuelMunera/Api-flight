//Importaciones generales 
import {createAirCraft, updateAirCraft, getAllAirCrafts, getAirCraftById, deleteAirCraft} from "../Services/aircraftService.js";


//Controlador para crear una aeronave
export async function newAirCraft(req, res) {
    try {
        const {name, type, enterprise} = req.body;
        if (!name || !type || !enterprise) {
            return res.status(400).json({message: "All fields are required"});
        }
        const newAirCraftResult = await createAirCraft({name, type, enterprise});  // ← OBJETO
        return res.status(201).json(newAirCraftResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

//Controlador para editar una aeronave
export async function editAirCraft(req, res) {
    try {
        const {id} = req.params;
        const updateData = req.body;
        
        const aircraftToUpdate = await getAirCraftById(id);
        if (!aircraftToUpdate) {
            return res.status(404).json({message: "AirCraft not found"});
        }
        
        const updatedAirCraft = await updateAirCraft(aircraftToUpdate, updateData);  // ← Objeto primero
        return res.status(200).json(updatedAirCraft);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

//Controlador para listar todas las aeronaves
export async function listAirCrafts(req, res) {
    try {
        const airCrafts = await getAllAirCrafts();
        return res.status(200).json(airCrafts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//Controlador para obtener una aeronave por su ID
export async function getAirCraft(req, res) {
    try {
        const {id} = req.params;
        const airCraft = await getAirCraftById(id);
        if (!airCraft) {
            return res.status(404).json({message: "AirCraft not found"});
        }
        return res.status(200).json(airCraft);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

//Controlador para eliminar una aeronave por su ID
export async function removeAirCraft(req, res) {
    try {
        const {id} = req.params;
        const deletedAirCraft = await deleteAirCraft(id);
        return res.status(200).json({message: "Aircraft deleted", aircraft: deletedAirCraft});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}