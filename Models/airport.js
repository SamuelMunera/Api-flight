//Importaciones generales 
import mongoose from "mongoose";

//Creamos el modelo de aeropuertos con sus respectivos campos y validaciones
const airportSchema = new mongoose.Schema({
  OACI: { type: String,
    required: [true, "OACI code is required"]
    },

  name: { type: String,
    required: [true, "Name is required"]
    },

  city: { type: String,
    required: [true, "City is required"]
    },

  country: { type: String,
    required: [true, "Country is required"] 
    },
});

const Airport = mongoose.model("Airport", airportSchema);

export default Airport;
