import AllRoute from "./route/allroute";
import LoginRoute from "./route/loginroute";
import { NavBar } from "./component/navbar";
import { Footer } from "./component/footer";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Error_404 } from "./pages/404";
import { Register } from "./users/Registration/registration";
import { RegisterRoute } from "./route/registerroute";




function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AllRoute />
      <LoginRoute />
      <RegisterRoute/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
