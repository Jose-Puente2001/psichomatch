import PropTypes from "prop-types";

const SubtitleRegister = ({ number, titleSection }) => {
  return (
    <div className="flex-start flex items-center gap-5 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
      <div className="text-Purple w-20 h-20 text-2xl font-semibold bg-violet-100 flex justify-center items-center rounded-full">
        {number}
      </div>
      <p className="text-xl font-semibold">{titleSection}</p>
    </div>
  );
};

SubtitleRegister.propTypes = {
  number: PropTypes.string.isRequired, // Propiedad 'number' como cadena requerida.
  titleSection: PropTypes.string.isRequired, // Propiedad 'titleSection' como cadena requerida.
};

export default SubtitleRegister;