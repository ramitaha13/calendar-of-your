import React, { useState } from "react";
import { Upload } from "lucide-react";
import { getDatabase, ref, update } from "firebase/database";
import axios from "axios";

// Background Image Upload Component
const BackgroundImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const IMGBB_API_KEY = "09fbbc889aa75bba791fff0e456cc668";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 16 * 1024 * 1024) {
        setError("حجم الملف كبير جداً. الحد الأقصى هو 16 ميغابايت");
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("الرجاء اختيار صورة أولاً");
      return;
    }

    try {
      setError(null);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", IMGBB_API_KEY);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
          },
        }
      );

      const imageUrl = response.data.data.url;

      const db = getDatabase();
      const backgroundRef = ref(db, "background");
      await update(backgroundRef, {
        imageURL: imageUrl,
      });

      setSuccess("تم رفع صورة الخلفية بنجاح");
      setUploadProgress(0);
      setFile(null);
      setImagePreview(null);
    } catch (err) {
      setError("حدث خطأ أثناء رفع الصورة");
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 max-w-2xl mx-auto mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-6 text-right">
        تحميل صورة الخلفية
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-right">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-right">
          <span className="block sm:inline">{success}</span>
        </div>
      )}

      <div className="flex flex-col items-end space-y-4">
        {imagePreview && (
          <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-right w-full"
          />
        </div>

        <div className="flex justify-end w-full">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file}
            className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
          >
            <span className="ml-2">رفع صورة الخلفية</span>
            <Upload className="h-5 w-5" />
          </button>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundImageUpload;
