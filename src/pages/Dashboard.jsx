import { useState } from "react";
import { Appointment } from "../components/appointments/Appointment";
import { MyAppointments } from "../components/appointments/MyAppointments";
import { Consultation } from "../components/appointments/Consultation";
import { ClinicalHistory } from "../components/history/clinicalHistory";

export const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('tab-1');    

    return (
        <div className="flex flex-col justify-center mt-0 gap-2 text-center">
            <div className="flex gap-4 p-4">
                <button onClick={() => setActiveComponent('tab-1')} className={`p-2 rounded-md ${activeComponent ==='tab-1' ? 'bg-indigo-950' : 'bg-slate-600'} hover:bg-indigo-950 text-white hover:scale-105 transition-all duration-300`}>
                    Mis Citas
                </button>
                <button onClick={() => setActiveComponent('tab-2')} className={`p-2 rounded-md ${activeComponent ==='tab-2' ? ' bg-indigo-950' : 'bg-slate-600'} hover:bg-indigo-950 text-white hover:scale-105 transition-all duration-300`}>
                    Agendamiento de Cita
                </button>
                <button onClick={() => setActiveComponent('tab-3')} className={`p-2 rounded-md ${activeComponent ==='tab-3' ? ' bg-indigo-950' : 'bg-slate-600'} hover:bg-indigo-950 text-white hover:scale-105 transition-all duration-300`}>
                    Historial clinico
                </button>
                <button onClick={() => setActiveComponent('tab-4')} className={`p-2 rounded-md ${activeComponent ==='tab-4' ? ' bg-indigo-950' : 'bg-slate-600'} hover:bg-indigo-950 text-white hover:scale-105 transition-all duration-300`}>
                    Consulta de citas
                </button>
            </div>
            {activeComponent === 'tab-1' && <MyAppointments />}
            {activeComponent === 'tab-2' && <Appointment />}
            {activeComponent === 'tab-3' && <ClinicalHistory />}
            {activeComponent === 'tab-4' && <Consultation />}
        </div>
    )
}