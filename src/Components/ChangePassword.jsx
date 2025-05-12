import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/changePassword`,
        { password },
        { withCredentials: true }
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response.data === "ERROR : jwt expired") {
        dispatch(addUser(null));
        navigate("/login");
      }
      setError(true);
      setErrorMessage(err?.response?.data);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200 relative font-mont ">
        <div className="card w-120 bg-base-100 card-xs shadow-sm p-5  bg-img-default ">
          <div className="card-body ">
            <h2 className="text-center text-xl font-bold  text-white ">
              CHANGE PASSWORD
            </h2>
            <div className="flex items-baseline justify-between">
              <fieldset className="fieldset my-2 w-80">
                <legend className=" text-white">Password</legend>
                <input
                  className="input"
                  type="text"
                  value={password}
                  placeholder="Enter New password "
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>

              <button
                className="ButtonBgWhite mt-3 btn btn-lg"
                onClick={handleChangePassword}
              >
                <FontAwesomeIcon icon={faCheck} /> Change
              </button>
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
          <div className="toast toast-top toast-center z-50">
            <div className="changePasswordSuccessButton  p-3 rounded">
              <span>Password Changed Successfully</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
