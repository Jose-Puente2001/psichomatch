import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { JwtContext } from "../../Context/JwtContext";
import { ComponentFAQs } from "./ComponentFAQs";
import { ButtonLilacSlim } from "../Buttons";

const faqs = [
  {
    question: "¿Cómo puedo agendar una cita médica en línea?",
    answer:
      "Puede agendar una cita médica en línea visitando nuestro sitio web y siguiendo los pasos indicados en la sección de 'Citas' o 'Agendar Cita'. Allí encontrará un formulario que debe completar con la información requerida.",
  },
  {
    question:
      "¿Cómo puedo cancelar o reprogramar una cita programada en línea?",
    answer:
      "Puede cancelar o reprogramar su cita en línea iniciando sesión en su cuenta en nuestro sitio web y accediendo a la sección de 'Mis Citas' o 'Citas Programadas'. Desde allí, siga las instrucciones para hacer los cambios necesarios.",
  },
  {
    question:
      "¿Cómo puedo cancelar o reprogramar una cita programada en línea?",
    answer:
      "La política de cancelación puede variar, pero por lo general, se requiere un aviso de al menos 24 horas de anticipación. Si no puede asistir a su cita, le recomendamos que la cancele con la mayor antelación posible para permitir que otros pacientes puedan tomar ese horario.",
  },
];

export const SectionFAQs = () => {
  const { jwt } = useContext(JwtContext);
  
  const navigate = useNavigate();

  const handleButton = () => {
    if (jwt && jwt.jwt.role === "therapist") {
      // Mensaje informativo
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: <p>¡Ya eres parte de nuestro equipo de Psicologos!</p>,
        icon: "info",
      });
    } else {
      // Redirige a /registerTherapist si el rol no es 'therapis'
      navigate("/registerTherapist");
    }
  };

  return (
    <div className="mx-8 sm:px-16 md:mx-24 lg:mx-28 my-12">
      <h3 className="text-2xl text-center font-bold text-black mb-8">
        Preguntas frecuentes
      </h3>
      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {faqs.map((faq, index) => (
          <ComponentFAQs
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-12">
        <ButtonLilacSlim
          onClick={handleButton}
          text="Únete al equipo"
          additionalClasses="my-4 lg:my-10 w-[331px]"
        />
      </div>
    </div>
  );
};
