import React from 'react'
import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import { useFetchDocList } from '../../../Hooks/useFetchDoc'
import { IProduct } from '../../../schemas/product'
import ProductCard from '../../templates/Product/ProductCard'

const FlashSale = () => {
  const [products, error] = useFetchDocList('product')
  if (error) throw error
  return (
    <Section className='flex flex-col gap-8'>
      <SectionHeader header="Today's" title="Flash Sales" />
      <SectionBody className='p-2'>
        <div className='overflow-auto'>
          <div className='flex gap-4 py-2'>
            {products && Object.values(products).map((product: IProduct) => (<ProductCard key={product.id} product={product} />))}
          </div>
        </div>
      </SectionBody>
    </Section>
  )
}

export default FlashSale