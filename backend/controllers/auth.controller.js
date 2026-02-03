import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { mail, password } = req.body;

  const user = await User.findOne({ mail }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      cargo: user.cargo,
      mail: user.mail,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      mail: user.mail,
      nombre: user.nombre,
      apellido: user.apellido,
      cargo: user.cargo,
      imgPerfil: user.imgPerfil,
      publicName: user.publicName,
    },
  });
};

export const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      _id: user._id,
      mail: user.mail,
      nombre: user.nombre,
      apellido: user.apellido,
      cargo: user.cargo,
      imgPerfil: user.imgPerfil,
      publicName: user.publicName,
    });
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};