import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IconArrowRight from "../assets/Icons/arrowRight.svg";
import IconArrowLeft from "../assets/Icons/arrowLeft.svg";

const Agenda = ({ therapistId }) => {
  const [hour, setHour] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);

  const getAvailabilityHourByTherapistIdAndDate = async (
    TherapistId,
    date,
    HourId
  ) => {
    try {
      const { data } = await axios.post(
        `https://psicomatchapi.onrender.com/availability/hour`,
        { date, TherapistId, HourId }
      );
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAvailabilityByTherapistId = async (TherapistId) => {
    try {
      const { data } = await axios.get(
        `https://psicomatchapi.onrender.com/availability/${TherapistId}`
      );
      setAvailabilityData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const insertAvailabilityByTherapistId = async (TherapistId, HourId, date) => {
    try {
      const { data } = await axios.post(
        `https://psicomatchapi.onrender.com/availability/create/disp`,
        { HourId, date, TherapistId }
      );
      console.log(data);
      if (data) {
        getAvailabilityByTherapistId(TherapistId);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteAvailabilityByTherapistId = async (TherapistId, HourId, date) => {
    try {
      const { data } = await axios.delete(
        `https://psicomatchapi.onrender.com/availability?HourId=${HourId}&date=${date}&TherapistId=${TherapistId}`
      );

      if (data) {
        getAvailabilityByTherapistId(TherapistId);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getHours = async () => {
    try {
      const { data } = await axios.get(`https://psicomatchapi.onrender.com/hour`);
      setHour(data);
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
    getAvailabilityByTherapistId(therapistId);
    getHours();
  }, []);

  const getWeekDay = (fecha) => {
    const numeroDiaSemana = fecha.getDay();
    const nombreDiaSemana = WeekDays[numeroDiaSemana];
    return nombreDiaSemana;
  };

  const nextHandler = (fecha) => {
    const fechaSiguiente = new Date(fecha);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 4);
    console.log(fechaSiguiente);
    setDate(new Date(fechaSiguiente));
    return fechaSiguiente;
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

    return prevDate;
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

  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-[#F5F5F5] w-[450px] h-96 rounded-2xl px-2 overflow-auto">
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

                {hour?.map((y) => {
                  if (
                    availabilityData.some((z) => {
                      let zDate = new Date(z.date);

                      zDate = zDate.toISOString().slice(0, 10);

                      // Convierte nextDate(x) a una cadena "yyyy-mm-dd"
                      const currentDate = nextDate(x)
                        .toISOString()
                        .slice(0, 10);

                      return zDate === currentDate && z.HourId === y.id;
                    })
                  ) {
                    return (
                      <p
                        key={uuidv4()}
                        value={y.id}
                        className={`${"bg-violet-100"} border-2  rounded-lg my-1 mx-1 p-2 cursor-pointer`}
                        onClick={() => {
                          deleteAvailabilityByTherapistId(
                            therapistId,
                            y.id,
                            nextDate(x)
                          );
                          const MySwal = withReactContent(Swal);
                          MySwal.fire({
                            title: "Eliminaste un horario de tu agenda.",
                            icon: "info",
                          });
                        }}
                      >
                        {y.hour}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={uuidv4()}
                        value={y.id}
                        className={`border-2  rounded-lg my-1 mx-1 p-2 cursor-pointer`}
                        onClick={() => {
                          insertAvailabilityByTherapistId(
                            therapistId,
                            y.id,
                            nextDate(x)
                          );

                          const MySwal = withReactContent(Swal);
                          MySwal.fire({
                            title: "Agregaste un horario a tu agenda",
                            icon: "info",
                          });
                        }}
                      >
                        {y.hour}
                      </p>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
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

Agenda.propTypes = {
  therapistId: PropTypes.number.isRequired,
};

export default Agenda;
