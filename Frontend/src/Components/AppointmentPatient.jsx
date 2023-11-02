import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetTherapistId } from '../api/therapist_api';
import Agenda2 from "./AgendaCita"


const AppointmentPatient = () => {
  const params = useParams();
  const [data, setData] = useState(null); 

  const loadTherapists = async (id) => {
      const response = await GetTherapistId(id);
      const therapistData = response.data;
      setData(therapistData); 
  }

  useEffect(() => {
    if (params.id) {
      loadTherapists(params.id);
    }
  }, [params.id]);

  return (
<div className="flex w-full h-screen items-center justify-center">
  <div className="w-full flex items-center justify-center lg:w-1/2">
    <div className="md:mx-6 md:p-12">
      {data && (
        <div>
          <h1 className="mb-12 mt-1 pb-1 text-xl font-semibold text-center">
            Agenda Cita con {data.name} {data.lastName}
          </h1>
          <div className="flex items-center border rounded-lg shadow-lg p-4">
            <img className="w-40 h-42 rounded-t-lg p-3" src={data.image} alt="Sunset in the mountains" />
            <div className="text-sm">
              <h1 className="text-center p-12 font-semibold">Fecha y hora disponible</h1>
              <Agenda2 />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default AppointmentPatient;
