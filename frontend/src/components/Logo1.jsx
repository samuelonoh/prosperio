
import { Link } from 'react-router-dom'

function Logo1() {
  return (
    <Link to='/login' className='no-underline'>
    <div className="flex flex-col items-center justify-center h-[10vh]">
        <div className="border-2 border-red-500 w-[40px] h-[40px] rounded-full flex items-center justify-center hover:text-white hover:bg-red-500  text-center transition">
        <div className="text-red-500 text-[25px] font-normal hover:text-white transition">P</div>
    </div>
    <p className="text-black text-[25px] font-semibold ">Prosperio</p>
    </div>
    </Link>
  )
}

export default Logo1