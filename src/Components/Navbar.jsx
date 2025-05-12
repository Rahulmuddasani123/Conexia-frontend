import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faCommentNodes,
  faHouse,
  faPenToSquare,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.User);
  const requests = useSelector((store) => store.Requests);

  const [updateProfile, setUpdateProfile] = useState(false);

  const { age, gender, about, photoUrl } = user || {};

  const logOutUser = async () => {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    dispatch(addUser(null));
    navigate("/login");
  };

  useEffect(() => {
    if (user && (!age || !gender || !about || !photoUrl)) {
      setUpdateProfile(true);
      setTimeout(() => {
        setUpdateProfile(false);
      }, 4000);
    }
  }, []);

  return (
    <div
      className={
        user
          ? "navbar bg-transparent shadow-sm  font-mont bg-img-default sticky top-0 z-1 h-12"
          : "sss"
      }
    >
      <div className="flex-1">
        <Link to="/" className="text-xl">
          <img src="src/assets/Conexia_logo.png" width={60} />
        </Link>
      </div>
      {user && (
        <div className="flex-none">
          <div className="dropdown dropdown-end mr-6 flex ">
            <p className="mr-5  font-mont font-bold text-white my-auto text-xs ">
              Welcome {user.firstName}
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar profileAvatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={
                    user.photoUrl ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow font-bold  text-white bg-default-color"
            >
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon={faHouse} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  {" "}
                  <FontAwesomeIcon icon={faAddressCard} />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">
                  <FontAwesomeIcon icon={faCommentNodes} />
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests">
                  <FontAwesomeIcon icon={faBell} />
                  Requests
                  <span>
                    {requests && requests.length > 0 ? requests.length : ""}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/changepassword">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Change Password
                </Link>
              </li>
              <li>
                <a onClick={logOutUser}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {updateProfile && (
        <div className="toast toast-top toast-center">
          <div className="success-Containe">
            <span className="text-white font-mont font-bold text-[14px]">
              Please Update Your Profile !
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
