import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Route/Title";
import Navbar from "../components/Navbar/Navbar";

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/scholarship/"
        );
        if (response.status >= 200 && response.status < 300) {
          setScholarships(response.data);
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
  }, []);

  if (loading) return <div>Loading page!</div>;
  if (error) return <div>{error}</div>;

  return (
    <Title titleText="Scholarships">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Recent Scholarships</h1>
        {scholarships.length === 0 ? (
          <p>No scholarships available</p>
        ) : (
          <ul className="space-y-4">
            {scholarships.map(
              ({ _id, title, applicationDeadline, eligibleCandidate }) => (
                <li
                  key={_id}
                  className="p-4 border flex rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex-1 p-2">
                    <Link to={`./${_id}`}>
                      <h2 className="text-lg font-semibold hover:underline">
                        {title}
                      </h2>
                    </Link>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {applicationDeadline
                        ? new Date(applicationDeadline).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Eligible For:</strong> {eligibleCandidate}
                    </p>
                  </div>
                  <div className="flex items-center px-6">
                    <Link to={`./${_id}`}>
                      <button className="px-2 py-1 bg-green-400 rounded-sm hover:bg-green-600 cursor-pointer">
                        See Details
                      </button>
                    </Link>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </Title>
  );
};

export default ScholarshipList;
