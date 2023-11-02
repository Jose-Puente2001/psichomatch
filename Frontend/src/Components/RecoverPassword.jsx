import { useForm } from "react-hook-form";
import { recoverPassword } from "../api/patient_api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await recoverPassword(data);
    console.log(response);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Por favor verifica tu correo electrónico</p>,
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
              Recuperación de Contraseña
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="text-lg font-medium">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="email"
                {...register("patientEmail", {
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
              {errors.patientEmail && (
                <span className="text-rose-600 text-sm">
                  {errors.patientEmail.message}
                </span>
              )}
              <div className="mt-8 flex flex-col gap-y-4 text-center">
                <button
                  type="submit"
                  className="py-4 rounded-xl bg-violet-500 text-white text-lg font-bold"
                >
                  Recuperar Contraseña
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
