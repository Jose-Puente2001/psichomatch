import { Link } from "react-router-dom";
import PlanCard from "../Components/PlanCard";
import iconBasic from "../assets/Icons/iconBasic.svg";
import iconPremium from "../assets/Icons/iconPremium.svg";
import iconProfesional from "../assets/Icons/iconProfesional.svg";
import { ButtonLilacSlim } from "../Components/Buttons";

function Plans() {
  return (
    <section className="min-h-screen w-full py-12">
      <section className="flex items-center flex-col w-full gap-4 mt-6">
        <h1 className="font-semibold text-[32px]">Contrata un plan</h1>
        <p className="mx-4 text-center font-normal text-lg">
          Elige el plan que más se adapte a tus necesidades y clientes como
          <span className="text-blue-500"> terapeúta.</span>
        </p>
      </section>
      <div className="flex flex-col items-center justify-center my-10">
        <div className="container px-8 md:px-6">
          <div className="flex flex-wrap flex-row justify-center items-stretch gap-8">
            <div className="rounded-2xl py-12 bg-[#F9F6FF]">
              <PlanCard
                icon={iconBasic}
                title="Básico"
                price="29.99"
                features={[
                  "Perfil en el directorio de psicólogos.",
                  "Hasta 10 citas programadas al mes.",
                  "Recordatorios de citas automáticos por correo electrónico.",
                  "Soporte por correo electrónico.",
                ]}
              />
            </div>
            <div className="rounded-2xl py-12 bg-[#F6FFF5]">
              <PlanCard
                icon={iconPremium}
                title="Medio"
                price="59.99"
                features={[
                  "Perfil destacado en el directorio de psicólogos.",
                  "Hasta 30 citas programadas al mes.",
                  "Recordatorios de citas automáticos por correo electrónico y SMS.",
                  "Posibilidad de recibir reseñas y calificaciones de los pacientes.",
                  "Soporte prioritario por correo electrónico y chat en vivo.",
                ]}
              />
            </div>
            <div className="rounded-2xl py-12 bg-[#EFF1FE]">
              <PlanCard
                icon={iconProfesional}
                title="Épico"
                price="99.99 "
                features={[
                  "Perfil destacado en el directorio de psicólogos.",
                  "Cantidad ilimitada de citas programadas al mes.",
                  "Recordatorios de citas automáticos por correo electrónico y SMS.",
                  "Posibilidad de recibir reseñas y calificaciones de los pacientes.",
                  "Acceso a herramientas de gestión de pacientes y documentación clínica en línea.",
                  "Soporte prioritario por correo electrónico, chat en vivo y asistencia telefónica.",
                ]}
              />
            </div>
          </div>
        </div>
        <Link to={"/registerTherapist"} className="mt-20">
          <ButtonLilacSlim
            text="Contratar un Plan"
            additionalClasses="w-[320px]"
          />
        </Link>
      </div>
    </section>
  );
}

export default Plans;
