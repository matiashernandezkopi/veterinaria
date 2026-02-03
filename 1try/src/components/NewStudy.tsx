import { useState } from "react";
import { createStudyRequest, type CreateStudyRequest } from "../services/studies";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NewStudy() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  if (!user) {
    return (
        <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-300">Cargando usuario...</p>
        </div>
    );
    }

  const [form, setForm] = useState<CreateStudyRequest>({
    paciente: "",
    tutor: "",
    tipoEstudio: "ecografia",
    estado: "en_progreso",
    fecha: new Date().toISOString().slice(0, 10),
    mascota: {
      especie: "",
      nombre: "",
      edad: { años: 0, meses: 0 },
      peso: { valor: 0, unidad: "kg" },
      genero: "macho",
      castrado: false,
    },
    fotos: [],
    dueño: user?._id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes("mascota.")) {
      const path = name.split(".").slice(1); // ejemplo: ["edad", "años"]
      setForm((prev) => {
        let copy: any = { ...prev };
        let temp = copy.mascota;
        for (let i = 0; i < path.length - 1; i++) temp = temp[path[i]];
        temp[path[path.length - 1]] = type === "checkbox" ? checked : (type === "number" ? Number(value) : value);
        return copy;
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createStudyRequest(form);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creando estudio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-neutral-950 rounded-2xl ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Nuevo Reporte</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="paciente"
            value={form.paciente}
            onChange={handleChange}
            placeholder="Paciente"
            className="w-full p-2 border rounded dark:bg-neutral-800"
            required
          />
          <input
            type="text"
            name="tutor"
            value={form.tutor}
            onChange={handleChange}
            placeholder="Tutor"
            className="w-full p-2 border rounded dark:bg-neutral-800"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            name="tipoEstudio"
            value={form.tipoEstudio}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-neutral-800"
          >
            <option value="ecografia">Ecografía</option>
            <option value="radiografia">Radiografía</option>
          </select>

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-neutral-800"
          >
            <option value="en_progreso">En progreso</option>
            <option value="publico">Público</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-neutral-800 w-full"
          />
        </div>

        <h2 className="font-bold mt-4">Datos de la Mascota</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="mascota.especie"
            value={form.mascota.especie}
            onChange={handleChange}
            placeholder="Especie"
            className="w-full p-2 border rounded dark:bg-neutral-800"
            required
          />
          <input
            type="text"
            name="mascota.nombre"
            value={form.mascota.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-2 border rounded dark:bg-neutral-800"
            required
          />
            <div>
                <p className=" text-sm">años</p>
                <input
                    type="number"
                    name="mascota.edad.años"
                    value={form.mascota.edad.años}
                    onChange={handleChange}
                    placeholder="Edad (años)"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    min={0}
                />
            </div>
            <div>
                <p className=" text-sm">meses</p>
                <input
                    type="number"
                    name="mascota.edad.meses"
                    value={form.mascota.edad.meses}
                    onChange={handleChange}
                    placeholder="Edad (meses)"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    min={0}
                    max={11}
                />
            </div>

            <div>
                <p className=" text-sm">peso</p>
                <input
                    type="number"
                    name="mascota.peso.valor"
                    value={form.mascota.peso.valor}
                    onChange={handleChange}
                    placeholder="Peso"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    min={0}
                />
          </div>
          <select
            name="mascota.peso.unidad"
            value={form.mascota.peso.unidad}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-neutral-800"
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
          <select
            name="mascota.genero"
            value={form.mascota.genero}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-neutral-800"
          >
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="mascota.castrado"
              checked={form.mascota.castrado}
              onChange={handleChange}
              className="rounded"
            />
            Castrado
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded transition"
        >
          {loading ? "Creando..." : "Crear Reporte"}
        </button>
      </form>
    </div>
  );
}

export default NewStudy;
