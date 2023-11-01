import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from 'react-toastify';
import photo  from '../assets/nymous 2.jfif'



export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.auth);
  const { mutate: profileinfo } = useProfileMutation()
  

  const initialState = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    userName: userInfo?.userName,
    email: userInfo?.email,
    phoneNumber: userInfo?.phoneNumber,
    bio: userInfo?.bio,
    profileImage: userInfo?.photo
  }

  const [profile] = useState(initialState)
  
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    
    if (!userInfo) {
      navigate('/dashboard/profile');
    }
  }, [navigate, userInfo]);

 

 

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      // Save Profile
      const formData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        bio: profile.bio,
        email: profile.email,
        userName: profile.userName,
        profileImage: profile.profileImage
      };

      const updatedProfile = await profileinfo(formData);

      dispatch(setCredentials(updatedProfile));
      toast.success('Profile info fetched successfully')
      navigate("/dashboard/profile");
    } catch (error) {
      console.error('Error Fetching profile info:', error)
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col justify-center w-[80vw] h-[85vh]" onSubmit={submitHandler}>
      <div className="flex items-start justify-center h-[100%] w-[90%] gap-10 mt-5">
        <div className="bg-white rounded-lg shadow-lg w-[45%] h-[100%] flex flex-col items-center justify-center ">
          <div className="h-[100%] w-[95%] flex flex-col gap-2 ">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300">
              Profile Details
            </h2>

            {isLoading ? (
              <Loader />
            ) : (
              <>
                <p className="font-bold  border-gray-300 mb-0 mt-1">Name : </p>
                <p className="text-gray-500 font-semibold mb-1 mt-0">
                    {`${profile.firstName} ${profile.lastName}`}
                </p>

                <p className="font-bold  border-gray-300 mb-0 mt-1">Username : </p>
.                <p className="text-gray-500 font-semibold mb-1 mt-0">
                  {profile.userName}
                </p>

                <p className="font-bold  border-gray-300 mb-0 mt-1">Email : </p>
                <p className="text-gray-500 font-semibold mb-1 mt-0">
                  {profile.email}
                </p>

                <p className="font-bold  border-gray-300 mb-0 mt-1">Phone number : </p>
                <p className="text-gray-500 font-semibold mb-1 mt-0">
                  {profile.phoneNumber}
                </p>

                <b className="mb-0 mt-1">Description:</b>
                <p className="text-gray-500 font-semibold mb-1 mt-0">
                  {profile.bio || "No description available"}
                </p>
                <>
                  <div>
                    <Link to="/dashboard/update">
                      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-center p-1 rounded mt-2 no-underline">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
        <div className="w-[45%] h-[100%] flex flex-col gap-7">
          <p className="text-xl">Profile Image:</p>
          <img src={profile.profileImage} alt="Image of anonymous" />
        </div>
      </div>
    </div>
  );
}