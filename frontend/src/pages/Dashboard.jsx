import { Outlet } from "react-router-dom";
import Dasheader from "../components/Dasheader";
import Menu from "./Menu";
export default function Dashboard() {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <Menu />
      <div>
        <Dasheader />
        <Outlet />
      </div>
    </div>
  );
}
