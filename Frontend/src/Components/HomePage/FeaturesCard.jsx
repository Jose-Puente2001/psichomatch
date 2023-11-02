import IconOne from "../../assets/Icons/featureSectionOne.svg";
import IconTwo from "../../assets/Icons/featureSectionTwo.svg";
import IconThree from "../../assets/Icons/featureSectionThree.svg";

const features = [
  {
    name: "Encuentra tu especialista",
    description:
      "Explora nuestra lista de especialistas y elige el más adecuado.",
    imgHref: IconOne,
  },
  {
    name: "Elige la fecha",
    description:
      "Selecciona una fecha y hora conveniente en nuestra plataforma en línea.",
    imgHref: IconTwo,
  },
  {
    name: "Acude a tu cita ",
    description: "En persona o virtual según la fecha y hora acordadas.",
    imgHref: IconThree,
  },
];

export const FeaturesCard = () => {
  return (
    <div className="mx-auto my-24">
      <h3 className="text-black font-semibold text-xl md:text-2xl text-center">Simples pasos para obtener apoyo:  </h3>
      <div className="mt-16 mx-8 sm:mx-12 md:mx-16 lg:mx-24 xl:mx-32 grid grid-cols-1 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col gap-6 w-64">
            <div className="ml-10">
              <img
                src={feature.imgHref}
                className="rounded-full bg-cover h-24 w-24"
              />
            </div>
            <p className="text-lg text-black font-semibold mt-1">{feature.name}</p>
            <p className="text-lg font-medium leading-6 text-black">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
