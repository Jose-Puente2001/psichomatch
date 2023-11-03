import PlanCard from "../PlanCard";
import iconBasic from "../../assets/Icons/iconBasic.svg";
import iconPremium from "../../assets/Icons/iconPremium.svg";
import iconProfesional from "../../assets/Icons/iconProfesional.svg";
import { v4 as uuidv4 } from "uuid";

function SectionPlans({PlanId, setPlanId}) {
  return (
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
        <div className="ml-10 mt-6 flex justify-start gap-4" key={uuidv4()}>
          <input
            className="mr-2"
            type="radio"
            value={1}
            checked={PlanId === 1}
            onChange={() => setPlanId(1)}
          />
          <label className="text-blue-600">{"Selecciona este plan"}</label>
        </div>
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
        <div className="ml-10 mt-6 flex justify-start gap-4" key={uuidv4()}>
          <input
            type="radio"
            value={2}
            checked={PlanId === 2}
            onChange={() => setPlanId(2)}
          />
          <label className="text-blue-600">{"Selecciona este plan"}</label>
        </div>
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
        <div className="ml-10 mt-6 flex justify-start gap-4" key={uuidv4()}>
          <input
            type="radio"
            value={3}
            checked={PlanId === 3}
            onChange={() => setPlanId(3)}
          />
          <label className="text-blue-600">{"Selecciona este plan"}</label>
        </div>
      </div>
    </div>
  );
}

export default SectionPlans;
