import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to='/login' className='no-underline text-white'>
    <div className="flex flex-col items-center justify-center h-[10vh]">
        <div className="border-2 border-white w-[40px] h-[40px] rounded-full flex items-center justify-center hover:text-red-500 hover:bg-white  text-center transition">
        <div className="text-white text-[25px] font-normal hover:text-red-500 transition">P</div>
    </div>
    <p className=" hover:text-slate-200 text-[30px] font-semibold ">Prosperio</p>
    </div>
    </Link>
  )
}

export default Logo