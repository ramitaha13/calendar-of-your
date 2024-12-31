import React, { useState } from "react";
import {
  LogIn,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  Check,
  Square,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebaseConfig";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "اسم المستخدم مطلوب";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    if (!isVerified) {
      newErrors.verification = "يرجى التحقق من أنك لست روبوتًا";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const db = getDatabase(app);
        const userRef = ref(db, "user");
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (
          userData &&
          userData.username === formData.username &&
          userData.password === formData.password
        ) {
          localStorage.setItem("username", formData.username);
          navigate("/mainpage");
        } else {
          setErrors({
            auth: "اسم المستخدم أو كلمة المرور غير صحيحة",
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors({
          auth: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-4 sm:p-6"
      dir="rtl"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative px-4 sm:px-0">
        <button
          onClick={handleBack}
          className="absolute right-4 -top-16 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5" />
          <span>العودة للرئيسية</span>
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-emerald-600 to-cyan-400 rounded-2xl p-0.5 mx-auto transform rotate-45">
              <div className="bg-white w-full h-full rounded-2xl flex items-center justify-center -rotate-45">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-800" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600">
            مرحباً
          </h1>
        </div>

        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {errors.auth && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {errors.auth}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                اسم المستخدم
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                  placeholder="أدخل اسم المستخدم"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                كلمة المرور
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-300"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsVerified(!isVerified);
                  if (errors.verification) {
                    setErrors((prev) => ({ ...prev, verification: "" }));
                  }
                }}
                className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between group hover:border-gray-300 transition-all duration-300"
              >
                <span className="text-sm text-gray-600">أنا لست روبوتًا</span>
                <div
                  className={`w-5 sm:w-6 h-5 sm:h-6 rounded flex items-center justify-center transition-colors duration-300 ${
                    isVerified ? "bg-emerald-500" : "border-2 border-gray-300"
                  }`}
                >
                  {isVerified && (
                    <Check className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                  )}
                </div>
              </button>
              {errors.verification && (
                <p className="text-red-500 text-sm">{errors.verification}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl sm:rounded-2xl py-3 sm:py-4 font-medium transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative"
            >
              <span
                className={`flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
              >
                <span>تسجيل الدخول</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
