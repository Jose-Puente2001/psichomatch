import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../Context/JwtContext";
import { handleButtonVerPsicologos } from "../../Utils/utils";
import { ButtonBlack } from "../Buttons";
import WomenImg from "../../assets/Images/women.png";
import iconOne from "../../assets/Icons/iconWhyPM-One.svg";
import iconTwo from "../../assets/Icons/iconWhyPM-Two.svg";
import iconThree from "../../assets/Icons/iconWhyPM-Three.svg";

const lists = [
  {
    title: "Privacidad y Confidencialidad:",
    imageUrl: iconOne,
    description:
      "Estrictos protocolos de confidencialidad y seguridad de datos para proteger tu privacidad.",
  },
  {
    title: "Evaluación Profesional:",
    imageUrl: iconTwo,
    description:
      "Selección rigurosa de psicólogos para asegurar terapeutas altamente calificados y atención de alta calidad.",
  },
  {
    title: "Atención y soporte:",
    imageUrl: iconThree,
    description:
      "Tenemos un centro de atención para apoyarte. ¡Nos encantará ayudarte!",
  },
];

export const SectionWhyPsichoMatch = () => {
  const { jwt } = useContext(JwtContext);
  const navigate = useNavigate();

  return (
    <section>
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 mx-8 sm:mx-12 md:mx-16 lg:mx-24 xl:mx-32">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-black ml-[90px] mb-12">
              Por qué elegir Psycomatch
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 xl:col-span-2">
              {lists.map((list) => (
                <div key={list.title} className="flex items-start">
                  <img src={list.imageUrl} alt="" />
                  <div>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium text-black ml-6">
                      {list.title}
                    </p>
                    <p className="text-base md:text-lg lg:text-xl font-medium text-black ml-6">
                      {list.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center mt-12">
              <ButtonBlack
                onClick={() => handleButtonVerPsicologos(jwt, navigate)}
                text="Agendar ahora"
                additionalClasses="w-[279px]"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src={WomenImg} className="" />
          </div>
        </div>
      </div>
    </section>
  );
};
