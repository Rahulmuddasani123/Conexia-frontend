import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import No_Requests from '../assets/No_Requests.png'

import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestsSlice";
import { addUser } from "../utils/userSlice";
import RequestsShimmer from "./RequestsShimmer";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Requests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((store) => store.Requests);
  const user = useSelector((store) => store.User);

  const [loading, setLoading] = useState(true);

  const handleRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      dispatch(addUser(null));
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRequests();
  }, [user]);

  if (loading) return <RequestsShimmer />;

  return (
    <>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <h1 className="font-bold text-center text-2xl my-4 font-mont default-color">
          <FontAwesomeIcon icon={faBell} /> REQUESTS
          {requests && requests.length > 0 && (
            <span className="badge badge-success rounded-full">
              {requests.length}
            </span>
          )}
        </h1>
        {requests && requests.length > 0 ? (
          requests.map(
            ({
              requestId,
              fromUserId: {
                _id,
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl,
              },
            }) => (
              <div
                className="card card-side bg-base-300 shadow-sm w-170  flex justify-center m-auto align-middle bg-img-default p-3 my-3 "
                key={_id}
              >
                <div>
                  <figure>
                    <img
                      src={
                        photoUrl
                          ? photoUrl
                          : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"
                      }
                      alt={`${firstName} ${lastName}`}
                      className="w-32 h-32 rounded-xl items-center m-2"
                    />
                  </figure>
                </div>
                <div className="card-body p-0 m-2">
                  <div className="flex justify-between ">
                    <div>
                      <p className=" font-bold uppercase opacity-90  text-white">
                        {`${firstName} ${lastName}`}
                      </p>
                      <p className="my-1 font-semibold  opacity-60  text-sm text-white">
                        {age && gender && `${age} , ${gender}`}
                      </p>
                      <p className="my-2 opacity-70 text-white">{about}</p>
                    </div>
                  </div>

                  <div className="card-actions justify-end font-mont">
                    <button
                      className="RejectRequestButton"
                      onClick={() => handleStatus("rejected", requestId)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                      &nbsp;Reject
                    </button>
                    <button
                      className="AcceptRequestButton"
                      onClick={() => handleStatus("accepted", requestId)}
                    >
                      <FontAwesomeIcon icon={faCheck} /> &nbsp; Accept
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="flex justify-center  items-center my-30">
            <img src={No_Requests} width={230} />
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Requests;
