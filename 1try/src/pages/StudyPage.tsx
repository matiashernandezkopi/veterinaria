import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudyByIdRequest, updateStudy } from "../services/studies";
import type { Study } from "../services/studies";
import { QRCodeSVG } from "qrcode.react";

function StudyPage() {
    const { id } = useParams();
    const [study, setStudy] = useState<Study | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [notas, setNotas] = useState<string[]>([]);
    const [hallazgos, setHallazgos] = useState<string[]>([]);
    const [diagnostico, setDiagnostico] = useState<string[]>([]);

    const [notaInput, setNotaInput] = useState("");
    const [hallazgoInput, setHallazgoInput] = useState("");
    const [diagnosticoInput, setDiagnosticoInput] = useState("");

    const [notaIndex, setNotaIndex] = useState<number>(0);
    const [hallazgoIndex, setHallazgoIndex] = useState<number>(0);
    const [diagnosticoIndex, setDiagnosticoIndex] = useState<number>(0);

    useEffect(() => {
        if (!id) return;

        const fetchStudy = async () => {
            try {
                const data = await getStudyByIdRequest(id);
                setStudy(data);
                setNotas(data.notas || []);
                setHallazgos(data.hallazgos || []);
                setDiagnostico(data.diagnostico || []);
            } catch (err: any) {
                setError(err.response?.data?.message || "Error cargando estudio");
            } finally {
                setLoading(false);
            }
        };

        fetchStudy();
    }, [id]);

    const handleSave = async () => {
        try {
            if (!study || !id) return;
            await updateStudy(id, { notas, hallazgos, diagnostico });
            alert("Estudio actualizado correctamente!");
        } catch (err: any) {
            alert("Error guardando cambios");
        }
    };

    const addNota = () => {
        if (!notaInput.trim()) return;
        setNotas([...notas, notaInput.trim()]);
        setNotaInput("");
        setNotaIndex(notas.length);
    };

    const addHallazgo = () => {
        if (!hallazgoInput.trim()) return;
        setHallazgos([...hallazgos, hallazgoInput.trim()]);
        setHallazgoInput("");
        setHallazgoIndex(hallazgos.length);
    };

    const addDiagnostico = () => {
        if (!diagnosticoInput.trim()) return;
        setDiagnostico([...diagnostico, diagnosticoInput.trim()]);
        setDiagnosticoInput("");
        setDiagnosticoIndex(diagnostico.length);
    };

    if (loading) return <p className="text-gray-500 dark:text-gray-300">Cargando estudio...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!study) return <p className="text-gray-500 dark:text-gray-300">Estudio no encontrado</p>;

    const renderCarousel = (items: string[], index: number, setIndex: (i: number) => void) => {
        if (items.length === 0) return <p className="text-gray-400">No hay elementos</p>;
        return (
            <div className="flex flex-col items-center mb-4">
                <div className="w-full p-4 bg-gray-100 dark:bg-neutral-800 rounded h-40 overflow-y-auto mb-2">
                    {[...items].reverse()[index]}
                </div>
                <div className="flex justify-between w-full max-w-xs">
                    <button
                        onClick={() => setIndex(index > 0 ? index - 1 : index)}
                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Anterior
                    </button>
                    <span className="text-gray-700 dark:text-gray-300">{index + 1} / {items.length}</span>
                    <button
                        onClick={() => setIndex(index < items.length - 1 ? index + 1 : index)}
                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 bg-white dark:bg-neutral-900 rounded-lg shadow max-w-4xl mx-auto mt-6">
            <div className=" flex justify-between items-center">
                <div>

                    <h1 className="text-2xl font-bold mb-4">{study.tipoEstudio.toUpperCase()}</h1>
                    <p><strong>Paciente:</strong> {study.paciente}</p>
                    <p><strong>Tutor:</strong> {study.tutor}</p>
                    <p><strong>Estado:</strong> {study.estado}</p>
                    <p><strong>Fecha:</strong> {new Date(study.fecha).toLocaleDateString()}</p>
                </div>

                {/* QR */}
                {id && (
                    <div className="mt-8 flex flex-col items-center">
                        <QRCodeSVG value={`${window.location.origin}/qr/${id}`} size={150} />

                    </div>
                )}

            </div>

            {/* Notas */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Notas</h2>
                {renderCarousel(notas, notaIndex, setNotaIndex)}
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        value={notaInput}
                        onChange={(e) => setNotaInput(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Agregar nueva nota..."
                    />
                    <button
                        onClick={addNota}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            {/* Hallazgos */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Hallazgos</h2>
                {renderCarousel(hallazgos, hallazgoIndex, setHallazgoIndex)}
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        value={hallazgoInput}
                        onChange={(e) => setHallazgoInput(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Agregar nuevo hallazgo..."
                    />
                    <button
                        onClick={addHallazgo}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            {/* Diagnóstico */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Diagnóstico</h2>
                {renderCarousel(diagnostico, diagnosticoIndex, setDiagnosticoIndex)}
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        value={diagnosticoInput}
                        onChange={(e) => setDiagnosticoInput(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Agregar nuevo diagnóstico..."
                    />
                    <button
                        onClick={addDiagnostico}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            {/* Botón Guardar */}
            <button
                onClick={handleSave}
                className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Guardar cambios
            </button>


        </div>
    );
}

export default StudyPage;
