import React, { useState, useEffect } from "react";
import { LogIn, Clock, Share2, Calendar, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const Alert = ({ children }) => (
  <div className="fixed top-4 left-4 bg-blue-100 border border-blue-600 text-blue-800 p-4 rounded-lg">
    {children}
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: "",
    day: "",
  });

  useEffect(() => {
    const db = getDatabase();
    const profileRef = ref(db, "profile/imageURL");
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const imageURL = snapshot.val();
      if (imageURL) {
        setProfileImage(imageURL);
      }
    });

    const updateTime = () => {
      const now = new Date();
      const daysInArabic = [
        "الأحد",
        "الإثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      setCurrentTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        date: formattedDate,
        day: daysInArabic[now.getDay()],
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "مكتب السكرتارية",
      text: "صفحة ختام طه - سكرتيرة رئيس المجلس المحلي",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareAlert(true);
        setTimeout(() => setShowShareAlert(false), 3000);
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Modern Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-blue-600">
              مكتب السكرتارية
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>مشاركة</span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>تسجيل الدخول</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showShareAlert && <Alert>تم نسخ الرابط بنجاح</Alert>}

      <main className="container mx-auto px-6 py-8">
        {/* Profile Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="h-56 bg-gradient-to-r from-blue-500 to-blue-600 relative">
            <div className="absolute -bottom-28 right-8 flex items-end">
              <div className="w-56 h-56 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                <img
                  src={profileImage || "/api/placeholder/200/200"}
                  alt="ختام طه"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-32 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  ختام طه
                </h1>
                <p className="text-blue-600 font-medium mb-1">
                  سكرتيرة رئيس المجلس المحلي
                </p>
                <p className="text-gray-500">מזכירה ח'תאם טאהא</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{currentTime.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Display Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">الوقت الحالي</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Day Card */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-lg font-medium text-gray-500 mb-2">
                اليوم
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {currentTime.day}
              </div>
            </div>

            {/* Time Cards */}
            {[
              { value: currentTime.hours, label: "ساعة" },
              { value: currentTime.minutes, label: "دقيقة" },
              { value: currentTime.seconds, label: "ثانية" },
            ].map((time, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-lg font-medium text-gray-500 mb-2">
                  {time.label}
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {String(time.value).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
