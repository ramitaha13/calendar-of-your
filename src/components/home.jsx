import React, { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import naderPhoto from "/src/assets/nader.JPG";

const ElectionDay = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: "",
    day: "",
  });

  useEffect(() => {
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

      // Format date as dd/mm/yyyy
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

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f7ff]" dir="rtl">
      <nav className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold"></div>
            <button
              onClick={() => navigate("/login")}
              className="bg-white px-8 py-3 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
            >
              <span>تسجيل الدخول</span>
              <LogIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-indigo-600 to-blue-600 pb-32 pt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <img
                src={naderPhoto}
                alt="نادر طه"
                className="w-96 h-96 object-cover rounded-2xl border-8 border-white shadow-2xl mb-12"
              />
              <h1 className="text-7xl font-bold text-white mb-8">نادر طه</h1>
              <p className="text-4xl text-blue-100 mb-6">يوميات مدير عام</p>
              <div className="max-w-4xl mx-auto">
                <p className="text-2xl text-blue-100 leading-relaxed">
                  مرشحكم القادم للانتخابات
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Time Section */}
        <div className="container mx-auto px-4 -mt-20">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              الوقت الحالي
            </h2>
            <div className="space-y-8">
              {/* Date and Day Display */}
              <div className="text-center mb-8">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {currentTime.day}
                </div>
                <div className="text-xl text-gray-600">{currentTime.date}</div>
              </div>

              {/* Time Display */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { value: currentTime.hours, label: "ساعة" },
                  { value: currentTime.minutes, label: "دقيقة" },
                  { value: currentTime.seconds, label: "ثانية" },
                ].map((time, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center shadow-lg"
                  >
                    <div className="text-5xl font-bold text-blue-600 mb-2">
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
        </div>
      </main>
    </div>
  );
};

export default ElectionDay;
