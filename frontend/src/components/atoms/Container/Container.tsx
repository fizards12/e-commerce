import React, { FC } from 'react'

interface Props {
    className?: string;
    cardClassName?: string
}

const Container : FC<React.PropsWithChildren<Props>> = ({children,className = "",cardClassName = "", ...props}) => {
  return (
    <div className={'p-1 ' + className} {...props}>
        <div className={cardClassName +' bg-white overflow-hidden h-full shadow-md rounded-box'}>
                {children}
        </div>
    </div>
  )
}

export default Container