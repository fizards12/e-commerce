import React from 'react'
import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import { useFetchDocList } from '../../../Hooks/useFetchDoc'
import { IProduct } from '../../../schemas/product'
import ProductCard from '../../templates/Product/ProductCard'

const FlashSale = () => {
  const [products, error] = useFetchDocList('product')
  if(error) throw error
  return (
    <Section className='p-4 flex flex-col gap-8'>
        <SectionHeader header="Today's" title="Flash Sales" />
        <SectionBody className='flex flex-wrap gap-4'>
            {products && Object.values(products).map((product: IProduct) => (<ProductCard key={product.id} product={product}/>))}
        </SectionBody>
    </Section>
  )
}

export default FlashSale