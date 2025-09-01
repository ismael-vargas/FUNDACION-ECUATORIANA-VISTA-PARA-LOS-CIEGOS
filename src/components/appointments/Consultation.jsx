import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { findPatientCC } from "../../services/patientServices";
import { AddHistory } from "../history/AddHistory";

export const Consultation = () => {
    const { userRole } = useContext(SessionContext);
    const [appointments, setAppointments] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const extractTime = (date) => {
        const time = date
        if (!time.includes("::")) {
            return "00:00:00";
        }
        return time.split("::")[1];
    }

    const findPatient = async (id) => {
        const patient = await findPatientCC(+id);
        console.log(patient);
        const fetchedAppointments = patient.appointments;
        const orderedAppointments = [...fetchedAppointments].reverse();
        setAppointments(orderedAppointments);
    }

    const openModal = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
      };
    const onSubmit = async () => {
        console.log('se imprimio cita');
    }

    return (
        <div className="flex flex-col justify-center mt-0 gap-2 text-center">
            <div className="mx-auto w-3/4 text-start" >
                <div className="flex flex-col w-full bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg">
                    <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Consulta de citas</h1>
                    <label className="text-white text-sm md:text-base">Número de identificación</label>
                    <input
                        type="number"
                        className="rounded-md focus:outline-none p-2 text-sm br appearance-none 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="17*******0"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                    />
                    <button
                        className={`rounded-md p-2 text-white ${patientId.length >= 8 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                            }`}
                        onClick={() => findPatient(patientId)}
                        disabled={patientId.length < 8}
                    >
                        Consultar
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                    {appointments && appointments.map((appointment, index) => (
                        <div key={index}
                            className="flex flex-col w-full bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg">
                            <div className="text-center text-white font-medium text-xl md:text-3xl pb-4 py-2 flex justify-between">
                                <span>Cita {index + 1}</span>
                                {index === 0 && <button className="bg-black p-2 rounded-md text-sm cursor-pointer" onClick={() => openModal(appointment)}>Agregar historia</button>}                                
                            </div>
                            <div className="grid grid-cols-4 gap-2 pt-2 items-center">
                                <label className="text-white text-sm md:text-base">Fecha</label>
                                <input
                                    type="text"
                                    className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                    placeholder="Nombre completo"
                                    defaultValue={appointment?.date || ''}
                                    disabled
                                />
                                <label className="text-white text-sm md:text-base">Hora</label>
                                <input
                                    type="text"
                                    className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                    placeholder="Nombre completo"
                                    defaultValue={appointment?.date ? extractTime(appointment?.date) : ''}
                                    disabled
                                />
                            </div>
                            <label className="text-white text-sm md:text-base">Estado</label>
                            <input
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                placeholder="Nombre completo"
                                defaultValue={appointment?.status}
                                disabled
                            />
                            <label className="text-white text-sm md:text-base">Estado</label>
                            <textarea
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md bg-white hover:bg-gray-400"
                                placeholder="Nombre completo"
                                defaultValue={appointment?.description}
                                disabled
                            />
                            <div className="flex justify-center space-x-3">
                                <button onClick={onSubmit} className="p-2 rounded-md bg-indigo-950 text-white hover:scale-105 transition-all duration-300">
                                    Imprimir Cita
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
            {isOpen && <AddHistory id={+patientId} appointment={selectedItem} isOpen={isOpen} onClose={() => setIsOpen(false)} />}      
        </div>
    )
}