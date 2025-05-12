import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addFeed } from "../utils/feedSlice";
import { addUser } from "../utils/userSlice";
import FeedShimmer from "./FeedShimmer";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feed = useSelector((store) => store.Feed);

  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      const feedData = Array.isArray(res.data) ? res.data : [];
      dispatch(addFeed(feedData));
      setLoading(false);
    } catch (err) {
      dispatch(addUser(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return;

  return (
    <>
      {loading && <FeedShimmer />}

      <img src="src/assets/Flower.png" className="absolute bottom-0 right-0" />
      <img src="src/assets/Flower.png" className="absolute bottom-0 left-0" />

      {feed && feed.length > 0 && feed[0] && (
        <UserCard user={feed[0]} loginPageMainContainer />
      )}
      {feed && feed.length === 0 && (
        <div className="flex justify-center  items-center my-40">
          <img src="src/assets/No_Feed.png" width={330} />
        </div>
      )}
    </>
  );
};

export default Feed;
