import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./router/Router";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
// import { getAuth } from "firebase/auth";
// import { app } from "./firebaseApp";

export default function App() {
  // const [authenticated, setAuthenticated] = useState<boolean>(false)
  // const auth = getAuth(app);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer />
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}
