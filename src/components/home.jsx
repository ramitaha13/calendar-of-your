import React, { useState, useEffect } from "react";
import { LogIn, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const ElectionDay = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
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

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      dir="rtl"
    >
      {/* Simplified Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold text-blue-600">
              مكتب السكرتارية
            </div>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              <span>تسجيل الدخول</span>
              <LogIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
                <img
                  src={profileImage || "/api/placeholder/200/200"}
                  alt="ختام طه"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center lg:text-right">
                <h1 className="text-4xl font-bold text-white mb-4">ختام طه</h1>
                <p className="text-xl text-blue-100 mb-2">
                  سكرتيرة المجلس المحلي
                </p>
                <p className="text-lg text-blue-200">מזכירה ח'תאם טאהא</p>
              </div>
            </div>
          </div>
        </div>

        {/* Time Display */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">الوقت الحالي</h2>
          </div>

          <div className="space-y-8">
            <div className="text-center p-4 bg-blue-50 rounded-2xl">
              <div className="text-xl font-bold text-blue-600 mb-2">
                {currentTime.day}
              </div>
              <div className="text-lg text-gray-600">{currentTime.date}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { value: currentTime.hours, label: "ساعة" },
                { value: currentTime.minutes, label: "دقيقة" },
                { value: currentTime.seconds, label: "ثانية" },
              ].map((time, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {String(time.value).padStart(2, "0")}
                  </div>
                  <div className="text-lg font-medium text-gray-600">
                    {time.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElectionDay;
