import { useDispatch, useSelector } from "react-redux";

import EditProfile from "./EditProfile";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUserPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      dispatch(addUser(null));
      navigate("/login");
      if (err.status) console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  if (!user) return;
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    user && (
      <>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
                type="button"
              >
                ✕
              </button>
              <EditProfile user={user} />
            </div>
          </dialog>
          <div className="flex justify-center items-center font-mont">
            <div className=""></div>
            <div>
              <ul className="list bg-base-200 rounded-box shadow-lg my-20 w-200  p-3 bg-img-default">
                <div className="flex justify-between items-center ">
                  <li className="px-4 py-2 text-lg  text-white font-bold">
                    <FontAwesomeIcon icon={faAddressCard} /> PROFILE
                  </li>
                  <li>
                    <button
                      className="EditProfileButton"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      <FontAwesomeIcon icon={faUserPen} /> Edit
                    </button>
                  </li>
                </div>

                <li className="list-row">
                  <div>
                    <img
                      className="size-35 rounded-box shadow-xl"
                      src={
                        photoUrl ||
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                      }
                    />
                  </div>
                  <div className="align-middle">
                    <p className=" font-bold uppercase opacity-90 text-white">
                      {`${firstName} ${lastName}`}
                    </p>
                    <p className="my-1 font-semibold  opacity-60  text-sm text-white">
                      {age && gender && `${age} , ${gender}`}
                    </p>
                    <p className="my-2 opacity-70 text-white">{about}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </>
    )
  );
};

export default Profile;
