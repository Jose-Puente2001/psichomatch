import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getPatientReservation,
  deleteReservation,
} from "../api/reservation_api";
import CalendarDescription from "../Components/CalendarDescription";
import iconHome from "../assets/Icons/iconHome.svg";

const Dashboard = function () {
  const params = useParams();
  const [data, setData] = useState([]);

  const loadPatientReservation = async (id) => {
    const response = await getPatientReservation(params.id);
    const patientReservation = response.data;
    setData(patientReservation);
  };

  const deletePatientReservation = async (id) => {
    const response = await deleteReservation(id);
    const deletereservation = response.data;
    setData(data.filter((data) => data.id !== id));
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Cita Cancelada Exitosamente</p>,
      icon: "success",
    });
  };

  useEffect(() => {
    if (params.id) {
      loadPatientReservation(params.id);
    }
  }, [params.id, data]);

  return (
    <div className="flex w-full items-center justify-center flex-col my-12">
      <div className="flex justify-start gap-4 self-start px-6 ml-6 md:ml-8 lg:ml-16">
        <img src={iconHome} alt="Home Psicologos" />
        <div className="text-lg text-black font-medium">
          Paciente / Mi Calendario
        </div>
      </div>
      <div className="mx-12 md:mx-20">
        <CalendarDescription descriptionCalendar="En este espacio encontrarás tu historial de citas." />
      </div>
      <main>
        <h2 className="mb-12 mt-1 pb-1 text-xl font-semibold text-center">
          Historial de Citas
        </h2>
        <section className="my-5 grid gap-5 m-5 md:grid-cols-2 xl:grid-cols-3">
          {/* {console.log(data)} */}
          {data &&
            data?.map((reservation, index) => (
              <div className="bg-violet-50 p-10 rounded-2xl" key={index}>
                <h2>
                  <span className="font-bold">Fecha: </span>
                  {new Date(reservation.Availability.date).toLocaleDateString()}
                </h2>
                <h2>
                  <span className="font-bold">Psicólogo: </span>
                  {reservation.Therapist.name} {reservation.Therapist.lastName}
                </h2>
                <h2>
                  <span className="font-bold">Estatus: </span>
                  {reservation.Availability.status == true
                    ? "Orden Agendada"
                    : "No hay orden agendada"}
                </h2>
                <h2>
                  <span className="font-bold">Hora: </span>{" "}
                  {reservation.Availability.Hour.hour}
                </h2>
                <h2>
                  <span className="font-bold">Télefono: </span>{" "}
                  {reservation.Therapist.phone}
                </h2>
                <h2>
                  <span className="font-bold">Mail: </span>{" "}
                  {reservation.Therapist.email}
                </h2>
                <div className="grid justify-items-end">
                  <button
                    className="bg-violet-50 hover:bg-violet-50 text-black font-semibold py-2 px-4 rounded"
                    onClick={() => deletePatientReservation(reservation.id)}
                  >
                    Cancelar
                  </button>
                </div>
                <hr className="border-solid border-2 border-violet-300 " />
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
