import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { clinicalHistory } from "../../services/appointmets";

export const ClinicalHistory = () => {
    const { userID } = useContext(SessionContext);
    const [histories, setHistories] = useState();

    useEffect(() => {
        if (userID) {
            console.log(userID);
            const getHistory = async () => {
                const histories = await clinicalHistory(userID);
                console.log(histories);
                setHistories(histories);
            }
            getHistory();
        }
    }, [userID]);

    const extractTime = (date) => {
        const time = date
        if (!time.includes("T")) {
            return "00:00:00";
        }
        return time.split("T")[1];
    }
    const onSubmit = async () => {
        console.log('se imprimio historial');
    }

    return (
        <div className="flex justify-center p-4 gap-8">
            <div className="flex flex-col w-full bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg">
                <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Historial Clinico</h1>
                {histories && histories.map((history) => (
                    <div key={history.id} className="flex flex-col text-start gap-3 border-b-4 pb-4">
                        <>
                            <div className="flex justify-between gap-2 pt-2 items-center">
                                <p className="text-white text-md md:text-xl font-medium text-start">Detalles de la cita: </p>
                                <label className="text-white text-sm md:text-base">Fecha</label>
                                <input
                                    type="text"
                                    className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                    defaultValue={history?.appointment?.date || ''}
                                    disabled
                                />
                                <label className="text-white text-sm md:text-base">Hora</label>
                                <input
                                    type="text"
                                    className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                    defaultValue={history.appointment?.createdAt ? extractTime(history.appointment?.createdAt) : ''}
                                    disabled
                                />
                            </div>
                            {/* <label className="text-white text-sm md:text-base">Estado de la cita</label>
                            <input
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                defaultValue={history?.appointment?.status}
                                disabled
                            /> */}
                            <label className="text-white text-sm md:text-base">Médico de turno</label>
                            <input
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                defaultValue={history?.appointment?.doctor?.user?.name}
                                disabled
                            />
                            <label className="text-white text-sm md:text-base">Descripción de la cita</label>
                            <textarea
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                defaultValue={history?.treatment}
                                disabled
                            />
                            <label className="text-white text-sm md:text-base">Diagnóstico</label>
                            <textarea
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                defaultValue={history?.diagnosis}
                                disabled
                            />
                            <label className="text-white text-sm md:text-base">Tratamiento</label>
                            <textarea
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                defaultValue={history?.treatment}
                                disabled
                            />
                            {history?.description &&
                                <>
                                    <label className="text-white text-sm md:text-base">Descripción post Cita</label>
                                    <textarea
                                        type="text"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                        defaultValue={history?.description}
                                        disabled
                                    />
                                </>
                            }
                            {history?.notes &&
                                <>
                                    <label className="text-white text-sm md:text-base">Notas</label>
                                    <textarea
                                        type="text"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                        defaultValue={history?.notes}
                                        disabled
                                    />
                                </>
                            }
                        </>
                    </div>
                ))}
                <div className="flex justify-center space-x-3">
                    <button onClick={onSubmit} className="p-2 rounded-md bg-indigo-950 text-white hover:scale-105 transition-all duration-300">
                        Imprimir
                    </button>
                </div>
            </div>

        </div>
    )
}