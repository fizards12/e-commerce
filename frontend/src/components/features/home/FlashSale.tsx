import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import { IProduct } from '../../../schemas/product'
import ProductCard from '../../templates/Product/ProductCard'
import { useFetchProductsQuery } from '../../../stores/apis/products'

const FlashSale = () => {
  const { data } = useFetchProductsQuery({})
  console.log(data)
  const products: IProduct[] = data.products || []
  return (
    <Section className='flex flex-col gap-8'>
      <SectionHeader header="Today's" title="Flash Sales" />
      <SectionBody className='p-2'>
        <div className='overflow-x-auto'>
          <div className='flex gap-4 py-2'>
            {products.map((product: IProduct) => (<ProductCard key={product.id} product={product} />))}
          </div>
        </div>
      </SectionBody>
    </Section>
  )
}

export default FlashSale