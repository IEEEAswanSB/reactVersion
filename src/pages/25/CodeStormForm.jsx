import { useState, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { sendcodestormuser } from "../../../services/register.service";

const CodeStormForm = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    faculty: "",
    academicYear: "",
    handle: "",
    favoritePlatform: "",
    id: "",
  });

  const academicYearOptions = ["Prep", "1", "2", "3", "4", "5"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const inputs = document.querySelectorAll(".animated-input");
    const button = document.querySelector(".animated-button");
    const header = document.querySelector(".animated-header");

    gsap.fromTo(
      inputs,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      button,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        delay: inputs.length * 0.2,
      }
    );

    gsap.fromTo(
      header,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
      }
    );
  }, []);

  const generateRandomCode = () => {
    const codes = [
      "undefined",
      "null",
      'cout<<"Hello,world";',
      'console.log("test")',
      "return 0;",
      "<script>",
      "<html/>",
      "print('IEEE CodeStorm')",
      "console.log()",
      "js",
      "c++",
      "int main(){\n\nreturn 0;\n\n}",
    ];
    return codes[Math.floor(Math.random() * codes.length)];
  };

  useEffect(() => {
    const createRainDrop = () => {
      const rainDrop = document.createElement("div");
      rainDrop.className = "rain-drop";
      rainDrop.innerText = generateRandomCode();

      const leftPos = Math.random() * 60 + 10;
      rainDrop.style.left = `${leftPos}vw`;

      document.body.appendChild(rainDrop);

      gsap.to(rainDrop, {
        y: window.innerHeight * 0.8,
        duration: Math.random() * 4 + 5,
        ease: "linear",
        onComplete: () => {
          rainDrop.remove();
        },
        scrollTrigger: {
          trigger: rainDrop,
          start: "top 100%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      });
    };

    const interval = setInterval(createRainDrop, 600);

    return () => clearInterval(interval);
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.university) tempErrors.university = "University is required";
    if (!formData.faculty) tempErrors.faculty = "Faculty is required";
    if (!formData.academicYear)
      tempErrors.academicYear = "Academic Year is required";
    if (!formData.handle) tempErrors.handle = "Handle is required";
    if (!formData.id) tempErrors.id = "National ID is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      sendcodestormuser(formData)
        .then((res) => {
          console.log(res);
          setError("Submitted Successfully");
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data[0].message);
        });
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="body">
      <div className="wall">
        <form onSubmit={handleSubmit} className="code-storm-form">
          <h2 className="animated-header">IEEE CodeStorm Competition</h2>
          {[
            { name: "name", type: "text", label: "name" },
            { name: "email", type: "email", label: "email" },
            { name: "university", type: "text", label: "university" },
            { name: "faculty", type: "text", label: "faculty" },
            { name: "handle", type: "text", label: "handle" },
            {
              name: "favoritePlatform",
              type: "text",
              label: "favorite problem solving platform",
            },
            {
              name: "id",
              type: "number",
              label: "National Id",
            },
            { name: "phone", type: "number", label: "phone" },
          ].map((field) => (
            <div key={field} className="form-group">
              <label>
                {field.label.charAt(0).toUpperCase() +
                  field.label
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`animated-input ${
                  errors[field.name] ? "error" : ""
                }`}
                placeholder={`Enter your ${field.name
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
              />
              {errors[field.name] && (
                <span className="error-message">{errors[field.name]}</span>
              )}
            </div>
          ))}

          <div className="form-group">
            <label>Academic Year</label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className={`animated-input ${errors.academicYear ? "error" : ""}`}
            >
              <option value="">Select Academic Year</option>
              {academicYearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.academicYear && (
              <span className="error-message">{errors.academicYear}</span>
            )}
          </div>
          <p
            style={{
              color: error == "Submitted Successfully" ? "green" : "red",
              textAlign: "center",
              fontSize: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {error || " "}
          </p>
          <button type="submit" className="animated-button">
            Submit
          </button>
        </form>
      </div>
      <Button
        component={Link}
        to="/"
        className="back"
        color="warning"
        sx={{
          // in the top left of the page with a before element that contains a back arrow
          position: "absolute",
          top: "1rem",
          left: "1rem",
          "&::before": {
            content: "'←'",
            marginRight: "0.5rem",
          },
        }}
      >
        Home
      </Button>
    </div>
  );
};

export default CodeStormForm;
