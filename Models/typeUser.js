//Importaciones generales
import mongoose from "mongoose";    

//Creamos el modelo de tipo de usuario con sus respectivos campos y validaciones
const typeUserSchema = new mongoose.Schema({
    name: {
        type: String,   
        required:[true, "The name of the user type is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "The description of the user type is required"]
    }
}, 
{ timestamps: true });

const TypeUser = mongoose.model("TypeUser", typeUserSchema);
export default TypeUser;