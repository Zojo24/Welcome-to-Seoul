import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./router/Router";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useEffect, useState } from "react";

export default function App() {
  const auth = getAuth(app);

  const [init, setInit] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Header />
      {init ? <Router authenticated={authenticated} /> : <>Loading...</>}
      <Footer />
    </>
  );
}
