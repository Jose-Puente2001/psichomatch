import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.svg";
import logoIcon from "../../assets/Images/logoIcon.svg";
import bars3Icon from "../../assets/Icons/bars3.svg";
import { JwtContext } from "../../Context/JwtContext";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { jwt, destroySession } = useContext(JwtContext);
  const navigate = useNavigate(); // Use useNavigate here
  const handleAccountExit = () => {
    destroySession();
    navigate("/");
  };

  return (
    <header className="border-b-2 border-b-[#e9e9e9]">
      <nav className="flex items-center justify-between p-4 md:px-6">
        <div className="flex lg:flex-1">
          <Link to="/" className="ml-4">
            <img src={logo} alt="Logo" className="hidden lg:block" />
            <img
              src={logoIcon}
              alt="Logo"
              className="block lg:hidden md:h-[43px] md:w-[37px]"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <img src={bars3Icon} alt="" />
          </button>
        </div>
        <div className="hidden lg:flex justify-center items-center lg:gap-4 lg:flex-1 lg:justify-end">
          <DesktopMenu jwt={jwt} handleAccountExit={handleAccountExit} />
        </div>
      </nav>
      <MobileMenu
        jwt={jwt}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleAccountExit={handleAccountExit}
      />
    </header>
  );
}

export default Header;
