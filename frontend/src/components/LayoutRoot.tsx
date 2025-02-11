import React, {  HTMLAttributes, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLink from './atoms/NavbarLink';

interface LayoutRootProps {
    links : {path: string, name: string}[],
}

const LayoutRoot: React.FC<PropsWithChildren<LayoutRootProps & HTMLAttributes<HTMLDivElement>>> = ({ links,...props }) => {
    return (
        <div className="flex flex-col h-full gap-3" {...props}>
          <div className='-mt-2'>
            <ul className="flex gap-1">
              {links.map((item) => (
                <li key={item.path}>
                  <NavbarLink
                    end
                    className={({ isActive }) =>
                      "shadow-md " + (isActive ? "" : "bg-white")
                    }
                    to={item.path}
                  >
                    {item.name}
                  </NavbarLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-white p-4 rounded-box shadow-lg overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      );
}

export default LayoutRoot