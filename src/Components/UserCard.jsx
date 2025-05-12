import axios from "axios";
import { useEffect, useState } from "react";

import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [animate, setAnimate] = useState(false);

  if (!user || Object.keys(user).length === 0) {
    return null;
  }

  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  useEffect(() => {
    setAnimate(true);
  }, [user]);

  const handleFeedButtons = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      setAnimate(true);

      if (status == "interested") {
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 1000);
      }
      if (status == "ignored") {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 1000);
      }
      dispatch(removeFeed(userId));

      console.log("Request sent to:", res.data.data?.toUserId);
    } catch (err) {
      console.error("Failed to send request:", err);
    }
  };

  return (
    <>
      <motion.div
        key={_id} // re-animates on user change
        initial={{ scale: 0.7}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center">
          <div className="card bg-base-300 w-90 shadow-lg my-18 flex font-mont bg-default-color bg-img-default">
            <figure>
              <img
                className="rounded-full h-50 w-50 m-3"
                src={
                  photoUrl
                    ? photoUrl
                    : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                }
                alt="Profile"
                width={200}
              />
            </figure>
            
            <div className="card-body  pb-0">
              <p className=" font-bold uppercase opacity-90  text-white">
                {`${firstName} ${lastName}`}
              </p>
              <p className=" font-semibold  opacity-60  text-sm text-white">
                {age && gender && `${age} , ${gender}`}
              </p>
              <p className="m-0 p-0 opacity-70 text-white">{about}</p>
             
              <div className="card-actions justify-center my-7 font-mont">
                
                <button
                  className="FeedIgnoreButton mx-4"
                  onClick={() => handleFeedButtons("ignored", _id)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} /> &nbsp; Ignore
                </button>
                <button
                  className="FeedConnectButton"
                  onClick={() => handleFeedButtons("interested", _id)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} /> &nbsp; Connect
                </button>
              </div>
              {successMessage && (
                <div className="toast toast-top toast-center font-mont">
                  <div className="ConnectionSentToast">
                    <span>Connection Sent!</span>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="toast toast-top toast-center font-mont">
                  <div className="UserIgnoredToast">
                    <span> User Ignored!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserCard;
