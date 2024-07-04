const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">O sajtu</h1>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full lg:w-2/4">
          <img className="rounded-lg w-1/2 h-auto mx-auto lg:ml-44" src={"/assets/logo.jpeg"} alt="img" />
        </div>
        <div className="w-full lg:w-2/4 p-4 space-y-3">
          <p>
          <strong>Za korisnike: </strong>
          <br></br>
          Na ovom sajtu, korisnici mogu jednostavno pretraživati lokale po lokaciji, vrsti kuhinje ili ambijentu. Svaki restoran ima detaljan profil sa slikama menija i ambijenta, što vam omogućava da unapred znate šta možete očekivati. Pored toga, dostupne su i recenzije prethodnih gostiju kako biste mogli doneti najbolju odluku.
          </p>
          <p>
          <strong>Za vlasnike lokala: </strong>
          <br></br>
          Sajt omogućava da predstavite svoj lokal na najbolji mogući način. Uz mogućnost postavljanja odvojenih slika za meni i ambijent, vlasnici mogu lako kreirati atraktivan profil svog lokala. Takođe, možete postaviti QR kod za direktan pristup vašem profilu, što olakšava korisnicima da vas pronađu i naruče. Naša platforma vam pruža sve potrebne alate da imate sopstvenu stranicu bez potrebe za izradom zasebnog sajta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
