//Importaciones generales 
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Controlador para el login 
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    // Buscar usuario NO eliminado + populate del typeUser
    const user = await User.findOne({ 
      email, 
      deletedAt: null 
    }).populate("typeUser");

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // typeUser.name es 'general' o 'admin' después del populate
    const payload = {
      id: user._id,
      typeUser: user.typeUser.name  // 'general' | 'admin'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    return res.json({
      token,
      name: user.name,
      typeUser: payload.typeUser,
      userId: user._id
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error al validar credenciales" });
  }
}

export default { login };
