import axios from 'axios';

export const GetTherapist = async () => {
 return await axios.get('https://psicomatchapi.onrender.com/therapist/');
}

export const GetTherapistId = async (id) => {
return await axios.get(`https://psicomatchapi.onrender.com/therapist/getTherapistByID/${id}`);
}