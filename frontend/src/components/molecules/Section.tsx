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

export const SectionHeader: React.FC<HeaderProps> = ({ header, title }) => {
  return (
    <div>
      <div className="flex mb-2 gap-4 items-center font-semibold text-primary-container">
        <div className="w-5 h-10 rounded-sm bg-primary-container" />
        <div>{header}</div>
      </div>
      <h3 className="text-primary">{title}</h3>
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
