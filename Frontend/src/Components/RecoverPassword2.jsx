import React, { useEffect, useState } from 'react';
import {recoverPassword2} from '../api/patient_api';

const RecoverPassword2 = async (data) => {
const [newPassword, setnewPassword] = useState([]);

useEffect(() => {

const response = await recoverPassword2(data);
console.log(response);


} []);

   return(

     

   );
}