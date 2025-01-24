import React, { useState } from "react";
import * as XLSX from "xlsx";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    personalName: "",
    familyName: "",
    amount: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const processedData = jsonData.map((item) => ({
        personalName: item["الاسم الشخصي"] || "",
        familyName: item["العائلة"] || "",
        amount: item["المبلغ"] || 0,
      }));

      setData(processedData);
      setFilteredData(processedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filtered = data.filter(
      (item) =>
        (newFilters.personalName === "" ||
          item.personalName
            .toLowerCase()
            .includes(newFilters.personalName.toLowerCase())) &&
        (newFilters.familyName === "" ||
          item.familyName
            .toLowerCase()
            .includes(newFilters.familyName.toLowerCase())) &&
        (newFilters.amount === "" ||
          item.amount.toString().includes(newFilters.amount))
    );

    setFilteredData(filtered);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6 font-arabic">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          مرشح الملفات الإكسل
        </h1>

        <div className="mb-6 flex flex-col items-center">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:border-none hover:file:bg-blue-600 text-gray-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-right">
          <input
            type="text"
            name="personalName"
            placeholder="الاسم الشخصي"
            value={filters.personalName}
            onChange={handleFilterChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="familyName"
            placeholder="العائلة"
            value={filters.familyName}
            onChange={handleFilterChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="amount"
            placeholder="المبلغ"
            value={filters.amount}
            onChange={handleFilterChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center mb-2 text-gray-600">
          عدد الصفوف: {filteredData.length}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-center border-x border-white">
                  الاسم الشخصي
                </th>
                <th className="p-3 text-center border-x border-white">
                  العائلة
                </th>
                <th className="p-3 text-center border-x border-white">
                  المبلغ
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3 text-center border-x">
                    {item.personalName}
                  </td>
                  <td className="p-3 text-center border-x">
                    {item.familyName}
                  </td>
                  <td className="p-2 text-center border-x">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
