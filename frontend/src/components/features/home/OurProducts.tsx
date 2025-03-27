import React from 'react'
import { IProduct } from '../../../schemas/product'
import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import ProductCard from '../../templates/Product/ProductCard'
import { Link } from 'react-router-dom'

type Props = {
    products?: IProduct[]
}
const OurProducts: React.FC<Props> = ({ products }) => {
    return (
        <Section>
            <SectionHeader header='Our Products' title='Explore Our Products' />
            <SectionBody className='gap-8'>
                <div className='grid max-w-5xl md:grid-cols-4 sm:grid-cols-2 gap-4 mx-auto'>
                    {products?.map((product: IProduct) => (
                        <div key={product.id} className='col-span-1 row-span-1'>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-center'>
                    <Link to="/" className='btn md:btn-lg btn-primary w-full max-w-60'>View All Products</Link>
                </div>
            </SectionBody>
        </Section>
    )
}

export default OurProducts