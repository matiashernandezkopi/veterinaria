export type User = {
  _id: string;
  mail: string;
  nombre: string;
  apellido: string;
  cargo: "paciente" | "veterinario";
  imgPerfil: string;
  publicName: string;
};

export type LoginRequest = {
  mail: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
