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
    <div className="w-full p-12">
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <h1 className="text-center font-bold text-3xl">
          Registro de Psicólogo
        </h1>
        <div className="flex items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
          <p className="bg-violet-100 rounded-full w-20 h-20 flex items-center justify-center">
            1
          </p>
          <p className="ml-2 font-bold">Elige un plan</p>
        </div>
        <div className="xl:flex justify-center items-center md:grid mt-2 sm:grid gap-4 md:gap-8 lg:gap-12 xl:gap-16">
          <div className="bg-violet-100 rounded mr-5 w-80 p-10 md:p-10 mb-4">
            <div className="grid justify-items-center">
              <img src={iconBasic} alt="" />
              <div className="p-6">
                <h1 className="text-xl font-bold">$29.99</h1>
                <span>Dis/mes</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-bold">Plan Básico: </h2>

              <ul className="list-disc">
                <li>Perfil en el directorio de psicologos.</li>
                <li>Hasta 10 citas programdas al mes.</li>
                <li>
                  Recordatorios de citas automaticas por correo electronico.
                </li>
                <li>Soporte por correo electronico</li>
              </ul>
            </div>
            <div className="mt-5" key={uuidv4()}>
              <input
                className="mr-2"
                type="radio"
                value={1}
                checked={PlanId === 1}
                onChange={() => setPlanId(1)}
              />
              <label>{"Selecciona este plan"}</label>
            </div>
          </div>

          <div>
            <div className="bg-lime-100 rounded mr-5 w-80 p-10 md:p-10 mb-4">
              <div className="grid justify-items-center">
                <img src={iconPremium} alt="" />
                <div className="p-6">
                  <h1 className="text-xl font-bold">$59.99</h1>
                  <span>Dis/mes</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-bold">Plan Premium: </h2>
                <ul className="list-disc">
                  <li>Perfil destacado en el directorio de psicologos.</li>
                  <li>Hasta 30 citas programadas al mes.</li>
                  <li>
                    Recordatorios de citas automaticas por correo electronico y
                    SMS.
                  </li>
                  <li>
                    Posibilidad de recibir resenas y calificaciones de los
                    pacientes.
                  </li>
                  <li>
                    Soporte prioritario por correo electronico y chat en vivo
                  </li>
                </ul>
              </div>
              <div className="mt-5" key={uuidv4()}>
                <input
                  type="radio"
                  value={2}
                  checked={PlanId === 2}
                  onChange={() => setPlanId(2)}
                />
                <label>{"Selecciona este plan"}</label>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-blue-100 rounded w-80 p-10 md:p-10 mb-4">
              <div className="grid justify-items-center">
                <img src={iconProfesional} alt="" />
                <div className="p-6">
                  <h1 className="text-xl font-bold">$99.99</h1>
                  <span>Dis/mes</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-bold">Plan Profesional: </h2>
                <ul className="list-disc">
                  <li>Perfil destacado en el directorio de psicologos.</li>
                  <li>Cantidad ilimitada de citas programadas al mes</li>
                  <li>
                    Recordatorios de citas automaticas por correo electronico y
                    SMS.
                  </li>
                  <li>
                    Posibilidad de recibir resenas y calificaciones de los
                    pacientes.
                  </li>
                  <li>
                    Acceso a herramientas de gestion de pacientes y
                    documentacion clinica en linea.
                  </li>
                  <li>
                    Soporte prioritario por correo electronico, chat en vivo y
                    asistencia telefonica
                  </li>
                </ul>
              </div>
              <div key={uuidv4()}>
                <input
                  type="radio"
                  value={3}
                  checked={PlanId === 3}
                  onChange={() => setPlanId(3)}
                />
                <label>{"Selecciona este plan"}</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
          <p className="bg-violet-100 rounded-full w-20 h-20 flex items-center justify-center">
            2
          </p>
          <p className="ml-2 font-bold">Llena tus datos</p>
        </div>

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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
      type="number"
      id="price"
      name="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Ingrese su precio"
    />
  </div>

  <div className="flex flex-col mt-3 sm:mt-3">
    <label htmlFor="adress">Direccion</label>
    <textarea
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
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
      className="rounded border border-gray-700 p-2 w-full sm:w-96"
      id="description"
      name="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Ingrese su descripcion"
    />
  </div>
</div>

        <div className="flex items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
          <p className="bg-violet-100 rounded-full w-20 h-20 flex items-center justify-center">
            3
          </p>
          <p className="ml-2 font-bold">Enfoque y Pais </p>
        </div>
        <div className="grid grid-cols-2 mt-10 mx-auto gap-1">
          <p className="col-span-2 mb-5 font-bold">
            Elige la metodologia con la que trabajas
          </p>

          {categories?.map((category) => {
            return (
              <div key={category.id}>
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
        <div className="grid grid-cols-2 mt-10 mx-auto gap-1">
          <p className="col-span-2 mb-5 font-bold">
            Elige tu pais de residencia
          </p>

          {countries?.map((country) => {
            return (
              <div key={country.id}>
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
        <button
          className="bg-violet-300 rounded-full w-48 py-2 font-semibold mx-auto my-10"
          type="submit"
        >
          Crear perfil
        </button>
      </form>
    </div>
  );
};

export default RegisterTherapist;