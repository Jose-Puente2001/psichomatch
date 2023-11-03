import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Agenda from "../Agenda";
import CalendarDescription from "../CalendarDescription";

function TherapistAgenda() {
  const [data, setData] = useState(null);
  const params = useParams();

  const loadPatientReservation = async (id) => {
    const response = await axios.get(
      `https://psicomatchapi.onrender.com/reservation/therapist/${params.id}`
    );
    const patientReservation = response.data;
    console.log(patientReservation);
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
          <CalendarDescription descriptionCalendar="En este espacio podrás agendar la hora que deseas atender a tus pacientes." />
          <div className="p-12">
            <p className="font-semibold text-2xl text-black mb-5">
              Elige el horario en el que deseas atender pacientes
            </p>
            <div className="flex justify-center">
              <Agenda therapistId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TherapistAgenda;
