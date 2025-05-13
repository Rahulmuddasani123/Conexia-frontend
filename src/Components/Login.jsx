import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Conexia_logo from "../assets/Conexia_logo.png";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setSuccess(true);
      setSuccessMsg("Login Successful");
      dispatch(addUser(res.data));
      setError(false);
      navigate("/");
    } catch (err) {
      setError(true);
      setErrorMsg("Invalid Credentials");

      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="loginPageMainContainer relative"
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="card w-96 backdrop-blur-md bg-white/15 card-md shadow-md  flex flex-column justify-center align-middle  ">
          <div className="card-body p-5">
            <h2 className="card-title justify-center text-white">Login</h2>
            <fieldset className="fieldset my-2">
              <legend className=" text-white">Email Id</legend>
              <input
                type="text"
                className="input-box bg-red-500"
                value={email}
                placeholder="Enter Email Id"
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset relative my-2">
              <legend className=" text-white ">Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                className="input-box w-full  "
                autoComplete="current-password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-4 text-sm text-black-600"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eyeIcon"
                />
              </button>
            </fieldset>
            <div className="justify-center card-actions my-3 ">
              <button className=" loginButton " onClick={handleLogin}>
                Login <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </div>
          </div>

          <div className="flex justify-between   px-5 py-3 forgotYourPassword">
            <Link
              to="/signup"
              className=" text-white font-bold hover:underline hover:text-[14px]   "
            >
              Signup ▶
            </Link>
            <Link
              to="/forgotpassword"
              className=" text-blue-900 hover:underline  "
            >
              Forgot Your Password ?
            </Link>
          </div>

          <div className="flex  justify-center loginPageBottomText my-1"></div>
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
}

export default Login;
