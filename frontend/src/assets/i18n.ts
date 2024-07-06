import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "about_title": "About the Site",
      "users_title": "For Users:",
      "users_description": "On this site, users can easily search for places by location, type of cuisine, or ambiance. Each place has a detailed profile with pictures of the menu and ambiance, allowing you to know in advance what to expect. Additionally, reviews from previous guests are available so you can make the best decision.",
      "owners_title": "For Business Owners:",
      "owners_description": "The site allows you to present your place in the best possible way. With the option to post separate images for the menu and ambiance, owners can easily create an attractive profile for their place. You can also set up a QR code for direct access to your profile, making it easier for users to find and order from you. Platform provides all the necessary tools to have your own page without the need to create a separate website."
    }
  },
  sr: {
    translation: {
      "about_title": "O sajtu",
      "users_title": "Za korisnike:",
      "users_description": "Na ovom sajtu, korisnici mogu jednostavno pretraživati mesta po lokaciji, vrsti kuhinje ili ambijentu. Svako mesto ima detaljan profil sa slikama menija i ambijenta, što vam omogućava da unapred znate šta možete očekivati. Pored toga, dostupne su i recenzije prethodnih gostiju kako biste mogli doneti najbolju odluku.",
      "owners_title": "Za vlasnike lokala:",
      "owners_description": "Sajt omogućava da predstavite svoj lokal na najbolji mogući način. Uz mogućnost postavljanja odvojenih slika za meni i ambijent, vlasnici mogu lako kreirati atraktivan profil svog lokala. Takođe, možete postaviti QR kod za direktan pristup vašem profilu, što olakšava korisnicima da vas pronađu i naruče. Platforma vam pruža sve potrebne alate da imate sopstvenu stranicu bez potrebe za izradom zasebnog sajta."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "sr",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
