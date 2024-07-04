const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] mt-0 md:mt-0">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5 max-w-4xl w-full">
          <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Društvene mreže</h1>
            <nav className="flex flex-col gap-2">
              <a
                className="hover:text-backgroundColor transition-all cursor-pointer"
                href="https://www.tiktok.com/@gde_da_izadjem_na?_t=8njxE0CNGeE&_r=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tiktok
              </a>
              <a
                className="hover:text-backgroundColor transition-all cursor-pointer"
                href="https://www.instagram.com/gdedaizadjemna?igsh=ZWZoOHNoZzZ1ZnNw&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </nav>
          </div>
          <div>
            <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Kontaktirajte nas</h1>
            <nav className="flex flex-col gap-2">
              <a
                className="hover:text-backgroundColor transition-all cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                gdedaizadjemna@gmail.com
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
