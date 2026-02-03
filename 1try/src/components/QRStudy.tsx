import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudyByIdRequest } from "../services/studies";
import type { Study } from "../services/studies";
import { QRCodeSVG } from "qrcode.react";
import DLMode from "./DLMode";

function QRStudy() {
    const { id } = useParams();
    const [study, setStudy] = useState<Study | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // índices solo para poder navegar si quieres más adelante
    const [notaIndex, setNotaIndex] = useState<number>(0);
    const [hallazgoIndex, setHallazgoIndex] = useState<number>(0);
    const [diagnosticoIndex, setDiagnosticoIndex] = useState<number>(0);

    useEffect(() => {
        if (!id) return;

        const fetchStudy = async () => {
            try {
                const data = await getStudyByIdRequest(id);
                setStudy(data);

                // solo mostrar el último de cada sección
                setNotaIndex((data.notas?.length || 1) - 1);
                setHallazgoIndex((data.hallazgos?.length || 1) - 1);
                setDiagnosticoIndex((data.diagnostico?.length || 1) - 1);
            } catch (err: any) {
                setError(err.response?.data?.message || "Error cargando estudio");
            } finally {
                setLoading(false);
            }
        };

        fetchStudy();
    }, [id]);

    if (loading) return <p className="text-gray-500 dark:text-gray-300">Cargando estudio...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!study) return <p className="text-gray-500 dark:text-gray-300">Estudio no encontrado</p>;

    // carrusel solo lectura
    const renderLastItem = (items?: string[], index?: number) => {
        if (!items || items.length === 0) return <p className="text-gray-400">No hay elementos</p>;
        return (
            <div className="w-full p-4 bg-gray-100 dark:bg-neutral-800 rounded h-40 overflow-y-auto">
                {items[index || 0]}
            </div>
        );
    };

    return (
        <div className="p-6 bg-white h-screen w-screen dark:bg-neutral-900 shadow dark:text-white">

            <div className=" absolute top-2 right-1/2">
                <DLMode/>
            </div>

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
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Última Nota</h2>
                {renderLastItem(study.notas, notaIndex)}
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Último Hallazgo</h2>
                {renderLastItem(study.hallazgos, hallazgoIndex)}
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Último Diagnóstico</h2>
                {renderLastItem(study.diagnostico, diagnosticoIndex)}
            </div>
        </div>
    );
}

export default QRStudy;
