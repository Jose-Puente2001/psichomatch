import { loginPatientGoogle } from "../api/patient_api";
import { useNavigate, useParams } from "react-router-dom";
import { JwtContext } from "../Context/JwtContext";
import { useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const NotFoundScreen = () => {
  const { setJwt } = useContext(JwtContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Define and provide the required data here
      try {
        
        const id = params['*'].split("/")
        const newID = id[id.length - 1]
        
        const response = await loginPatientGoogle(newID);
        const patientId = response.data.data.id;

        if (response.data.tokenSession) {
          const token = response.data.tokenSession;
          const decodedToken = await jwtDecode(token);

          setJwt({
            id: decodedToken.id,
            token: token,
            role: decodedToken.role,
          });

          localStorage.setItem("token", token);
          navigate(`/dashboard/${patientId}`);
        }
      } catch (error) {
        // Handle any errors here
      }
    };

    fetchData();

  }, [params.id, params, navigate, setJwt]);

  return (
    <div className="min-h-screen w-full py-12">
      <h1 className="text-Gray-dark text-center mx-auto my-60 text-4xl font-semibold">Pagina no encontrada!</h1>
    </div>
  );
};