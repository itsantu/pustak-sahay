import React, { useState } from "react";
import { useCertificate } from "../hooks/useCertificate";
import Title from "../components/Route/Title";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";

const CertificateUpload = () => {
  const { uploadCertificate, loading, error } = useCertificate();
  const { email } = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    name: "",
    email,
    phone: "",
    dob: "",
    certificateName: "",
    issuedBy: "",
    issueYear: "",
    institution: "",
    certificateFile: null,
  });
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, certificateFile: file }));
      setFileName(file.name);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    await uploadCertificate(formData);
  };

  return (
    <Title titleText="Upload Certificate - Pustak Sahay">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Certificate Submission</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="text"
            name="certificateName"
            placeholder="Certificate Name"
            value={formData.certificateName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="text"
            name="issuedBy"
            placeholder="Issued By"
            value={formData.issuedBy}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="number"
            name="issueYear"
            placeholder="Issue Year"
            value={formData.issueYear}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution Name"
            value={formData.institution}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <div className="mb-3">
            <label className="block mb-1">Upload Certificate (PDF only)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded"
            />
            {fileName && (
              <p className="text-sm text-gray-600 mt-1">{fileName}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${
              !loading ? "bg-blue-500" : "bg-blue-300"
            } w-full text-white p-2 rounded hover:bg-blue-600 transition`}
          >
            {!loading ? "Submit" : "Wait"}
          </button>
        </form>
      </div>
    </Title>
  );
};

export default CertificateUpload;
