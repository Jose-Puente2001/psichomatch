import { Link } from "react-router-dom";

const Footer = function () {
  return (
    <footer className="bg-[#383838] text-white p-10 text-xs ">
      <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <div className="text-center">
          <h3 className="font-semibold">Contacto</h3>
          <p className="mt-2">contacto@psycomatch.com</p>
        </div>
        <div className="text-center">
          <h3 className="font-semibold">Profesionales</h3>
          <Link to="/plans"><p className="mt-2">Planes y precios</p></Link>
        </div>
        <div className="text-center flex justify-items-end flex-col">
          <h3 className="font-semibold">Políticas y Soporte</h3>
          <Link to="/error"><p className="mt-2">Términos y Condiciones</p></Link>
          <Link to="/error"><p>Política de privacidad</p></Link>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
