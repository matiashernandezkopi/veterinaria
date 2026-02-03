import  User  from "../models/user.js";
import { createUserSchema } from "../schemas/user.schema.js";

// 👉 Crear usuario
export const createUser = async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await User.create(data);

    res.status(201).json({
      id: user._id,
      mail: user.mail,
      publicName: user.publicName,
      imgPerfil: user.imgPerfil,
    });
  } catch (error) {
    if (error.name === "ZodError") {
        console.log("ERROR COMPLETO:", error);
        console.log("ERROR NAME:", error.name);
        console.log("ERROR MESSAGE:", error.message);

        return res.status(400).json({
            name: error.name,
            message: error.message,
            error,
        });
    }
    console.error("🔥 ERROR REAL:", error);
    res.status(500).json({
        message: "Error interno",
        error: error.message,
    });
  }
};

// 👉 Listar todos (solo publicName, mail, imgPerfil)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "publicName mail imgPerfil");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
};

// 👉 Obtener usuario por ID (completo)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario" });
  }
};

// 👉 Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Si el password viene, se hashea automáticamente por el hook
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario" });
  }
};

// 👉 Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario" });
  }
};
