import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../Context/JwtContext";
import { handleButtonVerPsicologos } from "../Utils/utils";
import { ButtonLilacSlim } from "../Components/Buttons";
import iconCognitiveBehavioral from "../assets/Icons/iconCognitiveBehavioral.svg";
import iconInteractive from "../assets/Icons/iconInteractive.svg";
import iconPsychoanalysis from "../assets/Icons/iconPsychoanalysis.svg";
import iconHumanist from "../assets/Icons/iconHumanist.svg";
import iconSystemic from "../assets/Icons/iconSystemic.svg";
import iconGestalt from "../assets/Icons/iconGestalt.svg";

const services = [
  {
    name: "Cognitivo conductual",
    description:
      "Se centra en la identificación y cambio de patrones de pensamiento negativos y comportamientos perjudiciales para promover una mejor salud mental.",
    imageSrc: iconCognitiveBehavioral,
  },
  {
    name: "Interactiva",
    description:
      "Destaca la interacción y la comunicación abierta entre el terapeuta y el paciente para abordar los problemas emocionales y mejorar las relaciones.",
    imageSrc: iconInteractive,
  },
  {
    name: "Psicoanálisis",
    description:
      "Se basa en explorar el subconsciente para comprender y resolver conflictos emocionales y problemas psicológicos profundos.",
    imageSrc: iconPsychoanalysis,
  },
  {
    name: "Humanista",
    description:
      "Se enfoca en el crecimiento personal, la autorrealización y la conexión emocional, con énfasis en el potencial humano.",
    imageSrc: iconHumanist,
  },
  {
    name: "Sistémica",
    description:
      "Examina las relaciones y los sistemas familiares para abordar los desafíos personales a través del contexto social y familiar.",
    imageSrc: iconSystemic,
  },
  {
    name: "Gestalt",
    description:
      "Pone énfasis en la conciencia del momento presente y la totalidad de la experiencia personal para promover un mayor entendimiento y autenticidad emocional.",
    imageSrc: iconGestalt,
  },
];

export const Services = () => {
  const { jwt } = useContext(JwtContext);
  const navigate = useNavigate();

  return (
    <div className="mx-auto px-2 sm:px-6 pt-16 lg:pt-24 xl:pt-[136px]">
      <div className="grid  md:grid-cols-2 xl:grid-cols-3 gap-4 grid-center ">
        {services.map((service) => (
          <div
            key={service.name}
            className="group relative flex flex-col items-center"
          >
            <div className="relative transform transition-transform flex items-center justify-center w-[310px] h-[400px] overflow-hidden rounded-2xl bg-[#F9F6FF]">
              <div className="transition-opacity group-hover:absolute group-hover:opacity-0">
                <img src={service.imageSrc} alt={service.name} />
              </div>
              <div className="absolute opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 flex items-center justify-center px-8">
                <p className="font-medium text-lg text-Gray-dark">
                  {service.description}
                </p>
              </div>
            </div>
            <h3 className="text-2xl text-black font-semibold w-[160px] px-[66px] mt-5 flex justify-center">
              {service.name}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-20 lg:my-24">
        <ButtonLilacSlim
          onClick={() => handleButtonVerPsicologos(jwt, navigate)}
          text="Encontrar un psicólogo"
          additionalClasses="w-[384px]"
        />
      </div>
    </div>
  );
};
