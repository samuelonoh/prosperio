import { useState } from "react";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import log from "../assets/log.png";
import Logo1 from "../components/Logo1";
import { toast } from "react-toastify";


export default function Forgetten() {
  const [email, setEmail] = useState('')

  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const handleForgotPassword = async () => {
     try {
       const response = await forgotPassword({ email })
       
       if (response.data) {
         const resetToken = response.data.resetToken
         toast.success('Password reset link sent')

         navigate(`/resetPassword/${resetToken}`)
       }
     } catch (error) {
       toast.error('Failed to send password reset link')
      
     }
   }
  
  return (
    <div className="flex items-center justify-center w-creen h-screen">
      <img src={log} alt="" className="h-[100%] w-[30%]" />
      <div className="h-[70%] w-[70%] flex flex-col items-center justify-between">
        <div className=" w-[60%]">
          <div className="flex items-center justify-between w-[100%]">
            <Logo1 className="" />
            <p className="text-3xl font-bold">Forgotten Password</p>
          </div>
        </div>
        <div className="w-[60%] flex flex-col h-[60%] items-center justify-start gap-7">
          <input
            type="text"
            name=""
            id=""
            placeholder="Email Address"
            className="w-full outline-none border-2 border-slate-400  text-center rounded-xl h-[20%]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link
            to="#"
            className="w-full bg-red-500 h-[20%] text-white font-bold rounded-xl text-center flex items-center justify-center no-underline"
          >
            <button onClick={handleForgotPassword} disabled={isLoading}>
              Get Email Reset Link
            </button>
          </Link>

          <div className="w-full ">
            <Link to="/Signup" className=" text-right h-[15%] underline">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}