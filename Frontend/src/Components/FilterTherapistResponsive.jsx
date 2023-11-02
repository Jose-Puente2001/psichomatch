import  { useState } from "react";
import FilterTherapist from "./FilterTherapist";
import clearIcon from "../assets/Icons/clear.svg";
import IconFilter from "../assets/Icons/iconFilter.svg";
import { Dialog } from "@headlessui/react";

const FilterTherapistResponsive = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="md:self-start">
      <div className="w-full">
        <div className="hidden md:flex">
          <FilterTherapist />
        </div>
        <button
          type="button"
          className="flex md:hidden bg-[#F5F5F5] text-center items-center justify-center rounded-md py-2 px-2 gap-48 sm:gap-60"
          onClick={() => setMobileMenuOpen(true)}
        >
          <p className="font-medium text-black pl-4 text-lg">Filtrar por:</p>
          <img src={IconFilter} alt="Close" />
        </button>
      </div>
      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <Dialog.Panel
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1"
        >
          <div className="bg-[#F5F5F5] flex items-center justify-between rounded-md px-4">
            <div className="flex flex-row-reverse items-center justify-center rounded-md py-2 gap-2">
              <p className="font-medium text-black pl-4 text-lg">
                Filtrar por:
              </p>
              <img src={IconFilter} alt="Filter" />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src={clearIcon} alt="Close" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                <FilterTherapist />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default FilterTherapistResponsive;
