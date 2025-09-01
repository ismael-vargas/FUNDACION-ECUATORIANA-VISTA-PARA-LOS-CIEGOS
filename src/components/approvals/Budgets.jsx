import { useContext, useEffect, useState } from "react";
import { findBudget, getBudgets, updateBudget } from "../../services/budgets";
import { SessionContext } from "../../context/SessionContext";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid"
import { useForm } from "react-hook-form";

export const Budgets = () => {
    const { userToken } = useContext(SessionContext);
    const [budgets, setBudgets] = useState([]);
    const [budget, setBudget] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, watch } = useForm();  
    const status = watch('status');

    useEffect(() => {
        if (userToken) {
            const fetchBudgets = async () => {
                const response = await getBudgets(userToken);
                console.log(response);
                setBudgets(response);
            };
            fetchBudgets();
        }
    }, [userToken, isEditing]);

    const formatDate = (data) => {
        const date = new Date(data);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        return `${day}-${month}-${year}`;
    };

    const findBudgdet = async (id) => {
        const budget = await findBudget(id, userToken);
        setBudget(budget);
        console.log(budget);
    };

    const onSubmit = async (data) => {
        console.log(data);
        const response = await updateBudget(userToken, budget.id, data);
        console.log(response);
        setIsEditing(false);
      };

    return (
        <div className="flex flex-col justify-center p-4 gap-4 text-center">
            <table className="border border-gray-300 min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 border-b">Observaciones</th>
                        <th className="py-2 px-4 border-b">Fecha de creación</th>
                        <th className="py-2 px-4 border-b">Subtotal</th>
                        <th className="py-2 px-4 border-b">Descuento</th>
                        <th className="py-2 px-4 border-b">Total</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                        <th className="py-2 px-4 border-b">Detalles</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {budgets.map((budget) => (
                        <tr key={budget.id}>
                            <td className="py-2 px-4 border-b break-words ">{budget.observations}</td>
                            <td className="py-2 px-4 border-b">{formatDate(budget.createdAt)}</td>
                            <td className="py-2 px-4 border-b">{budget.total}</td>
                            <td className="py-2 px-4 border-b">{budget.discount}</td>
                            <td className="py-2 px-4 border-b">{budget.finalTotal}</td>
                            <td className="py-2 px-4 border-b">{budget.status}</td>
                            <td className="py-2 px-4 border-b flex justify-center">
                                <MagnifyingGlassCircleIcon onClick={() => { findBudgdet(budget.id) }} className="w-6 h-6 cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {budget &&
                <div className="flex flex-col w-3/5 mx-auto text-start bg-[#011A27] bg-opacity-[.75] gap-2 p-4 my-4 rounded-lg">
                    <div className="flex justify-between">
                        <h1 className="text-center text-white font-medium text-xl md:text-3xl py-5">Detalles del presupuesto</h1>
                        <span
                            className="rounded-md p-2 text-sm text-white my-auto shadow-md bg-black ">
                            <strong>Estado:</strong>{" "}
                            {isEditing ? (
                                <form className="flex" onSubmit={handleSubmit(onSubmit)}>
                                    <select className="bg-black border border-white" {...register("status")} defaultValue={status || "Estado: "}>
                                        <option value="Aprobado">Aprobado</option>
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Rechazado">Rechazado</option>
                                    </select>
                                    <button type="submit" className="ml-2 p-1 px-2 bg-green-600 rounded">Actualizar</button>
                                </form>
                            ) : (
                                <span onClick={() => setIsEditing(true)} className="cursor-pointer px-1">
                                    {status || budget.status} 
                                </span>
                            )}
                        </span>
                    </div>
                    <h1 className="text-white text-sm md:text-base">Detalles de los servicios</h1>
                    {budget.details && budget.details.map((detail) => (
                        <div key={detail.id}>
                            <div className="flex gap-8 border-b-2 pb-4">
                                <div className="flex flex-col w-4/5">
                                    <label className="text-white text-sm md:text-base">Servicio</label>
                                    <input
                                        type="text"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md "
                                        placeholder="Medicina"
                                        defaultValue={detail.service.name || ''}
                                        disabled
                                    />
                                    <label className="text-white text-sm md:text-base">Observaciones</label>
                                    <input
                                        type="text"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md "
                                        placeholder="Observaciones"
                                        defaultValue={detail.observations || ''}
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col w-1/5 gap-2">
                                    <label className="text-white text-xs md:text-sm">Costo del servicio</label>
                                    <input
                                        type="number"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md text-end"
                                        placeholder="100"
                                        defaultValue={detail.service.cost || ''}
                                        disabled
                                    />

                                    <label className="text-white text-xs md:text-sm">Descuento</label>
                                    <input
                                        type="number"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md text-end"
                                        placeholder="100"
                                        defaultValue={detail.discount || ''}
                                        disabled
                                    />
                                    <label className="text-white text-xs md:text-sm">Total</label>
                                    <input
                                        type="number"
                                        className="rounded-md focus:outline-none p-2 text-sm shadow-md text-end"
                                        placeholder="1O0"
                                        defaultValue={detail.cost || ''}
                                        disabled
                                    />
                                </div>
                            </div>


                        </div>
                    ))
                    }
                    <div className="flex gap-8 pb-4">
                        <div className="flex flex-col w-4/5 gap-y-2">
                            <label className="text-white text-sm md:text-base">Observaciones</label>
                            <textarea
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md "
                                placeholder="1000000000"
                                defaultValue={budget?.observations || ''}
                                disabled
                            />
                            <label className="text-white text-xs md:text-sm">Fecha de creación</label>
                            <input
                                type="text"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md"
                                placeholder="01-01-1999"
                                defaultValue={formatDate(budget?.createdAt) || ''}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col w-1/5 gap-y-4 text-end">
                            <label className="text-white text-xs md:text-sm">Subtotal</label>
                            <input
                                type="number"
                                className="rounded-md focus:outline-none p-2 text-sm shadow-md text-end"
                                placeholder="000"
                                defaultValue={budget?.total || ''}
                                disabled
                            />
                            <label className="text-white text-xs md:text-sm">Descuento general</label>
                            <input
                                type="number"
                                className="rounded-md p-2 text-sm shadow-md text-end"
                                placeholder="000"
                                defaultValue={budget?.discount || ''}
                                disabled
                            />
                            <label className="text-white font-bold p-2 pb-0 text-sm md:text-base">Total</label>
                            <input
                                type="number"
                                className="rounded-md font-bold p-2 text-base shadow-md text-end bg-green-600"
                                placeholder="000"
                                defaultValue={budget?.finalTotal || ''}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}