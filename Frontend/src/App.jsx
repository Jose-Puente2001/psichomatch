import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Layouts/Footer";
import { JwtProvider } from "./Context/JwtContext";
import AppRouter from "./Routes/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <>
      <JwtProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
        </Provider>
      </JwtProvider>
    </>
  );
}

export default App;