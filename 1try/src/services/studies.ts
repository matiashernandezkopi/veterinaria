// services/study.ts
import api from "../lib/axios";

export type Study = {
  _id: string;
  paciente: string;
  tutor: string;
  tipoEstudio: "ecografia" | "radiografia";
  estado: "en_progreso" | "publico";
  fecha: string;

  // Agregamos los campos que vienen completos del backend
  mascota: {
    especie: string;
    nombre: string;
    edad: { años: number; meses: number };
    peso: { valor: number; unidad: "kg" | "lb" };
    genero: "macho" | "hembra";
    castrado: boolean;
  };

  fotos?: string[];

  profesionalACargo: {
    _id: string;
    nombre: string;
    apellido: string;
    mail: string;
    cargo: string;
  };

  dueño: {
    _id: string;
    nombre: string;
    apellido: string;
    mail: string;
  };

  diagnostico?: string[];
  hallazgos?: string[];
  notas?: string[];
};

export const getStudiesRequest = async (): Promise<Study[]> => {
  const { data } = await api.get("/studies");
  return data;
};

export const getStudyByIdRequest = async (id: string): Promise<Study> => {
  const { data } = await api.get(`/studies/${id}`);
  return data;
};

export type CreateStudyRequest = {
  paciente: string;
  tutor: string;
  tipoEstudio: "ecografia" | "radiografia";
  estado: "en_progreso" | "publico";
  fecha: string;
  mascota: {
    especie: string;
    nombre: string;
    edad: { años: number; meses: number };
    peso: { valor: number; unidad: "kg" | "lb" };
    genero: "macho" | "hembra";
    castrado: boolean;
  };
  fotos?: string[];
  dueño: string;
  diagnostico?: string[];
hallazgos?: string[];
notas?: string[];

};

export const createStudyRequest = async (study: CreateStudyRequest): Promise<Study> => {
  const { data } = await api.post("/studies", study);
  return data;
};

export const updateStudy = async (
  id: string,
  data: { notas?: string[]; hallazgos?: string[]; diagnostico?: string[] }
) => {
  const { data: response } = await api.put(`/studies/${id}`, data);
  return response;
};