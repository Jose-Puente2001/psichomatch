import axios from 'axios';

export const getHour = async () => {
 return await axios.get(`https://psicomatchapi.onrender.com/hour`);
}

export const getAvailabilityByTherapistId = async (id, date) => {
return await axios.post(`https://psicomatchapi.onrender.com/availability/${id}`, date)
}

export const createReservation = async (AvailabilityId, PatientId, TherapistId) => {
return await axios.post(`https://psicomatchapi.onrender.com/reservation/`, AvailabilityId, PatientId, TherapistId)
}