//Importaciones generales
import mongoose from "mongoose";
import "dotenv/config";

//Conexión a la base de datos utilizando Mongoose
const mongoUri = process.env.DB_URI;

async function connectDB() {
    try {
        const connection = await mongoose.connect(
            mongoUri
        );
        console.log("Se ha establecido conexión con la Base de Datos");
    } catch (err) {
        console.log(`Ups!, ha ocurrido un error -> ${err}`);
        process.exit(1);
    }
};

export default connectDB;