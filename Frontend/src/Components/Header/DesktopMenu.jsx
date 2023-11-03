import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar";
import { useContext, useEffect, useState } from "react";
import { JwtContext } from "../../Context/JwtContext";

function DesktopMenu({ jwt, handleAccountExit }) {

  // const [nuevoJwt, setNuevoJwt] = useState('')
  const nuevoJwt = useContext(JwtContext);

  return (
    <>
      {nuevoJwt.jwt.token !== undefined ? (
        <>
          {nuevoJwt.jwt.role === "patient" && (
            <>
              <NavLink
                to={`dashboard/${jwt?.id}`}
                className="text-base text-black font-medium hover:text-[#A9A9A9]"
              >
                Mi Calendario
              </NavLink>
              <NavLink
                to={`/psicologos/${jwt?.id}`}
                className="text-base text-black font-medium hover:text-[#A9A9A9]"
              >
                Psicólogos
              </NavLink>
              {location.pathname === `/psicologos/${jwt?.id}` && <SearchBar />}
            </>
          )}
          {nuevoJwt.jwt.role === "therapist" && (
            <>
              <NavLink
                to={`/dashboard/therapist/${jwt?.id}`}
                className="text-base text-black font-medium hover:text-[#A9A9A9]"
              >
                Dashboard
              </NavLink>
            </>
          )}
          <button
            className="text-white text-base font-medium text-center bg-Gray-dark py-4 px-6 rounded-[32px] w-[214px] hover:bg-[#4f4f4f]"
            onClick={handleAccountExit}
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/servicios"
            className="text-base text-black font-medium hover:text-[#A9A9A9]"
          >
            Servicios
          </NavLink>
          <NavLink
            to="/registro"
            className="text-base text-black font-medium hover:text-[#A9A9A9]"
          >
            Registro Paciente
          </NavLink>
          <NavLink
            to="/registerTherapist"
            className="text-base text-black font-medium hover:text-[#A9A9A9]"
          >
            Registro Psicólogo
          </NavLink>
          <NavLink
            to="/login"
            className="text-white text-base font-medium text-center bg-Gray-dark py-4 px-6 rounded-[32px] w-[214px] hover:bg-[#4f4f4f]"
          >
            Iniciar sesión
          </NavLink>
        </>
      )}
    </>
  );
}

DesktopMenu.propTypes = {
  jwt: PropTypes.object.isRequired, // Propiedad 'jwt' como objeto requerido.
  handleAccountExit: PropTypes.func.isRequired, // Propiedad 'handleAccountExit' como función requerida.
};

export default DesktopMenu;
