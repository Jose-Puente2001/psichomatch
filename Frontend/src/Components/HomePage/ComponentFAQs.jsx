import PropTypes from "prop-types";
import { MinusIcon, PlusIcon } from "./CustomIcons";

export const ComponentFAQs = ({ question, answer }) => {
  return (
    <div className="border-2 border-Gray-dark rounded-2xl p-4 md:p-6 lg:p-8">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between">
          <p className="text-lg md:text-base font-semibold text-black">{question}</p>
          <span className="relative h-6 w-6 shrink-0">
            <PlusIcon />
            <MinusIcon />
          </span>
        </summary>
        <p className="text-black font-base font-medium ml-4 sm:ml-6 mt-4">{answer}</p>
      </details>
    </div>
  );
};

ComponentFAQs.propTypes = {
  question: PropTypes.string.isRequired, // Propiedad 'question' como cadena requerida.
  answer: PropTypes.string.isRequired,   // Propiedad 'answer' como cadena requerida.
};