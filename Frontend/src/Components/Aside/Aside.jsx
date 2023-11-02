import PropTypes from "prop-types";
import iconCardpos from "../../assets/Icons/iconCardpos.svg";
import iconAgendar from "../../assets/Icons/iconAgendar.svg";
import iconUser from "../../assets/Icons/iconUser.svg";
import iconCitas from "../../assets/Icons/iconCitas.svg";
import ButtonAside from "./ButtonAside";

function Aside({ handleOpcion, therapist }) {
  return (
    <aside className="h-screen w-16 md:w-[310px] md:flex-none  border-r bg-violet-50">
      <div className="flex items-center md:items-start h-full max-h-screen flex-col gap-2 py-4 px-2 md:px-6">
        <p className="hidden md:block text-xl text-black font-semibold">
          Bienvenido:
        </p>
        <div className="flex items-center md:flex-row flex-col md:gap-4">
          <img
            alt={`${therapist.name} ${therapist.lastName}`}
            src={therapist.image}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="hidden md:block w-[210px]">
              <p className="text-lg text-black font-medium truncate">
                {therapist.name} {therapist.lastName}
              </p>

              <p className="text-sm text-Gray-dark font-medium truncate">
                {therapist.email}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-2 w-8 md:block md:w-[250px] border-zinc-200 dark:border-zinc-600" />
        <nav className="flex flex-col gap-1 text-md font-medium">
          <ButtonAside
            name="Perfil"
            onClick={() => {
              handleOpcion("Perfil");
            }}
            icon={iconUser}
            nameIcon="User"
          />
          <ButtonAside
            name="Mi Agenda"
            onClick={() => {
              handleOpcion("Mi Agenda");
            }}
            icon={iconAgendar}
            nameIcon="Agendar"
          />
          <ButtonAside
            name="Citas Pendientes"
            onClick={() => {
              handleOpcion("Citas Pendientes");
            }}
            icon={iconCitas}
            nameIcon="Citas"
          />
          <ButtonAside
            name="Precios"
            onClick={() => {
              handleOpcion("Precios");
            }}
            icon={iconCardpos}
            nameIcon="Cardpos"
          />
        </nav>
      </div>
    </aside>
  );
}

Aside.propTypes = {
  handleOpcion: PropTypes.func.isRequired,
  therapist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Aside;
