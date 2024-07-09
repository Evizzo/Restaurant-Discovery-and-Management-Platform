import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "about_title": "About the Site",
      "users_title": "For Users:",
      "users_description": "On this site, users can easily search for places by location, type of cuisine, or ambiance. Each place has a detailed profile with pictures of the menu and ambiance, allowing you to know in advance what to expect. Additionally, reviews from previous guests are available so you can make the best decision.",
      "owners_title": "For Business Owners:",
      "owners_description": "The site allows you to present your place in the best possible way. With the option to post separate images for the menu and ambiance, owners can easily create an attractive profile for their place. You can also set up a QR code for direct access to your profile, making it easier for users to find and order from you. Platform provides all the necessary tools to have your own page without the need to create a separate website.",
      "tos_title": "Terms of Service",
      "terms_title": "Acceptance of Terms:",
      "terms_description": "By accessing or using our website, you agree to comply with and be bound by these terms of service. If you do not agree to these terms, please do not use the website.",
      "data_availability_title": "Data and Availability:",
      "data_availability_description": "While we strive to ensure the website is always accessible and your data is secure, we cannot guarantee the prevention of data loss. Users and business owners are encouraged to maintain backups of their information as we are not responsible for any loss of data.",
      "liability_title": "Limitation of Liability:",
      "liability_description": "The website is provided 'as is' without any warranties, express or implied. We do not guarantee the accuracy or completeness of the information on the website and are not liable for any damages resulting from the use of the website, including but not limited to direct, indirect, incidental, or consequential damages.",
      "termination_title": "Termination of Service:",
      "termination_description": "We reserve the right to suspend or terminate access to the website for any user or business owner who violates these terms of service or engages in conduct that we deem inappropriate.",
      "changes_title": "Changes to Terms:",
      "changes_description": "We reserve the right to modify these terms of service at any time. Changes will be posted on the website, and continued use of the website constitutes acceptance of the modified terms.",
      "contact_title": "Contact Information:",
      "contact_description": "For any questions or concerns regarding these terms of service, please contact us at gdedaizadjemna@gmail.com.",
    }
  },
  sr: {
    translation: {
      "about_title": "O sajtu",
      "users_title": "Za korisnike:",
      "users_description": "Na ovom sajtu, korisnici mogu jednostavno pretraživati mesta po lokaciji, vrsti kuhinje ili ambijentu. Svako mesto ima detaljan profil sa slikama menija i ambijenta, što vam omogućava da unapred znate šta možete očekivati. Pored toga, dostupne su i recenzije prethodnih gostiju kako biste mogli doneti najbolju odluku.",
      "owners_title": "Za vlasnike lokala:",
      "owners_description": "Sajt omogućava da predstavite svoj lokal na najbolji mogući način. Uz mogućnost postavljanja odvojenih slika za meni i ambijent, vlasnici mogu lako kreirati atraktivan profil svog lokala. Takođe, možete postaviti QR kod za direktan pristup vašem profilu, što olakšava korisnicima da vas pronađu i naruče. Platforma vam pruža sve potrebne alate da imate sopstvenu stranicu bez potrebe za izradom zasebnog sajta.",
      "terms_title": "Prihvatanje uslova:",
      "terms_description": "Pristupom ili korišćenjem našeg sajta, slažete se da ćete se pridržavati ovih uslova korišćenja. Ako se ne slažete sa ovim uslovima, nemojte koristiti sajt.",
      "data_availability_title": "Podaci i dostupnost:",
      "data_availability_description": "Iako se trudimo da sajt bude uvek dostupan i da vaši podaci budu sigurni, ne možemo garantovati sprečavanje gubitka podataka. Korisnici i vlasnici lokala se podstiču da održavaju rezervne kopije svojih informacija, jer nismo odgovorni za bilo kakav gubitak podataka.",
      "liability_title": "Ograničenje odgovornosti:",
      "liability_description": "Sajt se pruža bez ikakvih garancija, izraženih ili podrazumevanih. Ne garantujemo tačnost ili potpunost informacija na sajtu i nismo odgovorni za bilo kakvu štetu koja proizilazi iz korišćenja sajta, uključujući, ali ne ograničavajući se na direktnu, indirektnu, slučajnu ili posrednu štetu.",
      "termination_title": "Prekid usluge:",
      "termination_description": "Zadržavamo pravo da suspendujemo ili prekinemo pristup sajtu za bilo kojeg korisnika ili vlasnika lokala koji krši ove uslove korišćenja ili se ponaša na način koji smatramo neprikladnim.",
      "changes_title": "Izmene uslova:",
      "changes_description": "Zadržavamo pravo da izmenimo ove uslove korišćenja u bilo kom trenutku. Izmene će biti objavljene na sajtu, a nastavak korišćenja sajta predstavlja prihvatanje izmenjenih uslova.",
      "contact_title": "Kontakt informacije:",
      "contact_description": "Za sva pitanja ili nedoumice u vezi sa ovim uslovima korišćenja, kontaktirajte nas na gdedaizadjemna@gmail.com.",
      "tos_title":"Uslovi korišćenja",
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
