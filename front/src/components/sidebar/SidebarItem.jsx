// This component is used to render the sub-menu items when hovered

import { useLocation, useNavigate, useRoutes } from "react-router-dom";

export default function SidebarItem({
  icon,
  active = false,
  path,
  text,
  expanded = false,
  subMenu = null,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <li>
        <button
          className={`
         group relative my-1 flex ${expanded ? "w-full" : "w-10"} cursor-pointer
         items-center rounded-md justify-center
         py-2 font-medium
         h-10 
         ${
           location.pathname === path
             ? "text-primary-500 bg-indigo-600"
             : "text-gray-600 hover:bg-indigo-300"
         }
          
     `}
          onClick={() => {
            navigate(path);
          }}
        >
          <span className="h-6 w-6">{icon}</span>

          <span
            className={`overflow-hidden text-white text-start ${
              expanded ? "ml-3 w-44" : "w-0"
            }`}
          >
            {text}
          </span>
        </button>
      </li>
    </>
  );
}
