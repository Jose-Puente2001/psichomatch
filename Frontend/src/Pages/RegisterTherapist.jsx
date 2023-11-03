import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getCategories } from "../redux/actions/category";
import { getCountries } from "../redux/actions/country";
import axios from "axios";
import { insertTherapist } from "../redux/actions/therapist";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import iconBasic from "../assets/Icons/iconBasic.svg";
import iconPremium from "../assets/Icons/iconPremium.svg";
import iconProfesional from "../assets/Icons/iconProfesional.svg";
import PlanCard from "../Components/PlanCard";
import SubtitleRegister from "../Components/RegisterTherapist/SubtitleRegister";
import { ButtonLilacSlim } from "../Components/Buttons";
import SectionPlans from "../Components/RegisterTherapist/SectionPlans";
const RegisterTherapist = () => {
  const therapist = useSelector((state) => state.therapist.created);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const categories = useSelector((state) => state.category.categories);
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [CountryId, setCountryId] = useState("");
  const [image, setImage] = useState("");
  const [PlanId, setPlanId] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const handleCountryChange = (country) => {
    setCountryId(country);
  };

  const handleCategoryChange = (category) => {
    setCategoryId(category);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountries());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const uploadImage = async (image) => {
    const preset_key = "compumundo";
    const cloud_name = "dpqjfpdt0";
    const file = image;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name &&
      lastName &&
      image &&
      price &&
      description &&
      adress &&
      CategoryId &&
      CountryId &&
      phone &&
      linkedIn &&
      email &&
      PlanId &&
      password
    ) {
      try {
        await uploadImage(image);

        // Luego de que la imagen se haya cargado con éxito, procede a insertar el terapeuta
        const result = await dispatch(
          insertTherapist({
            name,
            lastName,
            image,
            price: Number(price),
            description,
            adress,
            CategoryId,
            CountryId,
            phone,
            linkedIn,
            email,
            PlanId,
            password,
          })
        );

        if (result) {
          if (result.payload.id) {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
              title: <p>Psicologo Agregado Exitosamente</p>,
              icon: "success",
            });

            setName("");
            setLastname("");
            setAdress("");
            setPhone("");
            setPassword("");
            setCategoryId("");
            setCountryId("");
            setDescription("");
            setImage("");
            setPrice("");
            setPlanId("");
            setLinkedIn("");
            setEmail("");
          }
        }
      } catch (error) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: <p>Error al cargar la imagen o crear el perfil</p>,
          icon: "error",
        });
      }
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: <p>Llena todos los campos</p>,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex w-auto items-center justify-center mx-6 md:mx-10 py-12">
      <form onSubmit={handleSubmit} className="flex flex-col mt-6">
        <h1 className="text-center font-semibold text-2xl md:text-3xl">
          Registro de Psicólogo
        </h1>
        <SubtitleRegister number="1" titleSection="Elige un plan" />
        {/* <div className="flex flex-wrap flex-row justify-center items-stretch gap-8">
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
        </div> */}
<SectionPlans PlanId={PlanId} setPlanId={setPlanId} />
        <SubtitleRegister number="2" titleSection="Llena tus datos" />

        <div className="flex flex-col justify-center items-center">
          <div className="xl:text-center md:mt-2 sm:mt-2">
            <label htmlFor="image" className="cursor-pointer">
              <div className="w-40 h-40 mx-auto bg-violet-100 rounded-full flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Tu Foto"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-lg font-bold">Tu Foto</span>
                )}
              </div>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col mt-5 sm:mt-3">
            <label htmlFor="name">Nombre</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Ingrese su nombre"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="lastName">Apellido</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              name="lastName"
              placeholder="Ingrese su apellido"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="email">E-mail</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su email"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="password">Contraseña</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contrasena"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="phone">Phone</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingrese su telefono"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="linkedIn">LinkedIn</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="text"
              id="linkedIn"
              name="linkedIn"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              placeholder="Ingrese su LinkedIn"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="price">Precio</label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ingrese su precio"
              min="1"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="adress">Direccion</label>
            <textarea
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              id="adress"
              name="adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              placeholder="Ingrese su direccion"
            />
          </div>

          <div className="flex flex-col mt-3 sm:mt-3">
            <label htmlFor="description">Descripción</label>
            <textarea
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese su descripcion"
            />
          </div>
        </div>
        <SubtitleRegister number="3" titleSection="Enfoque y Pais" />
        <div className="flex flex-col md:grid grid-cols-2 mt-10 mx-auto gap-1">
          <p className="col-span-2 mb-5 text-lg font-semibold">
            Elige la metodologia con la que trabajas
          </p>

          {categories?.map((category) => {
            return (
              <div
                className="ml-10 mt-1 flex justify-start gap-3"
                key={category.id}
              >
                <input
                  type="radio"
                  value={category.id}
                  checked={CategoryId === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <label>{category.name}</label>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col md:grid grid-cols-2 mt-10 mx-auto gap-1">
          <p className="col-span-2 mb-5 text-lg font-semibold">
            Elige tu pais de residencia
          </p>
          {countries?.map((country) => {
            return (
              <div
                className="ml-10 mt-1 flex justify-start gap-3"
                key={country.id}
              >
                <input
                  type="radio"
                  value={country.id}
                  checked={CountryId === country.id}
                  onChange={() => handleCountryChange(country.id)}
                />
                <label>{country.name}</label>
              </div>
            );
          })}
        </div>

        <ButtonLilacSlim
          type="submit"
          text="Crear perfil"
          additionalClasses="w-60 self-center my-10"
        />
      </form>
    </div>
  );
};

export default RegisterTherapist;
