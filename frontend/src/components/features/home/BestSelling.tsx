import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import { IProduct } from '../../../schemas/product'
import ProductCard from '../../templates/Product/ProductCard'
import { ReactNode } from 'react'
import SkeletonProduct from '../../templates/Product/SkeletonProduct'
import { Link } from 'react-router-dom'

type Props = {
    products?: IProduct[] | undefined
}

const BestSelling: React.FC<Props> = ({ products }) => {
    let List: ReactNode = []
    if (products?.length) {
        List = products.map((product: IProduct) => (<ProductCard key={product.id} product={product} />));
    } else {
        List = [
            <SkeletonProduct key={1} />,
            <SkeletonProduct key={2} />,
            <SkeletonProduct key={3} />,
            <SkeletonProduct key={4} />
        ]
    }
    return (
        <Section>
            <SectionHeader header="This Month">
                <div className='flex gap-4 justify-between flex-wrap'>
                    <h2 className='text-primary'>Best Selling Products</h2>
                    <Link to="/" className='btn btn-primary w-full max-w-32'>View All</Link>
                </div>
            </SectionHeader>
            <SectionBody className='gap-20'>
                <div className='overflow-x-auto mx-auto w-full'>
                    <div className='flex gap-4 py-2'>
                        {List}
                    </div>
                </div>
            </SectionBody>
        </Section>
    )
}

export default BestSelling