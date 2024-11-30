import React, { useState } from "react";
import axios from "axios";
import "./certificate.css";
const CertificateForm = () => {
  console.log("ADD ",process.env.REACT_APP_BASE_URL);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    date: "",
    email: "",
  });
  const [pdfLink, setPdfLink] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/generate`,
        formData,
        {headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json;"
          }}
      );
      setPdfLink(response.data.pdfLink);
    } catch (err) {
      console.error("Error generating certificate:", err);
    }
  };

  return (
    <div className="login-popup">
        <form onSubmit={handleSubmit} className="login-container">
        <h1 className="heading">Certificate Generator</h1>
          <div className="login-inputs">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              name="course"
              placeholder="Course"
              onChange={handleChange}
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className="input"
              type="date"
              name="date"
              onChange={handleChange}
            />
          </div>
          <button className="input btn" type="submit">
            Generate Certificate
          </button>
        </form>
      {pdfLink && (
        <p>
          Certificate generated! <a href={pdfLink}>View PDF</a>
        </p>
      )}
    </div>
  );
};

export default CertificateForm;
