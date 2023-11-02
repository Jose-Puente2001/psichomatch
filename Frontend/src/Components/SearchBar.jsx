import { useState } from 'react';
import searchIcon from "../assets/Icons/search.svg";
import { useDispatch, useSelector } from 'react-redux';
import { filterStatus, searchStatus, searchTherapist, setSearch } from '../redux/actions/therapist';
import { selectedCountry } from '../redux/actions/country';
import { selectedCategory } from '../redux/actions/category';


const SearchBar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const searchValue = useSelector((state) => state.therapist.search);
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const dispatch = useDispatch();

  const handleSearch = (e)=>{
    const actualValue = e.target.value;

    dispatch(setSearch(actualValue))


    if(actualValue){
      dispatch(searchStatus(true))
      dispatch(filterStatus(false))
      dispatch(selectedCountry(""))
      dispatch(selectedCategory(""))
      dispatch(searchTherapist(actualValue))
    }

  }

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={toggleSearch}>
        <img src={searchIcon} alt="" />
      </div>
      {isSearchVisible && (
        <div className="absolute top-0 right-0 mt-12">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Buscar..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;