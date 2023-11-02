import PropTypes from "prop-types";

function ButtonAside({ name, onClick, icon, nameIcon }) {
  return (
    <button
      className="flex flex-row justify-start items-center gap-4 text-base text-black font-medium hover:text-[#CFBFFF]"
      name={name}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={nameIcon}
        className="hover:bg-[#CFBFFF] p-2 rounded-lg"
      />
      <p className="hidden md:block">{name}</p>
    </button>
  );
}

ButtonAside.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  nameIcon: PropTypes.string.isRequired,
};

export default ButtonAside;

