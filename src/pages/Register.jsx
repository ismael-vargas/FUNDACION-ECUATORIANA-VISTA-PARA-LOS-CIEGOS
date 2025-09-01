import { useForm } from "react-hook-form"
import "../App.css"
import Logo from "../assets/images/LogoFvpc.png"
import { useNavigate } from "react-router-dom"
import { newPatient } from "../services/patientServices"
import { useState } from "react"
import Alert from "../components/Alerts"

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await newPatient(data)
            if (response) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
                navigate('/login')
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }


    return (
        <div className="flex flex-col py-8">
            <div className="flex flex-col w-3/4 mx-auto gap-6 items-center py-4 border border-[#1a133a6b] shadow-lg shadow-[#1a133a] rounded-3xl">
                <img
                    className="items-start w-28 "
                    src={Logo}
                    alt="Logo-Fundacion"
                />
                <h2 className="text-[#063852] text-2xl font-bold">
                    Crea una cuenta
                </h2>
                <form className="flex flex-col w-3/4 gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <label className="font-medium text-[#063852] "
                        htmlFor="name">
                        Nombres
                    </label>
                    <input className="shadow-md border rounded-xl w-full p-2 text-gray-700 "
                        {...register("name", {
                            required: "Los nombres son requeridos",
                            minLength: { value: 8, message: "Ingresa al menos un nombre y un apellido" }
                        })}
                        id="name"
                        name="name"
                        type="text"
                    />
                    {errors.name && <p className="text-red-600 text-xs">{errors.name?.message}</p>}
                    <label className="font-medium text-[#063852] "
                        htmlFor="identification">
                        Número de identificación
                    </label>
                    <input className="shadow-md border rounded-xl w-full p-2 text-gray-700 "
                        {...register("identification", {
                            required: "La cédula es requerida",
                            minLength: {
                                value: 10,
                                message: "Ingresa una cédula válida"
                            },
                            maxLength: {
                                value: 13,
                                message: "Ingresa una cédula válida"
                            }
                        })}
                        id="identification"
                        name="identification"
                        type="text"
                    />
                    {errors.identification && <p className="text-red-600 text-xs">{errors.identification?.message}</p>}
                    <label className="font-medium text-[#063852]"
                        htmlFor="phone">
                        Teléfono
                    </label>
                    <input className="shadow-md border rounded-xl w-full p-2 text-gray-700 "
                        {...register("phone", {
                            required: "Un número teléfono es requerido",
                            minLength: {
                                value: 10,
                                message: "Ingresa un número de teléfono válido"
                            },
                            maxLength: {
                                value: 13,
                                message: "Ingresa un número de teléfono válido"
                            }
                        })}
                        id="phone"
                        name="phone"
                        type="number"
                    />
                    <label className="font-medium text-[#063852] "
                        htmlFor="email">
                        Correo
                    </label>
                    <input className="shadow-md border rounded-xl w-full p-2 text-gray-700 "
                        {...register("email")}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <label className="font-medium text-[#063852] "
                        htmlFor="password"
                    >
                        Contraseña
                    </label>
                    <input className="shadow-md border rounded-xl w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline"
                        {...register("password", {
                            required: "La contraseña es requerida",
                            minLength: {
                                value: 5,
                                message: "La contraseña debe tener al menos 5 caracteres"
                            }
                        })}
                        id="password"
                        name="password"
                        type="password"
                    />
                    {errors.password && <p className="text-red-600 text-xs">{errors.password?.message}</p>}
                    <label className="font-medium text-[#063852]">Fecha de Nacimiento </label>
                    <input
                        {...register("dateBirth", {
                            required: "La fecha de nacimiento es requerida",
                        })}
                        type="date"
                        className={`rounded-md focus:outline-none p-2 text-sm br ${errors.dateBirth ? 'border border-red-600' : ''}`}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    />
                    {errors.dateBirth && <p className="text-red-600 text-xs">{errors.dateBirth?.message}</p>}
                    <label className="font-medium text-[#063852]">Género</label>
                    <div className="flex items-center">
                        <input
                            {...register("gender", {
                                required: "Debes seleccionar un género."
                            })}
                            type="radio"
                            value="masculino"
                            className={`mr-2 ${errors.gender ? 'border border-red-600' : ''}`}
                            id="masculino"
                        />
                        <span>Masculino</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            {...register("gender", {
                                required: "Debes seleccionar un género."
                            })}
                            type="radio"
                            value="femenino"
                            className={`mr-2 ${errors.gender ? 'border border-red-600' : ''}`}
                            id="femenino"
                        />
                        <span>Femenino</span>
                    </div>
                    {errors.gender && <p className="text-red-600 text-xs">Debes seleccionar un género.</p>}
                    <label className="font-medium text-[#063852]">Dirección</label>
                    <textarea {...register("address", {
                        required: "Este campo es requerido",
                        maxLength: { value: 200, message: "Solo puede ingresar hasta 200 caracteres" }
                    })}
                        type="text"
                        className="shadow-md border rounded-xl w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline"
                        placeholder="Dirección de residencia"
                    />
                    {errors.address && <p className="text-red-600 text-xs">{errors.address?.message}</p>}
                    <button className="text-white mt-8 py-2 rounded-xl bg-[#1a133a] hover:scale-105 transition-all duration-300"
                        type="submit"
                    >
                        Registrarme
                    </button>
                </form>
            </div>
            {showAlert &&
                <Alert
                    type="success"
                    title="Se ha registrado exitosamente"
                    message="¡Ahora, puedes iniciar sesión!"
                />
            }
        </div>
    )
}