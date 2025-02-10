import React, { FC } from 'react'

interface Props {
    className?: string;
    cardClassName?: string
}

const Wrapper : FC<React.PropsWithChildren<Props>> = ({children,className = "",cardClassName = "", ...props}) => {
  return (
    <div className={'p-3 ' + className} {...props}>
        <div className={cardClassName +' bg-white overflow-hidden h-full shadow-md rounded-box p-4'}>
                {children}
        </div>
    </div>
  )
}

export default Wrapper