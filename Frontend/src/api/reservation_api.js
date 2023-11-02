import axios from "axios";

export const getPatientReservation = async (id) => {
 return await axios.get(`https://psicomatchapi.onrender.com/reservation/patient/${id}`);	
}

export const deleteReservation = async (id) => { 
return await axios.delete(`https://psicomatchapi.onrender.com/reservation/${id}`)
}