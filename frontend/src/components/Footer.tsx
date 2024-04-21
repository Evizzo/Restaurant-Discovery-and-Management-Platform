const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] mt-0 md:mt-0">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5 max-w-4xl w-full">
          <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Društvene mreže</h1>
            <nav className="flex flex-col gap-2">
              <a className="hover:text-backgroundColor transition-all cursor-pointer" href="/">
                Tiktok
              </a>
              <a className="hover:text-backgroundColor transition-all cursor-pointer" href="/">
                Instagram
              </a>
              <a className="hover:text-backgroundColor transition-all cursor-pointer" href="/">
                Facebook
              </a>
            </nav>
          </div>
          <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Kontaktirajte nas</h1>
            <nav className="flex flex-col gap-2">
              <a className="hover:text-backgroundColor transition-all cursor-pointer" href="/">
                gdedaizadjemna@gmail.com
              </a>
              <a className="hover:text-backgroundColor transition-all cursor-pointer" href="/">
                +63...
              </a>
            </nav>
          </div>
          {/* <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Adresa</h1>
            <nav className="flex flex-col gap-2">
              <a className="hover:text-backgroundColor transition-all cursor-pointer" href="/">
                Gde da izadjem na
              </a>
            </nav>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
