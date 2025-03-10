import { FC } from "react";
import { NavLink, NavLinkProps, NavLinkRenderProps } from "react-router-dom";
import { tv, type VariantProps } from "tailwind-variants";

type VariantType = 'link' | 'ghost' | 'solid' | 'outline';

const buttonVariant = tv({
  base: "no-underline rounded-lg w-full justify-start btn",
  variants: {
    variant: {
      ghost: "btn-ghost",
      solid: "",
      outline: "btn-outline",
      link: "", // Add link variant but leave it empty as it won't be used
    },
    color: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    }
  },
  defaultVariants: {
    variant: "ghost",
    size: "sm",
    color: "primary"
  }
});

const linkVariant = tv({
  base: "rounded-lg w-full justify-start link link-hover",
  variants: {
    color: {
      primary: "link-primary",
      secondary: "link-secondary",
      accent: "link-accent",
      info: "link-info",
      success: "link-success",
      warning: "link-warning",
      error: "link-error",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }
  },
  defaultVariants: {
    size: "sm",
    color: "primary"
  }
});

const variantFactory = (variant: VariantType) => {
  if (variant === 'link') {
    return linkVariant;
  }
  return buttonVariant;
};

const getActiveStyle = (variant: VariantType) => {
  return variant === 'link' ? 'font-bold underline' : 'btn-active font-bold';
};

type ButtonVariants = VariantProps<typeof buttonVariant>;
type LinkVariants = VariantProps<typeof linkVariant>;
type NavLinkPropsWithoutColor = Omit<NavLinkProps, 'color'>;

interface NavbarLinkProps extends NavLinkPropsWithoutColor {
  variant?: VariantType;
  color?: ButtonVariants['color'] | LinkVariants['color'];
  size?: ButtonVariants['size'] | LinkVariants['size'];
}

const activeClass = (
  className: string |((props: NavLinkRenderProps)=> string | undefined) = "", 
  variant: NavbarLinkProps["variant"] = "ghost",
  color?: NavbarLinkProps["color"],
  size?: NavbarLinkProps["size"]
)=> (props: NavLinkRenderProps) =>{
  const clas = typeof className === "string" ? className : className(props);
  const variantStyle = variantFactory(variant!);
  const activeStyle = getActiveStyle(variant!);
  
  return `${clas} ${variantStyle({ variant, color, size })} ${props.isActive ? activeStyle : ""}`;
};

const NavbarLink: FC<NavbarLinkProps> = ({ 
  children, 
  className = "", 
  variant = "ghost", 
  color,
  size,
  ...props 
}) => {
  return <NavLink className={activeClass(className, variant, color, size)} {...props}>{children}</NavLink>;
};

export default NavbarLink;
