import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CalendarDescription from "../CalendarDescription";

const TherapistPatientCita = () => {
  const [data, setData] = useState(null);
  const params = useParams();

  const loadPatientReservation = async (id) => {
    const response = await axios.get(
      `https://psicomatchapi.onrender.com/reservation/therapist/${params.id}`
    );
    const patientReservation = response.data;
    setData(patientReservation);
  };

  const deletePatientReservation = async (id) => {
    const response = await axios.delete(
      `https://psicomatchapi.onrender.com/reservation/${id}`
    );
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
  }, [params.id]);

  return (
    <main className="flex items-center justify-center">
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="md:mx-6">
          <CalendarDescription descriptionCalendar="En este espacio encontrarás tú historial de citas con los pacientes que han agendado contigo." />
            <p className="text-center font-semibold text-2xl text-black mb-5">
              Paciente con cita agendada
            </p>
          <div className="my-5 grid  gap-5 m-5 md:grid-cols-2 xl:grid-cols-3">
            {data &&
              data.map((reservation, index) => (
                <div key={index} className="bg-violet-50 p-10">
                  <h1>
                    <span className="font-bold">Fecha: </span>
                    {reservation.Availability.date}
                  </h1>
                  <h1>
                    <span className="font-bold">Paciente: </span>
                    {reservation.Patient.name} {reservation.Patient.lastName}
                  </h1>
                  <h1>
                    <span className="font-bold">Estatus: </span>
                    {reservation.Availability.status == true
                      ? "Orden Agendada"
                      : "No hay orden agendada"}
                  </h1>
                  <h1>
                    <span className="font-bold">Hora: </span>{" "}
                    {reservation.Availability.Hour.hour}
                  </h1>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default TherapistPatientCita;
