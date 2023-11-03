/* Importaciones */
import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const initalState = {
  id: undefined,
  role: undefined,
  jwt: undefined,
};

const Context = createContext({
  id: "",
  role: "",
  jwt: "",
  setJwt: () => {},
  destroySession: () => {},
});

// Verifica el JWT que ya este puesto pero en el LOCAL STORAGE
// La función que me proporciona el JWT al momento del login es la función de loginpage.
const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState(initalState);

  const firstRender = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setJwt({
        id: decodedToken.id,
        token: token,
        role: decodedToken.role,
      });
    }
  };

  const destroySession = () => {
    localStorage.removeItem("token");
    setJwt(initalState);
  };

  useEffect(() => {
    firstRender();
  }, []);

  return (
    <Context.Provider value={{ jwt, setJwt, destroySession }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
export { JwtProvider, Context as JwtContext };
