//Importaciones generales 
import mongoose from "mongoose";

//Creamos el modelo de aviones con sus respectivos campos y validaciones
const airCraftSchema = new mongoose.Schema({
  name: { type: String, 
    required: [true, "Name is required"] 
  },

  type: { type: String,
     required: [true, "Type is required"] 
  },

  enterprise: { type: String, 
    required: [true, "Enterprise is required"] 
  },

});

const airCraft = mongoose.model("airCraft", airCraftSchema);
export default airCraft;
