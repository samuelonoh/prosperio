import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import log from "../assets/log.png";
import Logo from "../components/Logo1";

import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

function Signup() {
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/signup');
    }
  }, [navigate, userInfo] )

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await register({ firstName, lastName, userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }))
        navigate('/signup')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }


  return (
    <div className="flex items-center justify-center w-creen h-screen">
      <img src={log} alt="" className="h-[100%] w-[30%]" />
      <div className="h-[90%] w-[70%] flex flex-col items-center justify-around">
        <div className=" w-[60%]">
          <div className="flex items-center justify-between w-[100%]">
        <Logo className=""/>
        <p className="text-3xl font-bold">Sign Up</p>
          </div>
        </div>

        <input
          type="text"
          name="Firstname" 
          placeholder="Firstname"
          className="w-[60%] h-[7%] outline-none border-2 border-slate-400  text-center rounded-xl"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          name="Lastname" 
          placeholder="Lastname"
          className="w-[60%] outline-none border-2 border-slate-400  text-center rounded-xl h-[7%]"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="Username" 
          placeholder="Username"
          className="w-[60%] outline-none border-2 border-slate-400  text-center rounded-xl h-[7%]"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="Email" 
          placeholder="Email"
          className="w-[60%] outline-none border-2 border-slate-400  text-center rounded-xl h-[7%]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password" 
          name="Password" 
          placeholder="Password"
          className="w-[60%] outline-none border-2 border-slate-400  text-center rounded-xl h-[7%]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="Confirm Password" 
          placeholder="Comfirm Password"
          className="w-[60%] outline-none border-2 border-slate-400  text-center rounded-xl h-[7%]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {isLoading && <Loader/> }
        
        <Link to='/Signup' className="w-[60%] bg-red-500 h-[7%] text-white flex justify-center items-center font-bold rounded-xl no-underline" onClick={submitHandler}>Sign Up</Link>
        
        <p className="text-xl font-bold">Already have an account? <Link to='/Signup' className="text-red-500 no-underline">Log In</Link></p>


      </div>
    </div>
  );
}

export default Signup;
