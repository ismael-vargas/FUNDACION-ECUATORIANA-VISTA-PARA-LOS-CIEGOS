import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { findPatientCC } from "../../services/patientServices";
import { Roles } from "../../common/roles";

export const MyAppointments = () => {
    const { userID, userRole } = useContext(SessionContext);
    const [patientData, setPatientData] = useState();
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [render, setRender] = useState(true);

    useEffect(() => {
        if (userID) {
            const findPatient = async () => {
                const patient = await findPatientCC(+userID);
                console.log(patient);
                setPatientData(patient);
                const appointments = patient.appointments;
                const lastAppointment = appointments.length > 0 ? appointments[appointments.length - 1] : null;
                console.log(lastAppointment);
                setCurrentAppointment(lastAppointment);
            }
            findPatient();
        }
        console.log(userRole)
        if (userRole !== Roles.PATIENT) {
            setRender(false);
        }
    }, [userID]);

    const extractTime = (date) => {
        const time = date
        if (!time.includes("::")) {
            return "00:00:00";
        }
        return time.split("::")[1];
    }
    const onSubmit = async () => {
        console.log('se imprimio cita');
    }

    return (
        <div className="flex justify-center p-4 gap-8">
            {render &&
                <div className="flex flex-col w-1/3 text-start bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg">
                    <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Datos personales</h1>
                    <label className="text-white text-sm md:text-base">Número de identificación</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="1000000000"
                        defaultValue={patientData?.user.identification || ''}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Nombre</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={patientData?.user.name || ''}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Correo</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={patientData?.user.email || ''}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Teléfono</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={patientData?.phone || ''}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Género</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={patientData?.gender || ''}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Fecha de nacimiento</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={patientData?.dateBirth || ''}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Dirección</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={patientData?.address || ''}
                        disabled
                    />
                </div>
            }
            <div className="w-2/3 text-start">
                <div className="flex flex-col w-full bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg">
                    <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Cita pendiente</h1>
                    <div className="grid grid-cols-4 gap-2 pt-2 items-center">
                        <label className="text-white text-sm md:text-base">Fecha</label>
                        <input
                            type="text"
                            className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                            placeholder="Nombre completo"
                            defaultValue={currentAppointment?.date || ''}
                            disabled
                        />
                        <label className="text-white text-sm md:text-base">Hora</label>
                        <input
                            type="text"
                            className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                            placeholder="Nombre completo"
                            defaultValue={currentAppointment?.date ? extractTime(currentAppointment?.date) : ''}
                            disabled
                        />
                    </div>
                    <label className="text-white text-sm md:text-base">Estado</label>
                    <input
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={currentAppointment?.status}
                        disabled
                    />
                    <label className="text-white text-sm md:text-base">Estado</label>
                    <textarea
                        type="text"
                        className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                        placeholder="Nombre completo"
                        defaultValue={currentAppointment?.description}
                        disabled
                    />
                </div>
                <div className="flex justify-center space-x-3">
                    <button onClick={onSubmit} className="p-2 rounded-md bg-indigo-950 text-white hover:scale-105 transition-all duration-300">
                        Imprimir Cita
                    </button>
                </div>
            </div>

        </div>
    )
}