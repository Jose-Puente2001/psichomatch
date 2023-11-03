import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getCategories } from "../../redux/actions/category";
import { getCountries } from "../../redux/actions/country";
import axios from "axios";
import { getTherapistById, updateTherapist } from "../../redux/actions/therapist";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import iconBasic from "../../assets/Icons/iconBasic.svg";
import iconPremium from "../../assets/Icons/iconPremium.svg";
import iconProfesional from "../../assets/Icons/iconProfesional.svg";
import { JwtContext } from "../../Context/JwtContext";

function TherapistPerfil() {

  const { destroySession } = useContext(JwtContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const therapist = useSelector((state) => state.therapist.therapist);
  const updated = useSelector((state) => state.therapist.updated);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const categories = useSelector((state) => state.category.categories);
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
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
    dispatch(getTherapistById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (therapist) {
      const {
        name,
        lastName,
        image,
        price,
        description,
        adress,
        CategoryId,
        CountryId,
        phone,
        linkedIn,
        email,
        PlanId,
      } = therapist;
      setName(name);
      setLastname(lastName);
      setAdress(adress);
      setPhone(phone);
      setCategoryId(CategoryId);
      setCountryId(CountryId);
      setDescription(description);
      setImage(image);
      setPrice(price);
      setPlanId(PlanId);
      setLinkedIn(linkedIn);
      setEmail(email);
    }
  }, [therapist]);

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
      image &&
      description &&
      adress &&
      CategoryId &&
      CountryId &&
      phone &&
      linkedIn &&
      email &&
      PlanId
    ) {
      try {
        if (image !== therapist.image) {
          await uploadImage(image);
        }

        // Capturamos el resultado del dispatch en una variable
        const updatedResult = await dispatch(
          updateTherapist({
            id,
            name: name,
            lastName: lastName,
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
          })
        );

        if (updatedResult) {
          // Puedes usar updatedResult en este punto
          console.log(updatedResult);

          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <p>Psicólogo actualizado Exitosamente</p>,
            icon: "success",
          });
        } else {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <p>Llena todos los campos</p>,
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error.message);
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
        <h1 className="text-center font-bold text-3xl">Perfil Psicólogo</h1>
        <div className="flex items-center ml-56">
          <p className="bg-violet-100 rounded-full w-20 h-20 flex items-center justify-center">
            1
          </p>
          <p className="ml-2 font-bold">Paso 1 - Elige un plan</p>
        </div>
        <div className="flex justify-center items-center ">
          <div className=" bg-violet-100 rounded mr-5 w-80 p-10">
            <div className="grid justify-items-center">
              <img src={iconBasic} alt="" />
              <div className="p-6">
                <h1 className="text-xl font-bold">$29.99</h1>
                <span>Dis/mes</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-bold">Plan Basico: </h2>
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
            <div className="bg-lime-100 rounded mr-5 w-80 p-10">
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
            <div className="bg-blue-100 rounded w-80 p-10">
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

        <div className="flex items-center ml-56">
          <p className="bg-violet-100 rounded-full w-20 h-20 flex items-center justify-center">
            2
          </p>
          <p className="ml-2 font-bold">Llena tus datos</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
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
          {/* <div className="flex flex-col">
            <label className="mt-10" htmlFor="firstName">
              Nombre
            </label>
            <input
              className="rounded border border-gray-700 p-2 w-96"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Ingrese su nombre"
            />
          </div> */}
          {/* <div className="flex flex-col">
            <label className="mt-10" htmlFor="lastName">
              Apellido
            </label>
            <input
              className="rounded border border-gray-700 p-2 w-96"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              name="lastName"
              placeholder="Ingrese su apellido"
            />
          </div> */}
          <div className="flex flex-col">
            <label className="mt-10" htmlFor="email">
              E-mail
            </label>
            <input
              className="rounded border border-gray-700 p-2 w-96"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Igrese su email"
            />
          </div>

          <div className="flex flex-col">
            <label className="mt-10" htmlFor="phone">
              Phone
            </label>
            <input
              className="rounded border border-gray-700 p-2 w-96"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingrese su telefono"
            />
          </div>

          <div className="flex flex-col">
            <label className="mt-10" htmlFor="linkedIn">
              LinkedIn
            </label>
            <input
              className="rounded border border-gray-700 p-2 w-96"
              type="text"
              id="linkedIn"
              name="linkedIn"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              placeholder="Ingrese su linkedIn"
            />
          </div>

          {/* <div className="flex flex-col">
            <label className="mt-10" htmlFor="price">
              Precio
            </label>
            <input
              className="rounded border border-gray-700 p-2 w-96"
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ingrese su precio"
            />
          </div> */}

          <div className="flex flex-col">
            <label className="mt-10" htmlFor="adress">
              Direccion
            </label>
            <textarea
              className="rounded border border-gray-700 p-2 w-96"
              id="adress"
              name="adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              placeholder="Ingrese su direccion"
            />
          </div>

          <div className="flex flex-col">
            <label className="mt-10" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="rounded border border-gray-700 p-2 w-96"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese su descripcion"
            />
          </div>
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
          className="bg-violet-300 font-bold rounded-full w-48 py-2 mx-auto my-10"
          type="submit"
        >
          Actualizar perfil
        </button>
      </form>
      <>
          <div className="flex justify-center flex-col">
            <h3 className="text-2xl font-bold text-start">Sección Crítica</h3>
            <p>Una vez eliminada tu cuenta deberás crear otra cuenta.</p>
            <hr className="my-3 border-zinc-200 dark:border-zinc-600" />
            <button
            className="bg-red-400 font-bold rounded-full w-96 py-2 mx-auto my-2"
            type="submit"
            onClick={async () => {
              try {
                const requestOptions = {
                  method: 'DELETE',
                  redirect: 'follow'
                };

                const response = await fetch(`https://psicomatchapi.onrender.com/therapist/delete/${id}` , requestOptions);
                const result = await response.text();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                  title: "Se elimino la cuenta correctamente.",
                  text: 'Serás redirigido al home.',
                  icon: "success",
                });
                destroySession();
                navigate("/")

              } catch (error) {
                console.log('error', error);
              }
            }}
          >
            Eliminar cuenta
          </button>
          </div>
      </>
      {/* <div className="flex flex-col mb-10">
        <div className="flex items-center ml-56">
          <p className="bg-violet-100 rounded-full w-20 h-20 flex items-center justify-center">
            4
          </p>
          <p className="ml-2 font-bold">Horario</p>
        </div>
        <div className="flex flex-col mx-auto mt-10">
          <p className="font-bold mb-5">
            Elige el horario en el que deseas atender pacientes
          </p>

          <Agenda therapistId={Number(id)} />
        </div>
      </div> */}
    </div>
    // <section className="my-2">
    //   <article className="my-5">
    //     <h2 className="text-2xl font-bold text-start">Tu Perfil</h2>
    //     <p className="my-3">
    //       Aquí podrás editar todo lo relacionado con tu perfil para que pueda
    //       ser más completo, y llegar a más personas.
    //     </p>
    //   </article>

    //   <section className="my-5 py-5">
    //     <h3 className="text-2xl font-bold text-start">Imagen de Perfil</h3>
    //     <hr className="my-4 border-zinc-200 dark:border-zinc-600" />
    //   </section>

    //   <label htmlFor="image" className="cursor-pointer">
    //     <div className="w-40 h-40 mx-auto bg-violet-100 rounded-full flex items-center justify-center">
    //       {therapist.image ? (
    //         <img
    //           src={therapist.image}
    //           alt="Tu Foto"
    //           className="w-full h-full rounded-full"
    //         />
    //       ) : (
    //         <span className="text-lg font-bold">Tu Foto</span>
    //       )}
    //     </div>
    //     <div className="overlay">+</div>
    //   </label>
    //   <input
    //     type="file"
    //     id="image"
    //     name="image"
    //     className="hidden"
    //     onChange={handleImageChange}
    //   />

    //   <section className="my-5 py-5">
    //     <h3 className="text-2xl font-bold text-start">Información personal:</h3>
    //     <hr className="my-3 border-zinc-200 dark:border-zinc-600" />
    //   </section>

    //   <section className="text-start">
    //     <p> Agrega una descripción adecuada a tu trabajo, mientras más específica sea; más clientes podrás conseguir.</p>
        
    //     <article className="my-3">
    //     <label className="mt-10" htmlFor="description">
    //         Descripción:
    //         </label>
    //         <br></br>
    //         <textarea 
    //           className="rounded border border-gray-700 p-2 w-96"
    //           id="description"
    //           name="description"
    //           placeholder="Ingrese su descripcion"
    //         />
    //         <br/>
    //         <label className="mt-10" htmlFor="price">
    //           Número
    //         </label>
    //         <br/>
    //         <input
    //           className="rounded border border-gray-700 p-2 w-96"
    //           type="number"
    //           id="price"
    //           name="price"
    //           placeholder="Ingrese su precio"
    //         />
    //     </article>
    //   </section>

    //   <section className="my-5 py-5">
    //     <h3 className="text-2xl font-bold text-start">Sección Crítica:</h3>
    //     <hr className="my-4 border-zinc-200 dark:border-zinc-600" />
    //   </section>


    //   <section className="text-center">
    //     <p className="my-3">
    //       Aquí, si es que deseas puedes eliminar tu cuenta de PsicoMatch, <br />
    //       ten en cuenta que tu cuenta desaparecerá automáticamente de la
    //       aplicación.
    //     </p>

    //     <button
    //       className={`w-[400px] text-Gray-dark text-xl font-semibold bg-[#FF0000] py-2 px-3 rounded-[48px] hover:bg-Purple`}
    //     >
    //       Eliminar mi cuenta
    //     </button>
    //   </section>
    // </section>
  );
}

export default TherapistPerfil;
