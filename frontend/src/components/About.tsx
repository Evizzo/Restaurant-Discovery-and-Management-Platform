import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'sr' ? 'en' : 'sr');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">{t('about_title')}</h1>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full lg:w-2/4">
          <img className="rounded-lg w-1/2 h-auto mx-auto lg:ml-44" src={"/assets/logo.jpeg"} alt="img" />
        </div>
        <div className="w-full lg:w-2/4 p-4 space-y-3">
          <p>
            <strong>{t('users_title')} </strong>
            <br />
            {t('users_description')}
          </p>
          <p>
            <strong>{t('owners_title')} </strong>
            <br />
            {t('owners_description')}
          </p>
        </div>
      </div>
      <br></br>
      <button onClick={toggleLanguage} className="relative z-10 px-6 py-1 border-2 border-[#D8A262] bg-[#D2B48C] hover:text-[#AB6B2E] transition-all rounded-full" style={{ borderColor: "#F5DEB3" }}>
        {i18n.language === 'sr' ? 'English' : 'Serbian'}
      </button>
    </div>
  );
};

export default About;
