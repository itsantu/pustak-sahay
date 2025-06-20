import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Route/Title";
import Navbar from "../components/Navbar/Navbar";

const ScholarshipDetail = () => {
  const { id } = useParams();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/scholarship/${id}`
        );
        if (response.status >= 200 && response.status < 300) {
          setScholarship(response.data);
        } else {
          setError("Failed to fetch scholarships");
        }
      } catch (error) {
        setError("Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, [id]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error occured</div>;

  return (
    <Title titleText={scholarship?.title + " - Pustak Sahay"}>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <img
          src={scholarship?.imageUrl}
          alt={scholarship?.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{scholarship?.title}</h1>
        <div className="flex justify-between">
          <p className="text-gray-600 font-bold mb-4">
            Deadline:{" "}
            {new Date(scholarship?.applicationDeadline).toLocaleDateString()}
          </p>
          <p className="mb-4 font-semibold">
            Award:{" "}
            <span className="font-bold text-2xl text-green-500">
              ₹{scholarship?.award.toLocaleString()}
            </span>
          </p>
        </div>

        <p className="mb-4 font-semibold p-2 bg-slate-300 rounded-md w-fit">
          Eligible Candidate: {scholarship?.eligibleCandidate}
        </p>
        <p className="mb-4">{scholarship?.description}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Eligibility</h2>
          <ul className="list-disc ml-6">
            {scholarship?.eligibility.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Documents Required</h2>
          <ul className="list-disc ml-6">
            {scholarship?.documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">How to Apply</h2>
          <ul className="list-disc ml-6">
            {scholarship?.howCanApply.map((step, index) => (
              <li key={index} className="font-bold">
                Step {index + 1}: <span className="font-normal">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Terms and Conditions</h2>
          <ul className="list-disc ml-6">
            {scholarship?.termsAndConditions.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>

        <a
          href={scholarship?.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </a>
      </div>
    </Title>
  );
};

export default ScholarshipDetail;
