import React, { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'


const CategoryCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    const className = 'size-30 rounded-full text-primary border border-primary transition-all hover:border-primary-container hover:bg-primary-container hover:text-white hover:shadow-md flex justify-center items-center gap-2'
    return (
        <Link to="/" className={className}>{children}</Link>
    )
}

export default CategoryCard