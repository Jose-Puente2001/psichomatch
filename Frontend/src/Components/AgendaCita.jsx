import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getHour,
  getAvailabilityByTherapistId,
  createReservation,
} from "../api/scheduleAppointment_api";
import PropTypes from "prop-types";
import IconArrowRight from "../assets/Icons/arrowRight.svg";
import IconArrowLeft from "../assets/Icons/arrowLeft.svg";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";

const AgendaCita = ({ patientId, therapistId }) => {
  const [hour, setHour] = useState([]);
  const [availability, setAvailability] = useState(new Array(4).fill([]));
  const [date, setDate] = useState(new Date());

  const getHours = async () => {
    try {
      const { data } = await getHour();
      setHour(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAvailabilityByTherapistIdAndDate = async (id, date, index) => {
    try {
      const { data } = await getAvailabilityByTherapistId(id, { date });
      if (data) {
        setAvailability((prev) => {
          const updatedAvailability = [...prev];
          updatedAvailability[index] = data;
          return updatedAvailability;
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addReservation = async (AvailabilityId, PatientId, TherapistId) => {
    try {
      const { data } = await createReservation({
        AvailabilityId,
        PatientId,
        TherapistId,
      });

      if (data) {
        // Actualiza los datos de availability si data es verdadero
        setAvailability((prev) => {
          const updatedAvailability = [...prev];
          updatedAvailability.forEach((dayAvailability) => {
            dayAvailability.forEach((availabilityItem) => {
              if (availabilityItem.id === AvailabilityId) {
                availabilityItem.status = true;
              }
            });
          });
          return updatedAvailability;
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const WeekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const getDateAndMonth = (fecha) => {
    const mesEnLetras = months[fecha.getMonth()];
    const diaDelMes = fecha.getDate();
    return diaDelMes + " " + mesEnLetras;
  };

  useEffect(() => {
    getHours();
    [0, 1, 2, 3].forEach((x) => {
      getAvailabilityByTherapistIdAndDate(therapistId, nextDate(x), x);
    });
  }, [date]);

  const getWeekDay = (fecha) => {
    const numeroDiaSemana = fecha.getDay();
    const nombreDiaSemana = WeekDays[numeroDiaSemana];
    return nombreDiaSemana;
  };

  const nextHandler = (fecha) => {
    const fechaSiguiente = new Date(fecha);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 4);
    setDate(new Date(fechaSiguiente));
  };

  const prevHandler = (fecha) => {
    const prevDate = new Date(fecha);
    prevDate.setHours(0, 0, 0, 0);

    const actualDate = new Date();
    actualDate.setHours(0, 0, 0, 0);

    prevDate.setDate(prevDate.getDate() - 4);
    console.log(prevDate);

    if (prevDate >= actualDate) {
      setDate(new Date(prevDate));
    }
  };

  const nextDate = (num) => {
    const fechaSiguiente = new Date(date);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + num);
    const fechaSolo = new Date(
      fechaSiguiente.getFullYear(),
      fechaSiguiente.getMonth(),
      fechaSiguiente.getDate()
    );

    return fechaSolo;
  };

  return (
    <div className="bg-[#F5F5F5] w-96 h-96 rounded-2xl px-2 overflow-auto">
      <div className="flex flex-rox justify-between items-start m-2 mt-6">
        <button
          onClick={() => prevHandler(date)}
          className="bg-violet-100 w-10 h-10 p-4 rounded-full flex justify-center items-center"
        >
          <img src={IconArrowLeft} alt="Icon arrow left" />
        </button>
        <div className="flex justify-between w-full h-full">
          {[0, 1, 2, 3].map((x) => {
            return (
              <div
                key={uuidv4()}
                className="flex-col justify-center space-between text-center w-full"
              >
                <p className="text-black">{getWeekDay(nextDate(x))}</p>
                <p className="text-gray-400">{getDateAndMonth(nextDate(x))}</p>
                {availability[x]?.map((y) => {
                  if (!y.status) {
                    return (
                      <p
                        onClick={() => {
                          addReservation(y.id, patientId, y.TherapistId);
                          const MySwal = withReactContent(Swal);
                          MySwal.fire({
                            title: 'Se registro correctamente la cita.',
                            text: 'Toda la información fue enviada a tu mail',
                            icon: "success",
                          });
                          // getAvailabilityByTherapistIdAndDate(y.TherapistId, nextDate(x), x);
                        }}
                        key={uuidv4()}
                        value={y.HourId}
                        className="bg-violet-100 rounded-lg my-1 mx-1 p-2 cursor-pointer"
                      >
                        {y.Hour.hour}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={uuidv4()}
                        value={y.HourId}
                        className="rounded-lg my-1 mx-1 p-2 line-through"
                      >
                        {y.Hour.hour}
                      </p>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>{" "}
        <button
          onClick={() => nextHandler(date)}
          className="bg-violet-100 w-10 h-10 px-4 rounded-full flex justify-center items-center"
        >
          <img src={IconArrowRight} alt="Icon arrow right" />
        </button>
      </div>
    </div>
  );
};

AgendaCita.propTypes = {
  patientId: PropTypes.number.isRequired,
  therapistId: PropTypes.number.isRequired,
};

export default AgendaCita;
