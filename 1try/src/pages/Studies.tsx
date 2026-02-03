import { useEffect, useState } from "react";
import { getStudiesRequest, type Study } from "../services/studies";
import { Link } from "react-router-dom";

function Studies() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudies = async () => {
      setLoading(true);
      try {
        const data = await getStudiesRequest();
        setStudies(data);
      } catch (err) {
        setError("Error cargando estudios");
      } finally {
        setLoading(false);
      }
    };

    loadStudies();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (studies.length === 0) return <p className="text-center mt-10">No hay estudios</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Estudios</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <th className="px-4 py-2 text-left text-gray-700 dark:text-neutral-200">Paciente</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-neutral-200">Tutor</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-neutral-200">Tipo</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-neutral-200">Estado</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-neutral-200">Fecha</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-neutral-200">Acción</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((s) => (
              <tr key={s._id} className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                <td className="px-4 py-2">{s.paciente}</td>
                <td className="px-4 py-2">{s.tutor}</td>
                <td className="px-4 py-2">{s.tipoEstudio}</td>
                <td className="px-4 py-2">{s.estado}</td>
                <td className="px-4 py-2">{new Date(s.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/studies/${s._id}`}
                    className="text-cyan-500 hover:text-cyan-400"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Studies;
