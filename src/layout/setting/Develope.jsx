import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Instagram, WhatsApp } from "@mui/icons-material";

const DeveloperContact = () => {
  return (
    <div className=" flex items-center justify-center  text-white p-6">
      <div className="max-w-lg w-full space-y-8 rounded-lg  shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Developer Contact
        </h2>
        <p className="text-center text-gray-400">
          Reach out to the developer for inquiries, suggestions, or feedback
          about Socialite!
        </p>

        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <EmailIcon className="text-indigo-500" />
            <span className="text-gray-300">mr.luckysharma7@gmail.com</span>
          </div>

          <div className="flex space-x-6 justify-center ">
            <a
              href="https://github.com/Ashutosh137/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <GitHubIcon fontSize="large" />
            </a>
            <a
              href="https://www.linkedin.com/in/ashutosh-sharma-5b99b0226/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <LinkedInIcon fontSize="large" />
            </a>
            <a
              href="https://www.instagram.com/ashutosh_sharma137/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Instagram fontSize="large" />
            </a>
            <a
              href="https://wa.me/7877997488?text=Hello%20Ashutosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <WhatsApp fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperContact;
