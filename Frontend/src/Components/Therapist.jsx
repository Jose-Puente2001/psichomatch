import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AgendaCita from "./AgendaCita";
import {
  filterTherapist,
  getTherapistPerPage,
  searchTherapist,
} from "../redux/actions/therapist";
import IconWorld from "../assets/Icons/world.svg";
import IconLinkedin from "../assets/Icons/linkedin.svg";
import IconArrowRight from "../assets/Icons/arrowRight.svg";
import IconArrowLeft from "../assets/Icons/arrowLeft.svg";
import FilterTherapistResponsive from "./FilterTherapistResponsive";

const Therapist = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const dispath = useDispatch();

  const therapists = useSelector((state) => state.therapist.therapists);
  const filterStatus = useSelector((state) => state.therapist.filterStatus);
  const searchStatus = useSelector((state) => state.therapist.searchStatus);
  const searchValue = useSelector((state) => state.therapist.search);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const selectedCountry = useSelector((state) => state.country.selectedCountry);
  const params = useParams();

  useEffect(() => {
    dispath(getTherapistPerPage(""));
  }, []);

  const patientId = params.id;

  const prevButtonHandler = async (e) => {
    e.preventDefault();

    if (therapists.actualPage !== 1) {
      if (!filterStatus && !searchStatus)
        dispath(getTherapistPerPage(therapists.actualPage - 1));
      if (filterStatus && !searchStatus) {
        dispath(
          filterTherapist(
            selectedCategory,
            selectedCountry,
            therapists.actualPage - 1
          )
        );
      }

      if (searchStatus)
        dispath(searchTherapist(searchValue, therapists.actualPage - 1));
    }
  };

  const nextButtonHandler = async (e) => {
    e.preventDefault();

    if (therapists.actualPage < therapists.totalPages) {
      if (!filterStatus && !searchStatus)
        dispath(getTherapistPerPage(therapists.actualPage + 1));

      if (filterStatus && !searchStatus)
        dispath(
          filterTherapist(
            selectedCategory,
            selectedCountry,
            therapists.actualPage + 1
          )
        );

      if (searchStatus) {
        dispath(searchTherapist(searchValue, therapists.actualPage + 1));
      }
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 md:mt-16 mb-8 mx-auto gap-6">
        <FilterTherapistResponsive />
        <div>
          {therapists.therapists?.map((therapist) => (
            <div
              className="flex flex-col lg:flex-row gap-x-10 gap-y-4 lg:gap-y-10 mb-10"
              key={therapist.id}
            >
              <div className="grid grid-cols-2 w-96">
                <img
                  className="w-[137px] h-[137px] rounded-full gap-1"
                  src={therapist.image}
                  alt="Terapista"
                />
                <div className="h-40 flex flex-col items-start justify-center">
                  <h1 className="font-semibold text-black text-2xl">
                    {therapist.name} {therapist.lastName}
                  </h1>
                  <h3>
                    <span className="font-semibold text-xl">Precio:</span> $
                    {therapist.price}
                  </h3>
                </div>
                <div className="font-bold flex items-center justify-start gap-6 mt-5 ">
                  <img src={IconWorld} alt="World" />
                  <p className="font-semibold text-black text-xl">
                    {therapist.Country.name}
                  </p>
                </div>
                <div className="font-bold flex items-center gap-6 mt-5">
                  <img src={IconLinkedin} alt="Linkedin" />
                  <a
                    className="font-semibold text-black text-xl"
                    href={`${therapist.linkedIn}`}
                  >
                    Linkedin
                  </a>
                </div>
                <div className="col-span-2">
                  <h3 className="mt-8 ont-medium inline-flex text-black text-base bg-[#F1ECFF] px-4 py-2 rounded-3xl">
                    {therapist.Category.name}
                  </h3>
                  <p
                    className={`mt-5 text-justify ${
                      showFullDescription ? "" : "line-clamp-3"
                    }`}
                  >
                    {therapist.description}
                  </p>
                  <button
                    className="text-[#6372FF] text-base font-medium"
                    onClick={handleToggleDescription}
                  >
                    {showFullDescription ? "Ver menos" : "Ver más"}
                  </button>
                </div>
              </div>
              <AgendaCita
                patientId={Number(patientId)}
                therapistId={Number(therapist.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-56 items-center mx-auto my-7">
        <button
          onClick={prevButtonHandler}
          className="bg-violet-100 w-10 h-10 rounded-full flex justify-center items-center"
        >
          <img src={IconArrowLeft} alt="Icon arrow left" />
        </button>
        <p>{therapists.actualPage + " / " + therapists.totalPages}</p>

        <button
          onClick={nextButtonHandler}
          className="bg-violet-100 w-10 h-10 rounded-full flex justify-center items-center"
        >
          <img src={IconArrowRight} alt="Icon arrow right" />
        </button>
      </div>
    </div>
  );
};

export default Therapist;