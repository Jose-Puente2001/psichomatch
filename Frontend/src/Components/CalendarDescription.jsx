import PropTypes from "prop-types";
import iconCalendar from "../assets/Icons/iconCalendar.svg";

function CalendarDescription({ descriptionCalendar }) {
  return (
      <section className="flex flex-col-reverse lg:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-28 my-12">
        <div className="lg:max-w-md">
          <h1 className="mt-2 mb-2 text-black text-3xl md:text-4xl font-semibold">Mi Calendario</h1>
          <p className="text-black text-lg font-medium">
            {descriptionCalendar}
          </p>
        </div>
        <div className="bg-violet-50 rounded-full p-8 lg:p-12">
          <img src={iconCalendar} alt="Calendario" />
        </div>
      </section>
  );
}

CalendarDescription.propTypes = {
  descriptionCalendar: PropTypes.string.isRequired, // Esto indica que descriptionCalendar es una cadena (string) requerida.
};

export default CalendarDescription;
