import { Link } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";


export default function Dasheader() {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/signup');
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex items-center justify-between w-[80vw] h-[10vh] bg-white rounded-md shadow-lg px-5 text-black">
      <p className="font-bold text-xl">
        Hello, {userInfo ? <Link to='/dashboard/profile' className="text-red-500 no-underline ">{userInfo.userName}</Link> : "Guest"}
      </p>
      <Link to='/signup' className="bg-red-500 hover:bg-red-600 text-white font-semibold text-center p-2 no-underline rounded-[50px] w-[100px] transition ease-in-out delay-150 hover:-translate-1 hover:scale-110" onClick={logoutHandler}>
        Log Out
      </Link>
    </div>
  );
}