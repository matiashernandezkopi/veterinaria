import { z } from "zod";

export const createStudySchema = z.object({
  paciente: z.string().min(1),
  tutor: z.string().min(1),

  tipoEstudio: z.enum(["ecografia", "radiografia"]),
  estado: z.enum(["en_progreso", "publico"]),

  fecha: z.string(), // ISO date

  mascota: z.object({
    especie: z.string().min(1),
    nombre: z.string().min(1),
    edad: z.object({
      años: z.number().min(0),
      meses: z.number().min(0).max(11),
    }),
    peso: z.object({
      valor: z.number().positive(),
      unidad: z.enum(["kg", "lb"]),
    }),
    genero: z.enum(["macho", "hembra"]),
    castrado: z.boolean(),
  }),

  fotos: z.array(z.string().url()).optional(),

  dueño: z.string(), // userId (paciente)

  notas: z.array(z.string()).optional(),
  hallazgos: z.array(z.string()).optional(),
  diagnostico: z.array(z.string()).optional(),
});

export const updateStudySchema = createStudySchema.partial();
