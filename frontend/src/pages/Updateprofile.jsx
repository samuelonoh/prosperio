import { useDispatch, useSelector } from "react-redux";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

function Updateprofile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected file");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setUserName(userInfo.userName);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phoneNumber);
    setBio(userInfo.bio);
    setProfileImage(userInfo.photo);
  }, [
    userInfo.firstName,
    userInfo.lastName,
    userInfo.userName,
    userInfo.email,
    userInfo.phoneNumber,
    userInfo.bio,
    userInfo.photo,
  ]);

  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  

  const submitHandler = async (e) => {
  e.preventDefault();
  try {
    // Handle Image upload
    let imageURL;

    if (
      fileName &&
      (fileName.type === "image/jpeg" ||
        fileName.type === "image/jpg" ||
        fileName.type === "image/png")
    ) {
      const image = new FormData();
      image.append("file", fileName);
      image.append("cloud_name", "ddc5ebbcn");
      image.append("upload_preset", "el7id0ah");

      // First save image to cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddc5ebbcn/image/uploads",
        {
          method: "post",
          body: image
        }
      );
      const imgData = await response.json();
      imageURL = imgData.url.toString();
    }
    
    
    
    const res = await updateProfile({
      _id: userInfo._id,
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      bio,
      photo: profileImage // Add profileImage data here
    }).unwrap();
    console.log(res);
    dispatch(setCredentials(res));
    navigate("/dashboard/profile");
    toast.success("Profile Updated Successfully");
  } catch (err) {
    toast.error(err?.data?.message || err.error);
  }
};

  return (
    <div className="flex flex-col items-center justify-center w-[80vw] h-[85vh] mt-3">
      <form onSubmit={submitHandler} className="flex items-start justify-center w-[100%] h-full gap-10 " >
        
        <div className="bg-white rounded-lg shadow-lg w-[40%] h-[92%]">
          <div className="w-[98%] flex flex-col items-start justify-between gap-1">
            <h2 className="text-2xl font-bold">Update Profile Details</h2>
            {isLoading && <Loader/>}
            <div>
              <label htmlFor="firstName" className="font-bold pl-2">
                Firstname:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="w-full border border-gray-400 p-2 ml-2 rounded-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="lastName" className="font-bold pl-2">
                Lastname:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="w-full border border-gray-400 p-2 ml-2 rounded-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="userName" className="font-bold pl-2">
                Username:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="UserName"
                className="w-full border border-gray-400 p-2 ml-2 rounded-lg"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="email" className="font-bold pl-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                className="w-full border border-gray-400 p-2 ml-2 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="phoneNumber" className="font-bold pl-2">
                Phone number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="PhoneNumber"
                className="w-full border border-gray-400 p-2 ml-2 rounded-lg"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="message" className="font-bold pl-2">
                Message
              </label>
              <textarea
                name="bio"
                rows={3}
                placeholder="message"
                className="border border-gray-400 p-2 ml-2 rounded-lg w-full"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold text-center p-1 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="w-[45%] flex flex-col justify-center gap-5">
          <b>
            {" "}
            Profile Image:{" "}
            <span className="text-neutral-500">Jpg, Png, Jpeg</span>
          </b>
          <div
            className="flex flex-col items-center justify-center h-[300px] w-[500px] cursor-pointer rounded-xl bg-white shadow-lg"
          >
            <input
              type="file"
              accept="image/*"
              className="input-field"
              onChange={handleImageUpload}
              
            />
            {profileImage ? (
              <img src={profileImage} width={150} height={180} alt={fileName} />
            ) : (
              <div>
                <MdCloudUpload color="#1475cf" size={60} />
                <p>Browse Files to upload</p>
              </div>
            )}
          </div>
          <section className="flex items-center justify-between w-full p-[15px] rounded-3xl bg-white shadow-lg">
            <AiFillFileImage color="#1475cf" />
            <span className="flex items-center">
              {fileName} -{" "}
              <MdDelete
                onClick={() => {
                  setFileName("No selected File");
                  setProfileImage(null);
                }}
              />
            </span>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Updateprofile;