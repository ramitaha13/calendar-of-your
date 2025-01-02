import React, { useState, useEffect } from "react";
import { LogOut, ArrowRight, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, update, get } from "firebase/database";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="h-6 w-6" />
            <span className="mr-2">تسجيل الخروج</span>
          </button>

          <h1 className="text-2xl font-bold text-blue-900">
            تغيير كلمة المرور
          </h1>

          <button
            onClick={() => navigate("/mainpage")}
            className="flex items-center text-blue-900 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowRight className="h-6 w-6" />
            <span className="mr-2">رجوع</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const ChangePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    if (newPassword.length < 7) {
      setError("كلمة المرور يجب أن تكون 7 أحرف على الأقل");
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمات المرور الجديدة غير متطابقة");
      setIsSubmitting(false);
      return;
    }

    try {
      const db = getDatabase();
      const userRef = ref(db, "user");

      const snapshot = await get(userRef);
      if (!snapshot.exists() || snapshot.val().password !== currentPassword) {
        setError("كلمة المرور الحالية غير صحيحة");
        setIsSubmitting(false);
        return;
      }

      await update(userRef, {
        password: newPassword,
      });

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/mainpage");
      }, 1500);
    } catch (err) {
      setError("حدث خطأ أثناء تحديث كلمة المرور");
      console.error("Error updating password:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e, setPassword) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0 && value.length < 7) {
      setError("كلمة المرور يجب أن تكون 7 أحرف على الأقل");
    } else {
      setError(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-6 text-right">
        تغيير كلمة المرور
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-right">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-right">
          <span className="block sm:inline">تم تغيير كلمة المرور بنجاح</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="currentPassword"
            className="block text-right text-gray-700 text-sm font-bold mb-2"
          >
            كلمة المرور الحالية
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="newPassword"
            className="block text-right text-gray-700 text-sm font-bold mb-2"
          >
            كلمة المرور الجديدة
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e, setNewPassword)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-right text-gray-700 text-sm font-bold mb-2"
          >
            تأكيد كلمة المرور الجديدة
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            <span className="ml-2">تغيير كلمة المرور</span>
            <Lock className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const username = localStorage.getItem("username");
      if (username !== "Khetam") {
        navigate("/");
        return;
      }
      setIsAuthorized(true);
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-800 to-cyan-600">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
          <ChangePasswordForm />
        </div>
      </main>
      <footer className="bg-amber-400 py-3 md:py-4 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center"></div>
      </footer>
    </div>
  );
};

export default ChangePasswordPage;
