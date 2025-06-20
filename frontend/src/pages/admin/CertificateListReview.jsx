import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Route/Title";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";

const CertificateListReview = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.user);
  const [certificateList, setCertificateList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/certificates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCertificateList(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchCertificates();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Title titleText="Certificate List for Review - Pustak Sahay">
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Certificates for Review</h1>
        <div className="space-y-4">
          {certificateList?.map((certificate) => (
            <div
              key={certificate._id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4"
            >
              <div className="flex-1 text-gray-900">
                <p className="text-xl">
                  <strong>Name:</strong> {certificate.name}
                </p>
                <p>
                  <strong>Certificate Name:</strong>{" "}
                  {certificate.certificateName}
                </p>
                <p>
                  <strong>Issued By:</strong> {certificate.issuedBy}
                </p>
                <p>
                  <strong>Uploaded At: </strong>
                  {new Date(certificate.createdAt)
                    .toLocaleDateString("en-GB")
                    .replaceAll("/", "-")}
                </p>
              </div>
              <button
                onClick={() =>
                  navigate(`/certificate-review/${certificate._id}`)
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </Title>
  );
};

export default CertificateListReview;
