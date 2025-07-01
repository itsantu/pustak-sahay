import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CertificateForReview = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.user.user);
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/certificates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCertificateData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchCertificate();
    }
  }, [id, token]);

  const handleViewPDF = () => {
    window.open(certificateData.certificateUrl, "_blank");
  };

  const handleAccept = () => {
    alert("Certificate accepted ✅");
    // Add backend API call here
  };

  const handleReject = () => {
    alert("Certificate rejected ❌");
    // Add backend API call here
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
          Certificate Review
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Name:</strong> {certificateData.name}
          </p>
          <p>
            <strong>Phone:</strong> {certificateData.phone}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(certificateData.dob).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Institution:</strong> {certificateData.institution}
          </p>
          <p>
            <strong>Certificate Name:</strong> {certificateData.certificateName}
          </p>
          <p>
            <strong>Issued By:</strong> {certificateData.issuedBy}
          </p>
          <p>
            <strong>Issue Year:</strong> {certificateData.issueYear}
          </p>
          <p>
            <strong>Uploaded At:</strong>{" "}
            {new Date(certificateData.createdAt)
              .toLocaleDateString("en-GB")
              .replaceAll("/", "-")}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleViewPDF}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            View Certificate
          </button>

          <div className="flex gap-4">
            <Link
              to={`/certificate-review/reward-allot/${certificateData._id}`}
              state={{
                name: certificateData.name,
                certName: certificateData.certificateName,
                email: certificateData.email
              }}
              className="flex-1 "
            >
              <button className="w-full text-white  py-2 rounded bg-green-500 hover:bg-green-600 transition cursor-pointer">
                Accept
              </button>
            </Link>

            <button
              onClick={handleReject}
              className="bg-red-500 text-white flex-1 py-2 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateForReview;
