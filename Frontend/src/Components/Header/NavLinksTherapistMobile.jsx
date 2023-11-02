import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinksTherapistMobile = ({jwt}) => {
  return (
    <>
      <NavLink
        to={`/dashboard/therapist/${jwt?.id}`}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-black hover:text-[#A9A9A9]"
      >
        Dashboard
      </NavLink>
    </>
  );
};

NavLinksTherapistMobile.propTypes = {
  jwt: PropTypes.object.isRequired, // Propiedad 'jwt' como objeto requerido.
};

export default NavLinksTherapistMobile;
