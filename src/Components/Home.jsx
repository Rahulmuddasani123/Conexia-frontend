import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-row justify-between p-3">
      <h1 className="text-3xl font-bold text-center">Conexia</h1>
      <div>
        <Link to="login " className="my-2 mx-2 btn btn-primary btn-sm">
          Login
        </Link>
        <Link to="signup" className="my-2 mx-2 btn btn-primary btn-sm">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
