import { z } from "zod";

export const createUserSchema = z.object({
  mail: z.string().email(),

  nombre: z.string().min(1),
  apellido: z.string().min(1),

  publicName: z.string().min(1),

  telefono: z.string().min(1),

  imgPerfil: z
    .string()
    .url()
    .default("https://example.com/default-profile.png"),

  cargo: z
    .string()
    .default("paciente"),

  password: z.string().min(6, "Password muy corta"),

  provider: z.enum(["local", "google"]).default("local"),
});
