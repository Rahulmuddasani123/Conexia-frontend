import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import {Link, useNavigate} from "react-router-dom"

const ForgotPassword = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error,setError]=useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage,setErrorMessage]=useState("")


  const handleForgotPassword = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/forgotPassword`,
        { email, secretKey, newPassword },
        { withCredentials: true }
      );
      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false);
        navigate('/login');
      },2000)
    } catch (err) {
      setError(true)
      setErrorMessage(err.response.data);
      setTimeout(() => {
        setError(false);

      }, 2000);
      
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200 loginPageMainContainer relative">
        <div className="card w-96 backdrop-blur-md bg-white/15 card-md shadow-md  flex flex-column justify-center align-middle  ">
          <div className="card-body m-auto">
            <h2 className="text-center text-xl font-bold text-white ">
              Forgot Password ?
            </h2>
            <div className="">
              <fieldset className="fieldset my-2 w-75">
                <legend className=" text-white">
                  Email Id <span className="text-red-500">*</span>
                </legend>
                <input
                  type="text"
                  className="input-box bg-red-500"
                  value={email}
                  placeholder="Enter Email Id"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-2">
                <legend className=" text-white">
                  Secret Key <span className="text-red-500">*</span>
                </legend>
                <input
                  type="text"
                  className="input-box bg-red-500"
                  value={secretKey}
                  placeholder="Enter Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className=" text-white">
                  New Password <span className="text-red-500">*</span>
                </legend>
                <input
                  type="text"
                  className="input-box bg-red-500"
                  value={newPassword}
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </fieldset>
              <div className="text-center">
                <button
                  className="loginButton my-2 text-[12px]"
                  onClick={handleForgotPassword}
                >
                  Set New Password
                </button>
              </div>
              <div className="">
                <Link
                  to="/login"
                  className=" text-white font-bold text-[13px] hover:underline hover:text-[14px] "
                >
                  ◀Login
                </Link>
              </div>
            </div>
          </div>
          {error && (
            <div className="toast toast-top toast-center z-200 transition-opacity duration-100">
              <div className="error-Container">
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="toast toast-top toast-center">
              <div className="success-Container">
                <span>New Password is set Successfully</span>
              </div>
            </div>
          )}
        </div>
        <img
          src="src/assets/Conexia_logo.png"
          className="absolute bottom-15 right-20"
          width={240}
        />
      </div>
    </>
  );
};

export default ForgotPassword;
