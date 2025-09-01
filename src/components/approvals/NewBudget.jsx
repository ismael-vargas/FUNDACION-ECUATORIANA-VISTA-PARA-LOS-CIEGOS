import { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/16/solid";
import { getServices, newBudget } from "../../services/budgets";
import Alert from "../Alerts";
import { SessionContext } from "../../context/SessionContext";

export const NewBudget = () => {
    const { userToken } = useContext(SessionContext);
    const { register, handleSubmit, formState: { errors }, watch, reset, control, setValue } = useForm();
    const [services, setServices] = useState(null);
    const [showAlert, setShowAlert] = useState(false);    
    const budgetDetails = watch('budgetDetails');
    const subTotal = watch('total');
    const [recalculate, setRecalculate] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const findServices = async () => {
            const services = await getServices();            
            setServices(services);
        }
        findServices();
    }, [showAlert]);

    useEffect(() => {        
        const subtotal = Math.max(0, budgetDetails?.reduce((sum, item) => sum + (item.cost || 0), 0));
        // const subtotal = budgetDetails?.reduce((sum, item) => sum + (item.cost || 0), 0);  
        setValue('total', subtotal);
        setValue('finalTotal', subtotal);
    }, [recalculate]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "budgetDetails",
        rules: {
            required: "Agrega al menos un servicio"
        }
    });


    const onSubmit = async (data) => {
        console.log(data);
        const budget = await newBudget(userToken, data);
        if (budget) {
            console.log(budget);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2500);
            reset();
            reset({budgetDetails:[]});
        }
    }

    return (
        <div className="flex flex-col justify-center mt-0 gap-2 text-center mb-4">
            <form className="mx-auto w-3/4 text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-2 rounded-lg items-end">
                    <h1 className="text-center text-white w-full font-bold text-xl md:text-3xl py-5">Nuevo presupuesto</h1>
                    <div className="flex flex-row w-full justify-between ">
                        <h1 className="text-white w-full font-medium text-base md:text-2xl ">Detalles</h1>
                        <button
                            type="button"
                            className="w-2/3 md:w-1/5 p-2 rounded-md bg-green-800 shadow-md text-xs md:text-base text-white hover:scale-105 transition-all duration-300"
                            onClick={() => {
                                append({
                                    service: '',
                                    discount: 0,
                                    observations: '',
                                    cost: 0,
                                })
                                setDisabled(true)
                            }}>
                            Agregar servicio
                        </button>
                    </div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex w-full py-5 gap-4 border-y-2">
                            <div className="flex flex-col w-4/5 gap-y-2">
                                <label className="text-white">Service:</label>
                                <Controller
                                    control={control}
                                    name={`budgetDetails.${index}.service`}
                                    rules={{ required: {value:true, message: "Seleccion un servicio primero"} }}
                                    render={({ field: { onChange, value } }) => (
                                        <select
                                            className="rounded-md focus:outline-none p-2 text-sm"
                                            value={value}
                                            onChange={(e) => {
                                                setRecalculate(!recalculate)
                                                const selectedService = services.find((service) => service.name === e.target.value);
                                                onChange(e.target.value);
                                                setValue(`budgetDetails.${index}.cost`, selectedService ? selectedService.cost - budgetDetails[index]?.discount : 0);
                                                setDisabled(false)
                                            }}
                                        >
                                            <option value="" disabled>Selecciona un servicio</option>
                                            {services.map((service) => (
                                                <option key={service.id} value={service.name}>
                                                    {service.name}
                                                </option>
                                            ))}
                                        </select>

                                    )}
                                />       
                                <p className="text-xs text-white" >{errors.budgetDetails ? errors.budgetDetails[index]?.service?.message : '' }</p>
                                <textarea
                                    className="rounded-md focus:outline-none p-2 mt-4 text-sm"
                                    placeholder="Observaciones acerca del servicio, descuento, etc.."
                                    type="text" {...register(`budgetDetails.${index}.observations`)} />
                            </div>
                            <div className="flex flex-col w-1/5 gap-y-2 text-end">
                                <label className="text-white">Discount:</label>
                                <input
                                    className="rounded-md focus:outline-none p-2 text-sm"
                                    placeholder="14%"
                                    type="number"
                                    {...register(`budgetDetails.${index}.discount`, {
                                        valueAsNumber: true,
                                        min: {value:0, message: "No puede ingresar valores negativos"},
                                        max: { value: 100, message: "El valor máximo es de 100 %" },
                                        disabled: disabled,                                        
                                        onChange: (e) => {
                                            const selectedService = services.find((service) => service.name === budgetDetails[index]?.service);
                                            const discount = selectedService ? Math.max(0, parseFloat(e.target.value) || 0) : 0;
                                            const discountPercentage = selectedService ? (discount / 100) * selectedService.cost : 0;
                                            const newCost = selectedService ? selectedService.cost - discountPercentage : 0;
                                            setRecalculate(!recalculate)
                                            setValue(`budgetDetails.${index}.cost`, newCost >= 0 ? newCost : 0);
                                        },
                                    })}
                                />
                                <p className="text-xs text-white" >{errors.budgetDetails ? errors.budgetDetails[index]?.discount?.message : '' }</p>
                                <label className="text-white">Cost:</label>
                                <input
                                    className="rounded-md focus:outline-none p-2 text-sm"
                                    type="number" {...register(`budgetDetails.${index}.cost`)} readOnly />
                                <button type="button"
                                    className="flex p-2 mx-6 mt-4 rounded-md bg-red-800 shadow-md justify-items-center justify-between text-white hover:scale-105 transition-all duration-300"
                                    onClick={() => {
                                        setRecalculate(!recalculate)
                                        remove(index)
                                    }
                                    }>
                                    Eliminar
                                    <TrashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {errors.budgetDetails?.root?.message && <p className="text-white text-xs">{errors.budgetDetails?.root?.message}</p>}
                    <label className="text-white w-full text-sm md:text-base">Observaciones</label>
                    <textarea {...register("observations", {
                    })}
                        type="text"
                        className={`rounded-md focus:outline-none w-full p-2 text-sm br ${errors.observations && 'border border-red-600'}`}
                        placeholder="Observaciones acerca del presupuesto, descuento, etc.."
                    />
                    {errors.observations && <p className="text-white text-xs">{errors.observations?.message}</p>}
                    <div className="flex flex-col gap-2 w-1/5">
                        <label className="text-white text-sm md:text-base">Subtotal</label>
                        <input {...register("total")}
                            type="number"
                            readOnly
                            className="rounded-md focus:outline-none p-2 text-sm"
                            placeholder="Subtotal"
                        />
                        {errors.total && <p className="text-white text-xs">{errors.total?.message}</p>}
                        <label className="text-white text-sm md:text-base">Descuento</label>
                        <input {...register("discount", {
                            min: {value:0, message: "No puede ingresar valores negativos"},                       
                            max: { value: 100, message: "El valor máximo es de 100%" },
                            valueAsNumber: true,
                            onChange: (e) => {                                
                                const discount = Math.max(0, parseFloat(e.target.value) || 0);
                                const discountPercentage = subTotal ? (discount / 100) * subTotal : 0;
                                
                                const total = subTotal - discountPercentage;
                                setValue('finalTotal', total >= 0 ? total : 0);
                            },
                        })}
                            type="number"
                            className={`rounded-md focus:outline-none p-2 text-sm br ${errors.discount && 'border border-red-600'}`}
                            placeholder="14 %"
                        />
                        {errors.discount && <p className="text-white text-xs">{errors.discount?.message}</p>}
                        <label className="text-white text-sm md:text-base">Total</label>
                        <input {...register("finalTotal")}
                            type="number"
                            className={`rounded-md focus:outline-none p-2 text-sm br ${errors.finalTotal && 'border border-red-600'}`}
                            placeholder="Total"
                            readOnly
                        />
                        {errors.finalTotal && <p className="text-white text-xs">{errors.finalTotal?.message}</p>}
                    </div>
                </div>
                <div className="flex justify-center space-x-3">
                    <button type="submit" className="p-2 rounded-md bg-indigo-950 text-white hover:scale-105 transition-all duration-300">
                        Crear nueva cita
                    </button>
                </div>
            </form>
            {showAlert &&
                <Alert
                    type="success"
                    title="Se ha registrado el presupuesto"
                    message="Revisa su aprobación pendiente"
                />
            }
        </div>
    )
}