import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import No_Connections from "../assets/No_Connections.png";

import { BASE_URL } from "../utils/constants";
import { addConnection, removeConnection } from "../utils/connectionsSlice";
import ConnectionShimmer from "./ConnectionShimmer";
import { addUser } from "../utils/userSlice";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentNodes,
  faUserPlus,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connections = useSelector((store) => store.Connections);

  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnections = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
      setLoading(false);
    } catch (err) {
      dispatch(addUser(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    handleConnections();
  }, []);

  const handleRemoveConnection = async (requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/removeRequest/${requestId}`,
        {},
        { withCredentials: true }
      );
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);

      console.log(res);
      dispatch(removeConnection(requestId));
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <>
      {loading && <ConnectionShimmer count={2} />}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div>
          <h1 className="font-bold text-center text-2xl my-4 font-mont default-color ">
            <FontAwesomeIcon icon={faCommentNodes} /> CONNECTIONS
          </h1>
          {connections &&
            connections.length > 0 &&
            connections.map(
              ({
                requestId,

                _id,
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl,
              }) => (
                <div key={_id}>
                  <div>
                    <ul className="list bg-base-200 rounded-box shadow-amber-50 m-auto w-180 my-4 font-mont bg-img-default">
                      <div className="flex justify-end my-2 mx-2 items-center"></div>
                      <li className="list-row my-3">
                        <div>
                          <img
                            className="size-18 rounded"
                            src={
                              photoUrl
                                ? photoUrl
                                : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"
                            }
                          />
                        </div>
                        <div className="align-middle">
                          <div className="flex justify-between">
                            <div>
                              <p className=" font-bold uppercase opacity-90  text-white">
                                {`${firstName} ${lastName}`}
                              </p>
                              <p className="my-1 font-semibold  opacity-60  text-sm text-white">
                                {age && gender && `${age} , ${gender}`}
                              </p>
                            </div>

                            <button
                              className="RemoveConnectionButton font-bold  "
                              onClick={() => handleRemoveConnection(requestId)}
                            >
                              <FontAwesomeIcon icon={faUserXmark} /> &nbsp;
                              Remove
                            </button>
                          </div>
                          <p className="my-2 opacity-70 text-white">{about}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )
            )}

          {connections && connections.length == 0 && (
            <>
              <div className="flex flex-row justify-center  items-center mt-30">
                <div>
                  <img src={No_Connections} width={250} />
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/" className="loginButton font-bold ">
                  <FontAwesomeIcon icon={faUserPlus} /> &nbsp; Make Connections
                </Link>
              </div>
            </>
          )}
        </div>
        {errorMessage && (
          <div className="toast toast-top toast-center">
            <div className="ConnectionRemovedToast">
              <span>Connection Removed!</span>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Connections;
