import React, { HTMLAttributes } from "react";

type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  header?: string;
  title?: string;
};
type Props = HeaderProps & {};

const Section: React.FC<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={className + " "} {...props}>
      {children}
    </div>
  );
};

export const SectionHeader: React.FC<HeaderProps> = ({ header, title,children,className = "",...props }) => {
  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <div className="flex gap-4 items-center font-semibold text-primary-container">
        <div className="w-5 h-10 rounded-sm bg-primary-container" />
        <div>{header}</div>
      </div>
      {title && <h2 className="text-primary">{title}</h2>}
      {children}
    </div>
  );
};
export const SectionBody: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};
export const SectionFooter: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  return <div>SectionFooter</div>;
};

export default Section;
