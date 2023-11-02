import imgHero from "../../assets/Images/img-hero.png";
import { ButtonLilacSlim } from "../Buttons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { JwtContext } from "../../Context/JwtContext";
import { handleButtonVerPsicologos } from "../../Utils/utils";

const Hero = () => {
  const { jwt } = useContext(JwtContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col my-6 lg:flex-row mx-8 sm:mx-12 md:mx-16 lg:mx-24 xl:mx-32 gap-12 md:gap-4">
      <div className="flex justify-between flex-col gap-6">
        <h1 className="text-Gray-dark lg:max-w-lg xl:max-w-xl text-4xl xl:text-5xl leading-[3rem] xl:leading-[4rem] font-semibold">
          Encuentra apoyo psicológico con facilidad, en cualquier momento y
          lugar.
        </h1>
        <p className="text-black text-xl md:text-2xl mb-5">
          Cultiva tu bienestar emocional
        </p>
        <div className="flex justify-center md:justify-start">
          <ButtonLilacSlim
            onClick={() => handleButtonVerPsicologos(jwt, navigate)}
            additionalClasses="w-[350px]"
            text="Encontrar un psicólogo"
          />
        </div>
      </div>
      <div className="flex justify-center items-center lg:flex-1">
        <img
          src={imgHero}
          alt="Relaxed Woman"
          className="max-w-full h-auto bg-contain bg-no-repeat lg:h-[377px] lg:w-[565px]"
        />
      </div>
    </div>
  );
};

export default Hero;
