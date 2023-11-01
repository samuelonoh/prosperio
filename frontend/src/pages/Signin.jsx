import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import log from "../assets/log.png";
import Logo1 from "../components/Logo1";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";

function Signin() {
  const [userNameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard/board');
    }
  }, [navigate, userInfo] )

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ userNameOrEmail, password }).unwrap();
      dispatch(setCredentials({ ...res }))
      navigate('/dashboard/board')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }



  return (
    <div className="flex items-center justify-center w-creen h-screen">
      <img src={log} alt="" className="h-[100%] w-[30%]" />
      <div className="h-[70%] w-[70%] flex flex-col items-center justify-between">
        <div className=" w-[60%]">
          <div className="flex items-center justify-between w-[100%]">
            <Logo1 className="" />
            <p className="text-3xl font-bold">Log In</p>
          </div>
        </div>
        <div className="w-[60%] flex flex-col h-[70%] items-center justify-start gap-7">
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Username / Email"
            className="w-full outline-none border-2 border-slate-400  text-center rounded-xl h-[20%]"
            value={userNameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <input
            type="password"
            name="Password"
            placeholder="Password "
            className="w-full outline-none border-2 border-slate-400  text-center rounded-xl h-[20%]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isLoading && <Loader/> }
          
          <Link onClick={submitHandler} to='/dashboard/board' className="w-full bg-red-500 h-[20%] text-white font-bold rounded-xl text-center flex items-center justify-center no-underline ">Log In</Link>
          <div className="w-full ">
            <Link to="/login/forgottenPassword" className=" text-right underline">
              Forgot Password
            </Link>
          </div>
          
        <p className="text-xl font-bold">Dont have an account? <Link to='/login' className="text-red-500 no-underline ">SignUp</Link></p>
          </div>
      </div>
      
    </div>
  );
}

export default Signin;
