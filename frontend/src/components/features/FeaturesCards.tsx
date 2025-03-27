import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import FeatureCard from '../atoms/FeatureCard';
const features = [
    {
        id: 1,
        Icon: FaShippingFast,
        title: 'FREE AND FAST DELIVERY',
        subTitle: 'Free delivery for all orders over $140',
    },
    {
        id: 2,
        Icon: FaShippingFast,
        title: '24/7 CUSTOMER SERVICE',
        subTitle: 'Friendly 24/7 customer support',
    },
    {
        id: 3,
        Icon: FaShippingFast,
        title: 'MONEY BACK GUARANTEE',
        subTitle: 'We reurn money within 30 days',
    }
]

const FeaturesCards = () => {
    return (
        <div className='flex gap-4 mx-auto max-w-5xl'>
            {
                features.map(feature => (
                    <FeatureCard key={feature.id} Icon={feature.Icon} title={feature.title} subTitle={feature.subTitle} />
                ))
            }
        </div>
    )
}

export default FeaturesCards