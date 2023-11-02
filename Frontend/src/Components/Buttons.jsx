import PropTypes from "prop-types";

export const ButtonBlack = ({ text, additionalClasses, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${additionalClasses} text-white bg-Gray-dark text-2xl font-medium py-4 px-6 rounded-[32px] hover:bg-[#4f4f4f]`}
    >
      {text}
    </button>
  );
};

ButtonBlack.propTypes = {
  text: PropTypes.string.isRequired, // Propiedad 'text' como cadena requerida.
  additionalClasses: PropTypes.string, // Propiedad 'additionalClasses' como cadena opcional.
  onClick: PropTypes.func.isRequired, // Propiedad 'onClick' como una funcion requerida.
};

export const ButtonLilacSlim = ({ text, additionalClasses, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${additionalClasses} text-Gray-dark text-2xl font-semibold bg-[#CFBFFF] py-4 px-6 rounded-[48px] hover:bg-Purple-ligth`}
    >
      {text}
    </button>
  );
};

ButtonLilacSlim.propTypes = {
  text: PropTypes.string.isRequired, // Propiedad 'text' como cadena requerida.
  additionalClasses: PropTypes.string, // Propiedad 'additionalClasses' como cadena opcional.
  onClick: PropTypes.func.isRequired, // Propiedad 'onClick' como una funcion requerida.
};