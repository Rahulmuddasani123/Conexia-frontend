import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Conexia_logo from "../assets/Conexia_logo.png";
import { BASE_URL } from "../utils/constants";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password, secretKey },
        { withCredentials: true }
      );

      setSuccessMsg("SignUp Successful");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2000);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSecretKey("");
    } catch (err) {
      setError(true);
      setErrorMsg(err?.response?.data || "Something went wrong!");

      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="loginPageMainContainer relative"
    >
      <div className="flex items-center justify-center py-4 ">
        <div className="card w-114 backdrop-blur-md bg-white/15 card-md shadow-md  flex flex-column justify-center align-middle p-2  ">
          <div className="card-body">
            <h2 className="card-title justify-center text-white mb-2">
              Signup
            </h2>

            <div className="flex">
              <fieldset className="fieldset mx-3">
                <legend className="text-white"> First Name</legend>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-white">Last Name</legend>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>
            <fieldset className="fieldset mx-3">
              <legend className="text-white items-center">
                Email <span className="text-red-500  ">*</span>
              </legend>
              <input
                type="text"
                className="input-box"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mx-3">
              <legend className="text-white">
                Password <span className="text-red-500  ">*</span>
              </legend>
              <input
                type="text"
                className="input-box"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mx-3">
              <legend className="text-white">
                Secret Key <span className="text-red-500">*</span>
              </legend>
              <input
                type="text"
                className="input-box"
                placeholder="Enter Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
              <p>Note : Secret Key is used when you Forgot Password</p>
            </fieldset>
            <div className="justify-center card-actions mt-2">
              <button className="loginButton" onClick={handleSignup}>
                Signup <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </div>
          </div>

          <div className="flex  justify-end">
            <div></div>
            <p className="mr-4 text-white alreadyAUserText">Already A User?</p>
            <Link to="/login" className="alreadyAUserText font-bold">
              Login ▶
            </Link>
          </div>

          {error && (
            <div className="toast toast-top toast-center z-200 transition-opacity duration-100">
              <div className="error-Container">
                <span>{errorMsg}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="toast toast-top toast-center">
              <div className="success-Container">
                <span>{successMsg}</span>
              </div>
            </div>
          )}
        </div>
        <img
          src={Conexia_logo}
          className="absolute bottom-20 right-20"
          width={220}
        />
      </div>
    </motion.div>
  );
};

export default Signup;
