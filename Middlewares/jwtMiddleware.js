//Importaciones generales 
import jwt from "jsonwebtoken";

//Middleware para obtener el token 
export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // { id, typeUser: "admin" | "general" }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.typeUser)) {
      return res.status(403).json({ message: "Sin permisos para esta acción" });
    }
    next();
  };
}

