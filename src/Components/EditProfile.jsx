import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = async () => {
    try {
      setError(false); // Reset error state before attempting save
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setSuccess(true);
      setSuccessMsg("Profile Updated");
      setTimeout(() => {
        document.getElementById("my_modal_3").close();
      }, 1000);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(true);
      const error = err?.response?.data?.message;
      setErrorMsg(error || "Something went wrong.");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div className="card w-105 bg-default-color card-md  shadow-md   m-auto font-mont ">
      <div className="card-body bg-img-default rounded-xl">
        <h2 className="card-title justify-center text-white mb-3">
          <FontAwesomeIcon icon={faPenToSquare} /> EDIT PROFILE
        </h2>
        <div className="flex">
          <fieldset className="fieldset mx-3">
            <legend className="fieldset-legend text-white">First Name</legend>
            <input
              type="text"
              className="input-box "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset ">
            <legend className="fieldset-legend text-white">Last Name</legend>
            <input
              type="text"
              className="input-box"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
        </div>

        <div className="flex ">
          <fieldset className="fieldset mx-2 ">
            <legend className="fieldset-legend text-white">Age</legend>
            <input
              type="text"
              className="input-box"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset mx-2 w-57">
            <legend className="fieldset-legend text-white">Gender</legend>
            <select
              className="input-box"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </fieldset>
        </div>

        <fieldset className="fieldset mx-2 ">
          <legend className="fieldset-legend text-white">About</legend>
          <textarea
            className="input-box"
            rows={2}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write something about yourself..."
          ></textarea>
        </fieldset>

        <fieldset className="fieldset mx-2">
          <legend className="fieldset-legend text-white">Photo Url</legend>
          <input
            type="text"
            className="input-box"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Enter your Photo Url"
          />
        </fieldset>

        <div className="justify-center card-actions ">
          <button className=" EditProfileButton mt-3" onClick={handleSave}>
            <FontAwesomeIcon icon={faFloppyDisk} /> Save
          </button>
        </div>
      </div>
      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
      {success && (
        <div className="toast toast-top toast-center mt-4">
          <div className="EditSuccessToast">
            <span>{successMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
