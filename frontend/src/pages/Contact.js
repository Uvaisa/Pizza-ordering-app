import React, { useState } from "react";
import PizzaLeft from "../helpers/assests/pizzaLeft.jpg";
import "../styles/Contact.css";
import { contactApi } from "../servise/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [input, setinput] = useState({
    cname: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const { cname, email, message } = input;
    if (!cname || !email || !message) {
      toast.error("all fields are required");
    }
    const response = await contactApi(input);
    console.log(input);
    if (response.status === 200) {
      setinput({ ...input, cname: "", email: "", message: "" });
      navigate("/");
    }
  };
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        {/* <form id="contact-form" method="POST"> */}
        <form id="contact-form">
          {/* <label htmlFor="name">Full Name</label> */}
          <label>Full Name</label>

          <input
            name="cname"
            placeholder="Enter full name..."
            type="text"
            onChange={handlechange}
          />
          <label>Email</label>
          <input
            name="email"
            placeholder="Enter email..."
            type="email"
            onChange={handlechange}
          />
          <label>Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            onChange={handlechange}
            required
          ></textarea>
          <button type="submit" onClick={handleSubmit}>
            {" "}
            Send Message
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
