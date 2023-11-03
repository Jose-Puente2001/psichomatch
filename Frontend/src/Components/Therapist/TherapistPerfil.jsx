import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/category";
import { getCountries } from "../../redux/actions/country";
import axios from "axios";
import {
  getTherapistById,
  updateTherapist,
} from "../../redux/actions/therapist";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { JwtContext } from "../../Context/JwtContext";
import SectionPlans from "../RegisterTherapist/SectionPlans";
import SubtitleRegister from "../RegisterTherapist/SubtitleRegister";

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
        <h1 className="text-center font-bold text-2xl md:text-3xl">
          Perfil Psicólogo
        </h1>
        <SubtitleRegister number="1" titleSection="Puedes cambiar tu plan" />
        <SectionPlans PlanId={PlanId} setPlanId={setPlanId} />
        <SubtitleRegister number="2" titleSection="Actualiza tus datos" />

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
          <div className="flex flex-col">
            <label className="mt-10" htmlFor="email">
              E-mail
            </label>
            <input
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
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
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
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
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              type="text"
              id="linkedIn"
              name="linkedIn"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              placeholder="Ingrese su linkedIn"
            />
          </div>

          <div className="flex flex-col">
            <label className="mt-10" htmlFor="adress">
              Direccion
            </label>
            <textarea
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
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
              className="rounded-lg mx-2 border border-[#e9e9e9] p-2 w-full sm:w-96"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese su descripcion"
            />
          </div>
        </div>

        <div className="flex flex-col md:grid grid-cols-2 mt-10 mx-auto gap-1">
          <p className="col-span-2 mb-5 text-lg font-semibold">
            Actualizar la metodologia con la que trabajas
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

        <button
          className="w-56 text-xl font-semibold rounded-full my-10 p-2 mx-auto bg-[#CFBFFF] hover:bg-Purple"
          type="submit"
        >
          Actualizar perfil
        </button>
      </form>
      <div className="flex justify-center flex-col">
        <h3 className="text-2xl font-semibold text-start">Sección Crítica</h3>
        <p>Una vez eliminada tu cuenta deberás crear otra cuenta.</p>
        <hr className="my-3 border-zinc-200 dark:border-zinc-600" />
        <button
          className="w-56 text-xl font-semibold my-6 rounded-full hover:bg-red-200 bg-red-400 p-2 mx-auto"
          type="submit"
          onClick={async () => {
            try {
              const requestOptions = {
                method: "DELETE",
                redirect: "follow",
              };
              const response = await fetch(
                `https://psicomatchapi.onrender.com/therapist/delete/${id}`,
                requestOptions
              );
              const result = await response.text();
              const MySwal = withReactContent(Swal);
              MySwal.fire({
                title: "Se elimino la cuenta correctamente.",
                text: "Serás redirigido al home.",
                icon: "success",
              });
              destroySession();
              navigate("/");
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

export default TherapistPerfil;
