import React from "react";
import { Link, Route } from "react-router-dom";
export default function SidebarItem({ title, link, icon  }) {
  const MenuLink = ({ label, to, activeOnLyWhenExact, icon   }) => {
    return (
      <Route
        path={to}
        exact={activeOnLyWhenExact}
        children={({ match }) => {
          let active = match
            ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
            : "";
          return (
            <li className="rounded-lg mb-2 uppercase">
              <Link
                to={to}
                className={`${active} flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg`}
              >
                <span className="material-icons">{icon}</span>
                {label}
              </Link>
            </li>
          );
        }}
      ></Route>
    );
  };
  return (
    <MenuLink activeOnLyWhenExact={true} label={title} icon={icon} to={link}/>
  );
}
