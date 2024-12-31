import React, { useEffect, createContext, useContext, useState } from "react";
import {
  LogOut,
  Building2,
  Users,
  User,
  ClipboardList,
  Calendar,
  Mail,
  ArrowRight,
  Phone,
  Save,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Create Language Context
const LanguageContext = createContext();

// Translations object
const translations = {
  ar: {
    logout: "تسجيل الخروج",
    title: "مذكره السلطة المحلية كابول",
    notes: "ملاحظات",
    importantDates: "مواعيد هامة",
    todayDates: "مواعيد اليوم",
    phoneNumbers: "ارقام هواتف",
    importantEmails: "إيميلات يجب تذكرها",
    linksAndDirections: "روابط وتوجيهات",
    addNotes: "اضافة ملاحظات",
    addDates: "اضافة مواعيد هامة",
    addPhones: "اضافة ارقام هواتف",
    addEmail: "اضافة Email",
    contactUs: "تواصل معنا للمساعدة",
    husband: "زوجك",
    son: "ابنك",
  },
  he: {
    logout: "התנתק",
    title: "יומן הרשות המקומית כאבול",
    notes: "הערות",
    importantDates: "תאריכים חשובים",
    todayDates: "תאריכי היום",
    phoneNumbers: "מספרי טלפון",
    importantEmails: "אימיילים לזכור",
    linksAndDirections: "קישורים והנחיות",
    addNotes: "הוסף הערות",
    addDates: "הוסף תאריכים חשובים",
    addPhones: "הוסף מספרי טלפון",
    addEmail: "הוסף אימייל",
    contactUs: "צור קשר לעזרה",
    husband: "בעלך",
    son: "בנך",
  },
};

// Language Provider Component
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("he");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "he" : "ar"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, translations } =
    useContext(LanguageContext);

  return (
    <header className="bg-white shadow-md py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                localStorage.removeItem("username");
                navigate("/");
              }}
              className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut className="h-6 w-6" />
              <span className="mr-2">{translations.logout}</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              <Globe className="h-6 w-6" />
              <span className="mr-2">
                {language === "he" ? "العربية" : "עברית"}
              </span>
            </button>
          </div>

          <h1 className="text-2xl font-bold text-blue-900">
            {translations.title}
          </h1>
        </div>
      </div>
    </header>
  );
};

const NavigationCard = ({ icon: Icon, title, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <Icon className="h-8 w-8 md:h-12 md:w-12 text-white mb-2 md:mb-3" />
      <span className="text-white text-sm md:text-lg font-medium text-center">
        {title}
      </span>
    </div>
  );
};

const MainContent = () => {
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
      <h1 className="text-xl font-bold text-white mb-6 text-center md:hidden">
        {translations.localElectionsPortal}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mb-6 md:mb-12">
        <NavigationCard
          icon={Building2}
          title={translations.notes}
          onClick={() => navigate("/notes")}
        />
        <NavigationCard
          icon={Calendar}
          title={translations.importantDates}
          onClick={() => navigate("/importantdates")}
        />
        <NavigationCard
          icon={Calendar}
          title={translations.todayDates}
          onClick={() => navigate("/nowdate")}
        />
        <NavigationCard
          icon={User}
          title={translations.phoneNumbers}
          onClick={() => navigate("/numbers")}
        />
        <NavigationCard
          icon={Mail}
          title={translations.importantEmails}
          onClick={() => navigate("/emailimportant")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-12">
        <div className="bg-white rounded-xl p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-4 md:mb-6 text-right">
            {translations.linksAndDirections}
          </h2>
          <div className="space-y-3 md:space-y-4">
            <button
              className="flex items-center justify-between w-full text-right p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors text-sm md:text-base"
              onClick={() => navigate("/addnote")}
            >
              <span>▶</span>
              <span>{translations.addNotes}</span>
            </button>
            <button
              className="flex items-center justify-between w-full text-right p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors text-sm md:text-base"
              onClick={() => navigate("/adddate")}
            >
              <span>▶</span>
              <span>{translations.addDates}</span>
            </button>
            <button
              className="flex items-center justify-between w-full text-right p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors text-sm md:text-base"
              onClick={() => navigate("/addnumbers")}
            >
              <span>▶</span>
              <span>{translations.addPhones}</span>
            </button>
            <button
              className="flex items-center justify-between w-full text-right p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors text-sm md:text-base"
              onClick={() => navigate("/addemail")}
            >
              <span>▶</span>
              <span>{translations.addEmail}</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-800 to-cyan-600 rounded-xl p-6 md:p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              {translations.contactUs}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <p className="text-white text-lg font-medium mb-2">
                  {translations.husband}
                </p>
                <a
                  href="tel:0543277208"
                  className="text-white text-xl hover:text-amber-400 transition-colors duration-200 flex justify-center items-center gap-2"
                >
                  0543277208
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <p className="text-white text-lg font-medium mb-2">
                  {translations.son}
                </p>
                <a
                  href="tel:0537333343"
                  className="text-white text-xl hover:text-amber-400 transition-colors duration-200 flex justify-center items-center gap-2"
                >
                  0537333343
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username || username !== "Khetam") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LanguageProvider>
      <div className="min-h-screen" dir="rtl">
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-800 to-cyan-600">
          <MainContent />
        </main>
        <footer className="bg-amber-400 py-3 md:py-4 fixed bottom-0 w-full">
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center"></div>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default MainPage;
