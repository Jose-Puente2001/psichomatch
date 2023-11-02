import { NavLink } from "react-router-dom";

const NavLinksWithoutAccess = () => {
  return (
    <>
      <NavLink
        to="/servicios"
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-black hover:text-[#A9A9A9]"
      >
        Servicios
      </NavLink>
      <NavLink
        to="/registro"
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-black hover:text-[#A9A9A9]"
      >
        Registro Paciente
      </NavLink>
      <NavLink
        to="/registerTherapist"
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-black hover:text-[#A9A9A9]"
      >
        Registro Psicólogo
      </NavLink>
    </>
  );
};

export default NavLinksWithoutAccess;
