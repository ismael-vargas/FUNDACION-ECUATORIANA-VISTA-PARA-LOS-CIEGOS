import { useForm } from "react-hook-form"
import "../App.css"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { SessionContext } from "../context/SessionContext"
import { loginRequest } from "../services/authServices"
import { Roles } from "../common/roles"
import Logo from "../assets/images/LogoFvpc.png"

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { setIsAuthenticated, isAuthenticated, userRole } = useContext(SessionContext)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await loginRequest(data)
      if (response) {        
        localStorage.setItem('token', response.token)
        setIsAuthenticated(true)
        //navigate('/dashboard')
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {      
      if (userRole && [Roles.APPROVING, Roles.SUPERADMIN].includes(userRole)) {
        navigate('/approving');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, userRole, navigate])

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col w-2/4 mx-auto gap-6 items-center py-4 border border-[#1a133a6b] shadow-lg shadow-[#1a133a] rounded-3xl">
        <img
          className="items-start w-28 "
          src={Logo}
          alt="Logo-Fundacion"
        />
        <h2 className="text-[#063852] text-2xl font-bold">
          Ingresa a tu cuenta
        </h2>
        <form className="flex flex-col w-3/4 gap-2" onSubmit={handleSubmit(onSubmit)}>
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
          
          <button className="text-white mt-8 py-2 rounded-xl bg-[#1a133a] hover:scale-105 transition-all duration-300"
            type="submit"
          >
            Iniciar sesión
          </button>
          <button className="text-white py-2 rounded-xl bg-[#1a133a] hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/register")}
          >
            Crear nueva cuenta
          </button>
        </form>
      </div>
    </div>
  )
}

//Cambios
//
  //hola mundo