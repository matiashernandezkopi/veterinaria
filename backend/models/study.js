import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
  paciente: { type: String, required: true },
  tutor: { type: String, required: true },
  tipoEstudio: { type: String, enum: ["ecografia", "radiografia"], required: true },
  estado: { type: String, enum: ["en_progreso", "publico"], required: true },
  fecha: { type: Date, required: true },

  mascota: {
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    edad: {
      años: { type: Number, required: true },
      meses: { type: Number, required: true },
    },
    peso: {
      valor: { type: Number, required: true },
      unidad: { type: String, enum: ["kg", "lb"], required: true },
    },
    genero: { type: String, enum: ["macho", "hembra"], required: true },
    castrado: { type: Boolean, required: true },
  },

  fotos: [{ type: String }],

  notas: [{ type: String }],
  hallazgos: [{ type: String }],
  diagnostico: [{ type: String }],

  dueño: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  profesionalACargo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Study", studySchema);
