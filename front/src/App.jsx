import { Outlet } from "react-router-dom";
import MakeSidebar from "./components/sidebar/sidebar";

export default function App() {
  return (
    <div>
      <div className="flex">
        <MakeSidebar />
        <div className="w-full p-2 sm:p-4 bg-[#001F3F]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
