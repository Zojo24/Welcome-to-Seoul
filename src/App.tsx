import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./router/Router";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";

export default function App() {
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
