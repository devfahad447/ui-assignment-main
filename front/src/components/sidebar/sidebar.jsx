import {
  HomeIcon,
  CogIcon,
  EllipsisVerticalIcon,
  Bars3Icon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

// This sidebar component is for both mobile and desktop
function Sidebar({ children, expanded, setExpanded }) {
  return (
    <div
      className={`sm:relative ${
        expanded ? "absolute" : "relative"
      } bg-[#001F3F] h-[100vh]`}
    >
      <div
        className={`fixed inset-0 -z-10 block bg-gray-400  ${
          expanded ? "block" : "hidden"
        }`}
      />
      <aside
        className={`box-border h-[100vh] sm:h-screen bg-[#001F3F] sticky top-0 z-[2]`}
      >
        <nav className="flex h-full flex-col border-r border-gray-600 shadow-sm">
          <div
            className={`flex items-center ${
              expanded ? "justify-between" : "justify-center"
            } sm:${expanded ? "justify-between" : "justify-center"} p-4 pb-2`}
          >
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <div className={`${expanded ? "" : " sm:block h-[37px] flex items-center"}`}>
              <button
                className="w-full"
                onClick={() => setExpanded((curr) => !curr)}
              >
                <Bars3Icon color="white" className="h-6 w-6" />
              </button>
            </div>
          </div>
          <ul className="flex-1 px-3">{children}</ul>
          <div className="flex border-t border-gray-500 border-g p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
              alt=""
              className="h-10 w-10 rounded-md"
            />
            <div
              className={`
                flex items-center justify-between
                overflow-hidden ${expanded ? "ml-3 w-52" : "w-0"}
            `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-white">Mark Ruffalo</h4>
                <span className="text-xs text-gray-200">mark@gmail.com</span>
              </div>
              <EllipsisVerticalIcon color="white" className="h-6 w-6" />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(false);
  const navBarItems = [
    {
      icon: <HomeIcon color="white" />,
      text: "Home",
      path: "/",
    },
    {
      icon: <PlusIcon color="white" />,
      text: "Create Drink",
      path: "/drink",
    },
  ];

  // Desktop Sidebar
  return (
    <Sidebar expanded={expanded} setExpanded={setExpanded}>
      {navBarItems.map((item, index) => (
        <SidebarItem key={index} expanded={expanded} {...item} />
      ))}
    </Sidebar>
  );
}
