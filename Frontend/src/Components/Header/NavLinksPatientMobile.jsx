import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinksPatientMobile = ({jwt}) => {
  return (
    <>
      <NavLink
        to={`dashboard/${jwt?.id}`}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-black hover:text-[#A9A9A9]"
      >
        Mi Calendario
      </NavLink>
      <NavLink
        to={`/psicologos/${jwt?.id}`}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-black hover:text-[#A9A9A9]"
      >
        Psicólogos
      </NavLink>
    </>
  );
};

NavLinksPatientMobile.propTypes = {
  jwt: PropTypes.object.isRequired, // Propiedad 'jwt' como objeto requerido.
};

export default NavLinksPatientMobile;
