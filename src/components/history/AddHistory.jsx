import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { addHistory } from "../../services/histories";
export const AddHistory = ({ id, appointment, isOpen, onClose }) => {
    console.log(id, appointment);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            patientCC: id,
            appointment: appointment.id,
            appointmentDescription: appointment.description || "",
        }
    });
    if (!isOpen) return null;

    const handleClose = (e) => {
        if (e.target.id === "modal-container") onClose();
    };

    const onSubmit = async (data) => {        
        delete data.appointmentDescription
        const history = data
        console.log(history);
        const response = await addHistory(history);
        console.log('response', response);
        if (response) {
            onClose();
            reset();
        }
    }

    return (
        <div id="modal-container" onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center bg-black bg-opacity-5 justify-center backdrop-blur-sm">
            <form className="mx-auto w-3/4 text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full bg-[#011A27] gap-2 p-4 my-2 rounded-lg">
                    <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Agregar historia</h1>
                    <label className="text-white text-sm md:text-base">Cita:</label>
                    <input {...register("appointmentDescription")}
                        type="text"
                        className={`rounded-md focus:outline-none p-2 text-black text-sm `}
                        placeholder="Detalles"
                        disabled
                    />                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <label className="flex flex-col text-white pt-4 text-sm md:text-base">Tratamiento
                            <textarea {...register("treatment", {
                                required: "Este campo es requerido",
                                maxLength: { value: 200, message: "Solo puede ingresar hasta 200 caracteres" }
                            })}
                                type="text"
                                className={`rounded-md focus:outline-none p-2 text-black text-sm br ${errors.treatment && 'border border-red-600'}`}
                                placeholder="Detalles"
                            />
                            <span className="h-2">{errors.treatment && <p className="text-white text-sm">{errors.treatment?.message}</p>}</span>
                        </label>
                        <label className="flex flex-col text-white pt-4 text-sm md:text-base">Diagnóstico
                            <textarea {...register("diagnosis", {
                                required: "Este campo es requerido",
                                maxLength: { value: 200, message: "Solo puede ingresar hasta 200 caracteres" }
                            })}
                                type="text"
                                className={`rounded-md focus:outline-none p-2 text-black text-sm br ${errors.diagnosis && 'border border-red-600'}`}
                                placeholder="Detalles"
                            />
                            <span className="h-2">{errors.diagnosis && <p className="text-white text-sm">{errors.diagnosis?.message}</p>}</span>
                        </label>
                        <label className="flex flex-col text-white pt-4 text-sm md:text-base">Descripción
                            <textarea {...register("description", {                                
                                maxLength: { value: 200, message: "Solo puede ingresar hasta 200 caracteres" }
                            })}
                                type="text"
                                className={`rounded-md focus:outline-none p-2 text-black text-sm br ${errors.description && 'border border-red-600'}`}
                                placeholder="Detalles"
                            />
                            <span className="h-2">{errors.description && <p className="text-white text-sm">{errors.description?.message}</p>}</span>
                        </label>
                        <label className="flex flex-col text-white pt-4 text-sm md:text-base">Notas
                            <textarea {...register("notes", {
                                maxLength: { value: 200, message: "Solo puede ingresar hasta 200 caracteres" }
                            })}
                                type="text"
                                className={`rounded-md focus:outline-none p-2 text-black text-sm br ${errors.notes && 'border border-red-600'}`}
                                placeholder="Detalles"
                            />
                            <span className="h-2">{errors.notes && <p className="text-white text-sm">{errors.notes?.message}</p>}</span>
                        </label>
                    </div>
                        <button type="submit" className="p-2 my-4 rounded-md bg-green-600 text-white hover:scale-95 transition-all duration-300">
                            Agregar
                        </button>                  
                </div>
            </form>
        </div>
    );
};


AddHistory.propTypes = {
    id: PropTypes.number.isRequired,
    appointment: PropTypes.object.isRequired,
};

