import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from "../layouts/Button.tsx";
import { useAuth } from '../api/AuthContex';

const HomePage = () => {
  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authContext.login();
        console.log("Korisnik je ulogovan.")
      } catch (error) {
        console.error("Greška prilikom prijave:", error);
      }
    };

    fetchData();
  }, [authContext.login]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="text-center">
        <h1 className="font-semibold text-4xl leading-tight mb-2">Tražite mesto za izlazak ?</h1>
        <h3 className="font-semibold text-4xl leading-tight mb-4">Na pravom ste mestu !</h3>
        <p className="text-sm mb-4">Otkrijte savršeno mesto za izlazak u samo nekoliko klikova !</p>
        <p className="text-sm mb-4">Pretražite mesta za izlazak putem personalizovane pretrage. Samo izaberite svoje preferencije, a mi ćemo obaviti ostalo !</p>
        <Link to="/search">
          <Button title="Istražite mesta za izlazak" />
        </Link>
      </div>
      <div className="text-center mt-8">
      <h1 className="font-semibold text-4xl leading-tight mb-2">Da li ste vlasnik mesta za izlazak ?</h1>
        <p className="text-sm mb-4">Lako dodajte svoje mesto za izlazak. Samo se registrujte i popunite formular. 
        Dobićete stranicu na našem sajtu gde možete postaviti slike, menije, opise, tagove i objavljivati razne događaje i ažuriranja !</p>
        <Link to="/add-spot">
          <Button title="Dodajte Vaš objekat" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
