import { FC } from "react";
import { NavLink, NavLinkProps, NavLinkRenderProps } from "react-router-dom";
const activeClass = (className: string |((props: NavLinkRenderProps)=> string | undefined)  = "")=> (props: NavLinkRenderProps) =>{
  const clas = typeof className === "string" ? className : className(props);
  return clas + " btn btn-ghost rounded-lg btn-sm w-full justify-start " + (props.isActive ? "btn-active font-bold" : "")
};
const NavbarLink: FC<NavLinkProps> = ({ children,className = "", ...props }) => {
  return <NavLink className={activeClass(className)} {...props}>{children}</NavLink>;
};

export default NavbarLink;
