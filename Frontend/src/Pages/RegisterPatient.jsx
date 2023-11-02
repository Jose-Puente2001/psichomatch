import { useForm } from "react-hook-form";
import { registerPatient } from "../api/patient_api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const RegisterPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await registerPatient(data);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Paciente Agregado Exitosamente</p>,
      icon: "success",
    });

    reset();
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="md:mx-6 md:p-12">
          <div className="text-center">
            <h1 className="mb-12 mt-1 pb-1 text-xl font-semibold">
              Registro de Paciente
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="text-lg font-medium">Nombre</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },

                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                })}
              />
              {errors.name && (
                <span className="text-rose-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-lg font-medium">Apellido</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="text"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },

                  minLength: {
                    value: 4,
                    message: "El apellido debe tener al menos 4 caracteres",
                  },
                })}
              />
              {errors.lastName && (
                <span className="text-rose-600 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-lg font-medium">Teléfono</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="text"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "El teléfono es requerido",
                  },

                  minLength: {
                    value: 7,
                    message: "El teléfono debe tener al menos 7 digitos",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-rose-600 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-lg font-medium">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },

                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Email no válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-rose-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="text-lg font-medium">Contraseña</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },

                  minLength: {
                    value: 6,
                    message: "La contraseña debe ser mayor a 4 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-rose-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-y-4 text-center">
              <button className="py-4 rounded-xl bg-violet-500 text-white text-lg font-bold">
                Crear Cuenta
              </button>
              <Link to="/login">¿Ya tienes cuenta?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;
