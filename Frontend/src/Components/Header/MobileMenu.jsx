import { NavLink, Link, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import SearchBar from "../SearchBar";
import logoIcon from "../../assets/Images/logoIcon.svg";
import clearIcon from "../../assets/Icons/clear.svg";
import NavLinksPatientMobile from "./NavLinksPatientMobile";
import NavLinksTherapistMobile from "./NavLinksTherapistMobile";
import NavLinksWithoutAccess from "./NavLinksWithoutAccess";
import PropTypes from "prop-types";
import { useContext } from "react";
import { JwtContext } from "../../Context/JwtContext";

function MobileMenu({ jwt, mobileMenuOpen, setMobileMenuOpen, handleAccountExit }) {
  const location = useLocation();
  const nuevoJwt = useContext(JwtContext);
  console.log(nuevoJwt)
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="" src={logoIcon} alt="" />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img src={clearIcon} alt="" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {nuevoJwt.jwt.token !== undefined ? (
                <>
                  {nuevoJwt.role === "patient" && (
                    <>
                      <NavLinksPatientMobile jwt={jwt} />
                    </>
                  )}
                  {nuevoJwt.role === "therapist" && (
                    <>
                      <NavLinksTherapistMobile jwt={jwt} />
                    </>
                  )}
                </>
              ) : (
                <NavLinksWithoutAccess />
              )}
            </div>
            <div className="py-6 gap-4 flex flex-col items-start">
              {nuevoJwt.jwt.token !== undefined ? (
                <>
                  {nuevoJwt.jwt.role === "patient" && (
                    <>
                      {location.pathname === `/psicologos/${jwt?.id}` && (
                        <SearchBar />
                      )}
                    </>
                  )}
                  <button
                    onClick={handleAccountExit}
                    className="text-white text-base font-medium text-center bg-Gray-dark py-4 px-6 rounded-[32px] w-[214px] hover:bg-[#4f4f4f]"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-white text-base font-medium text-center bg-Gray-dark py-4 px-6 rounded-[32px] w-[214px] hover:bg-[#4f4f4f]"
                  >
                    Iniciar sesión
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

MobileMenu.propTypes = {
  jwt: PropTypes.object.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
  handleAccountExit: PropTypes.func.isRequired,
};

export default MobileMenu;
