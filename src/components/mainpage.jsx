import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import {
  LogOut,
  Building2,
  User,
  Calendar,
  Mail,
  Globe,
  FileText,
  MapPin,
  Briefcase,
  Settings,
  Globe2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import chatgpt1 from "/src/assets/2.JPG";
import Gemini1 from "/src/assets/3.JPG";
import gmail1 from "/src/assets/4.JPG";
import outlook1 from "/src/assets/5.JPG";

const LanguageContext = createContext();

const translations = {
  ar: {
    settings: "الإعدادات",
    tasks: "مهام للقيام بها",
    addTasks: "إضافة مهمة",
    logout: "تسجيل الخروج",
    title: "مذكره السلطة المحلية كابول",
    notes: "ملاحظات",
    importantDates: "مواعيد هامة",
    todayDates: "مواعيد اليوم",
    expiredDates: "تواريخ منتهية الصلاحية",
    phoneNumbers: "ارقام هواتف",
    importantEmails: "إيميلات يجب تذكرها",
    writeDoc: "صياغة الوثيقة",
    addresses: "عناوين للتذكر",
    linksAndDirections: "روابط وتوجيهات",
    addNotes: "اضافة ملاحظات",
    addDates: "اضافة مواعيد هامة",
    addPhones: "اضافة ارقام هواتف",
    addEmail: "اضافة Email",
    addAddress: "إضافة عنوان",
    addWebsite: "إضافة موقع",
    contactUs: "تواصل معنا للمساعدة",
    husband: "زوجك",
    son: "ابنك",
    chatGPTDescription: "آلة تقوم بكل شيء من أجلك وتجعل حياتك سهلة",
    geminiDescription: "ذكاء اصطناعي متقدم يساعدك في جميع المهام",
    importantWebsites: "مواقع مهمة",
  },
  he: {
    settings: "הגדרות",
    tasks: "משימות לעשות",
    addTasks: "הוסף משימה",
    logout: "התנתק",
    title: "יומן הרשות המקומית כאבול",
    notes: "הערות",
    importantDates: "תאריכים חשובים",
    todayDates: "תאריכי היום",
    expiredDates: "תאריכים שעברו תוקף",
    phoneNumbers: "מספרי טלפון",
    importantEmails: "אימיילים לזכור",
    writeDoc: "ניסוח מכתב",
    addresses: "כתובות לזכור",
    linksAndDirections: "קישורים והנחיות",
    addNotes: "הוסף הערות",
    addDates: "הוסף תאריכים חשובים",
    addPhones: "הוסף מספרי טלפון",
    addEmail: "הוסף אימייל",
    addAddress: "הוסף כתובת",
    addWebsite: "הוסף אתר",
    contactUs: "צור קשר לעזרה",
    husband: "בעלך",
    son: "בנך",
    chatGPTDescription: "מכונה שעושה הכל בשבילך והופכת את חייך לקלים",
    geminiDescription: "בינה מלאכותית מתקדמת שעוזרת לך בכל המשימות",
    importantWebsites: "אתרים חשובים",
  },
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("he");
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ar" ? "he" : "ar"));
  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const SidebarLink = ({ icon: Icon, title, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 w-full hover:bg-white/10 rounded-lg transition-colors ${className}`}
  >
    <Icon className="h-5 w-5" />
    <span>{title}</span>
  </button>
);

const QuickActionCard = ({ title, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white"
  >
    <ChevronRight className="h-5 w-5" />
    <span>{title}</span>
  </button>
);

const EmailServiceCard = ({ icon, title, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center group"
  >
    <img
      src={icon}
      alt={title}
      className="h-16 w-16 mb-3 transform group-hover:scale-110 transition-transform"
    />
    <span className="text-lg font-semibold text-blue-900">{title}</span>
  </a>
);

const AIServiceCard = ({ icon, title, description, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center group"
  >
    <img
      src={icon}
      alt={title}
      className="h-20 w-20 mb-4 transform group-hover:scale-110 transition-transform"
    />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-blue-100 text-center">{description}</p>
  </a>
);

const Sidebar = ({ isMobile, onClose }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage, translations } =
    useContext(LanguageContext);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    if (isMobile) {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile, onClose]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-2">
        <SidebarLink
          icon={Building2}
          title={translations.notes}
          onClick={() => navigate("/notes")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Calendar}
          title={translations.importantDates}
          onClick={() => navigate("/importantdates")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Calendar}
          title={translations.todayDates}
          onClick={() => navigate("/nowdate")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Calendar}
          title={translations.expiredDates}
          onClick={() => navigate("/pastdates")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={User}
          title={translations.phoneNumbers}
          onClick={() => navigate("/numbers")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Mail}
          title={translations.importantEmails}
          onClick={() => navigate("/emailimportant")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={FileText}
          title={translations.writeDoc}
          onClick={() => navigate("/writedoce")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={MapPin}
          title={translations.addresses}
          onClick={() => navigate("/address")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Briefcase}
          title={translations.tasks}
          onClick={() => navigate("/Tasks")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Globe2}
          title={translations.importantWebsites}
          onClick={() => navigate("/websites")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Settings}
          title={translations.settings}
          onClick={() => navigate("/settings")}
          className="text-gray-100"
        />
        <SidebarLink
          icon={Globe}
          title={language === "he" ? "العربية" : "עברית"}
          onClick={toggleLanguage}
          className="text-gray-100"
        />
      </div>
      {isMobile && (
        <>
          <div className="mt-4 pt-4 border-t border-white/20">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>{translations.logout}</span>
            </button>
          </div>
        </>
      )}
      {isMobile && (
        <button onClick={onClose} className="absolute top-4 left-4 text-white">
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  );

  return isMobile ? (
    <div
      ref={sidebarRef}
      className="fixed inset-y-0 right-0 w-64 bg-blue-900 z-50 p-6 shadow-xl overflow-y-auto"
    >
      {sidebarContent}
    </div>
  ) : (
    <div className="hidden lg:block w-64 bg-blue-900 p-6 fixed h-full overflow-y-auto">
      {sidebarContent}
    </div>
  );
};

const Header = ({ onMenuClick }) => {
  const { translations } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>{translations.logout}</span>
          </button>
        </div>
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-blue-900">
          {translations.title}
        </h1>
      </div>
    </header>
  );
};

const MainContent = () => {
  const navigate = useNavigate();
  const { translations } = useContext(LanguageContext);

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">
            {translations.linksAndDirections}
          </h2>
          <div className="space-y-3">
            <QuickActionCard
              title={translations.addNotes}
              onClick={() => navigate("/addnote")}
            />
            <QuickActionCard
              title={translations.addDates}
              onClick={() => navigate("/adddate")}
            />
            <QuickActionCard
              title={translations.addPhones}
              onClick={() => navigate("/addnumbers")}
            />
            <QuickActionCard
              title={translations.addEmail}
              onClick={() => navigate("/addemail")}
            />
            <QuickActionCard
              title={translations.addAddress}
              onClick={() => navigate("/addaddress")}
            />
            <QuickActionCard
              title={translations.addTasks}
              onClick={() => navigate("/addTasks")}
            />
            <QuickActionCard
              title={translations.addWebsite}
              onClick={() => navigate("/addwebsite")}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <EmailServiceCard
              icon={gmail1}
              title="Gmail"
              link="https://mail.google.com"
            />
            <EmailServiceCard
              icon={outlook1}
              title="Outlook"
              link="https://outlook.live.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIServiceCard
              icon={chatgpt1}
              title="ChatGPT"
              description={translations.chatGPTDescription}
              link="https://chatgpt.com"
            />
            <AIServiceCard
              icon={Gemini1}
              title="Gemini AI"
              description={translations.geminiDescription}
              link="https://gemini.google.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {translations.contactUs}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
            <p className="text-white text-lg font-medium mb-3">
              {translations.husband}
            </p>
            <a
              href="tel:0543272208"
              className="text-white text-2xl hover:text-amber-400"
            >
              0543272208
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
            <p className="text-white text-lg font-medium mb-3">
              {translations.son}
            </p>
            <a
              href="tel:0537333343"
              className="text-white text-2xl hover:text-amber-400"
            >
              0537333343
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username || username !== "Khetam") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-100" dir="rtl">
        <Header onMenuClick={() => setShowMobileSidebar(true)} />
        {showMobileSidebar && (
          <Sidebar isMobile onClose={() => setShowMobileSidebar(false)} />
        )}
        <Sidebar />
        <div className="lg:mr-64">
          <main className="min-h-screen">
            <MainContent />
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

// Export the MainContext to be used in other components if needed
export const useMainContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useMainContext must be used within a LanguageProvider");
  }
  return context;
};

export default MainPage;
