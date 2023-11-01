import  { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import log from "../assets/log.png";
import Logo1 from "../components/Logo1";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useResetPasswordMutation } from "../slices/usersApiSlice";

export default function Reset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [passwordReset, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log("Reset Token:", resetToken)

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const userData = {
        password: password,
        confirmPassword: confirmPassword,
      };

      console.log("Sending user data:", userData);

      await passwordReset(userData, resetToken);

      console.log("Password reset successful");

      toast.success("Password reset successfully");

      navigate('/signup');
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen space-y-4">
      <img src={log} alt="" className="h-[100%] w-[30%]" />
      <div className="h-[70%] w-[70%] flex flex-col items-center justify-between ">
        <div className="w-[70%] ">
          <div className="flex items-center justify-between w-[100%] ">
            <Logo1 className="" />
            <p className="text-4xl font-bold">Reset Password</p>
          </div>
        </div>
        <div className="w-[70%] flex flex-col h-[60%] items-center justify-start space-y-4 ">
          <form onSubmit={handleResetPassword} className=" w-[100%] grid gap-3">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none border-2 border-slate-400 text-center rounded-xl h-12 "
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full outline-none border-2 border-slate-400 text-center rounded-xl h-12"
            />
            <button type="submit" className="w-full bg-red-500 h-12 text-white font-bold rounded-xl text-center flex items-center justify-center">
              Reset Password
            </button>
            {isLoading && <Loader/>}
          </form>

          <div className="w-full ">
            <Link to='/Signup' className="text-right h-8 underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}