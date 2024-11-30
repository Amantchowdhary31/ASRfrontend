import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const CertificateForm = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-certificate",
        { name, course, date },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Ensure authToken is valid
            "Content-Type": "application/json", // Explicit content type
          },
          responseType: "blob", // Expecting a file response
        }
      );

      // Generate a download URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert(
        "Failed to generate certificate. Please check console for details."
      );
    }
  };

  return (
    <div className="login-popup">
      <h1 className="heading">Generate Certificate</h1>
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="login-inputs">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>

      {pdfUrl && (
        <div>
          <h2>Certificate Generated</h2>
          <a href={pdfUrl} download="certificate.pdf">
            Download Certificate
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateForm;
