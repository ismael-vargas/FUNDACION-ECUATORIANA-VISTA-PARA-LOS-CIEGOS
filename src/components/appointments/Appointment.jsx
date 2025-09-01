import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { getDoctors } from "../../services/doctorServices";
import { findPatientCC } from "../../services/patientServices";
import { newAppointment } from "../../services/appointmets";
import Alert from "../Alerts";

export const Appointment = () => {
    const { userEmail } = useContext(SessionContext)
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [patientData, setPatientData] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const patientID = watch("patientId");    

    useEffect(() => {
        const findDoctors = async () => {
            const doctors = await getDoctors();
            console.log(doctors);
            setDoctors(doctors);
        }
        findDoctors();
    }, []);

    useEffect(() => {
        if (patientID && patientID.length >= 8) {
            const findPatient = async () => {
                const patient = await findPatientCC(patientID);
                console.log(patient);
                setPatientData(patient);
            }
            findPatient();
        }
    }, [patientID]);

    const onSubmit = async (data) => {
        const { patientId, date, time, ...appointment } = data
        const newAppointmentData = {
            ...appointment,
            patient: patientData.id,
            user: userEmail,
            date: `${data.date}::${data.time}`
        }
        console.log(newAppointmentData);
        if (newAppointmentData) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            reset();
        }
        try {
            const response = await newAppointment(newAppointmentData);
            console.log(response);
            if (response) {
                setShowAlert(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center mt-0 gap-2 text-center">
            <form className="mx-auto w-3/4 text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg">
                    <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Agendamiento de cita</h1>
                    <label className="text-white text-sm md:text-base">Número de identificación</label>
                    <input {...register("patientId", {
                        required: "Este campo es requerido",
                        minLength: { value: 8, message: "Debes ingresar al menos 10 dígitos" },
                        maxLength: { value: 13, message: "Solo puede ingresar hasta 13 dígitos" }
                    })}
                        type="text"
                        className={`rounded-md focus:outline-none p-2 text-sm br ${errors.patientId && 'border border-red-600'}`}
                        placeholder="1000000000"
                    />
                    {errors.patientId && <p className="text-white text-xs">{errors.patientId?.message}</p>}
                    {patientData && <>
                        <label className="text-white text-sm md:text-base">Nombre completo</label>
                        <input
                            type="text"
                            className="rounded-md focus:outline-none p-2 text-sm shadow-md hover:bg-white"
                            placeholder="Nombre completo"
                            value={patientData?.user.name}
                            disabled
                        />
                        <label className="text-white text-sm md:text-base">Selecciona un médico</label>
                        <select {...register("doctor", { required: true })}
                            className={`border text-sm rounded-lg p-2 focus:outline-none ${errors.doctor && 'border border-red-600'}`}>
                            <option className="font-bold text-gray-400" value="" >Seleccionar</option>
                            {doctors && doctors.map((doctor, key) => (
                                <option key={key} value={doctor.id}>{doctor.user.name}</option>
                            ))}
                        </select>
                        {errors.doctor && <p className="text-white text-xs pb-4">Debes seleccionar un doctor</p>}
                        <div className="flex justify-between items-center pt-2">
                            <label className="text-white text-sm md:text-base mb-1">Fecha de cita</label>
                            <input
                                {...register("date", {
                                    required: true,
                                })}
                                type="date"
                                className={`rounded-md focus:outline-none p-2 text-sm br ${errors.date ? 'border border-red-600' : ''}`}
                                min={new Date().toISOString().split("T")[0]}
                                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                            />
                            <label className="text-white text-sm md:text-base mb-1">Horario</label>
                            <input
                                {...register("time", {
                                    required: true,
                                })}
                                type="time"
                                className={`rounded-md focus:outline-none p-2 text-sm br ${errors.time ? 'border border-red-600' : ''}`}
                                step="3600"
                            />
                        </div>
                        <label className="text-white pt-4 text-sm md:text-base">Descripción</label>
                        <textarea {...register("description", {
                            required: "Este campo es requerido",
                            maxLength: { value: 200, message: "Solo puede ingresar hasta 200 caracteres" }
                        })}
                            type="text"
                            className={`rounded-md focus:outline-none p-2 text-sm br ${errors.description && 'border border-red-600'}`}
                            placeholder="Detalles"
                        />
                        {errors.description && <p className="text-white text-sm">{errors.description?.message}</p>}
                    </>}
                </div>
                <div className="flex justify-center space-x-3">
                    <button type="submit" className="p-2 rounded-md bg-indigo-950 text-white hover:scale-105 transition-all duration-300">
                        Agendar Cita
                    </button>
                </div>
            </form>
            {showAlert &&
                <Alert
                    type="success"
                    title="Se ha registrado su cita"
                    message="¡Esperamos su pronta visita!"
                />
            }
        </div>
    )
}