import Study from "../models/study.js";

import { createStudySchema, updateStudySchema } from "../schemas/study.schema.js";

export const deleteStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const study = await Study.findById(id);
    if (!study) {
      return res.status(404).json({ message: "Estudio no encontrado" });
    }

    if (study.profesionalACargo.toString() !== userId) {
      return res.status(403).json({
        message: "Solo el profesional a cargo puede eliminar",
      });
    }

    await study.deleteOne();

    res.json({ message: "Estudio eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando estudio" });
  }
};


export const updateStudy = async (req, res) => {
  try {
    const { id } = req.params;

    const study = await Study.findById(id);
    if (!study) {
      return res.status(404).json({ message: "Estudio no encontrado" });
    }
    

    const data = updateStudySchema.parse(req.body);


    Object.assign(study, data);
    await study.save();

    res.json(study);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(error.errors);
    }
    console.error(error);
    res.status(500).json({ message: "Error actualizando estudio" });
  }
};


export const createStudy = async (req, res) => {
  try {
    const parsed = createStudySchema.parse(req.body);

    const study = await Study.create({
      ...parsed,
      profesionalACargo: req.user.id,
    });

    res.status(201).json(study);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(error.errors);
    }

    console.error(error);
    res.status(500).json({ message: "Error creando estudio" });
  }
};



// 👉 GET GENERAL
export const getStudies = async (req, res) => {
  try {
    const userId = req.user.id;

    const studies = await Study.find(
      {
        $or: [
          { dueño: userId },
          { profesionalACargo: userId }
        ]
      },
      "paciente tutor tipoEstudio estado fecha"
    ).sort({ fecha: -1 });

    res.json(studies);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo estudios" });
  }
};

export const getStudyById = async (req, res) => {
  try {
    const { id } = req.params;

    const study = await Study.findById(id)
      .populate("profesionalACargo", "mail nombre apellido cargo")
      .populate("dueño", "mail nombre apellido");

    if (!study) {
      return res.status(404).json({ message: "Estudio no encontrado" });
    }

    res.json(study);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo estudio" });
  }
};

