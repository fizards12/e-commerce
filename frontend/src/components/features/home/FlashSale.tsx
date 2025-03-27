import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import { IProduct } from '../../../schemas/product'
import ProductCard from '../../templates/Product/ProductCard'
import { ReactNode } from 'react'
import SkeletonProduct from '../../templates/Product/SkeletonProduct'
import { Link } from 'react-router-dom'

type Props = {
  products?: IProduct[] | undefined
}

const FlashSale : React.FC<Props> = ({products}) => {
  let List : ReactNode = []
  if(products?.length) {
    List = products.map((product: IProduct) => (<ProductCard key={product.id} product={product} />));
  }else{
    List = [
      <SkeletonProduct key={1}/>,
      <SkeletonProduct key={2}/>,
      <SkeletonProduct key={3}/>,
      <SkeletonProduct key={4}/>
    ]
  }
  return (
    <Section>
      <SectionHeader header="Today's" title="Flash Sales" />
      <SectionBody className='gap-20'>
        <div className='overflow-x-auto mx-auto w-full'>
          <div className='flex gap-4 py-2'>
            {List}            
          </div>
        </div>
        <div className='flex justify-center'>
          <Link to="/" className='btn btn-lg btn-primary w-full max-w-60'>View All Products</Link>
        </div>
      </SectionBody>
    </Section>
  )
}

export default FlashSale