import React from 'react'
import { Colors, featureCard } from '../../presets/feature-card'
import { IconType } from 'react-icons/lib'


type Props = {
    Icon: IconType,
    title: string,
    subTitle?: string,
    color?: Colors
}




const FeatureCard: React.FC<Props> = ({ Icon, title, subTitle, color = "primary" }) => {
    const classes = featureCard.variants.color[color]
    return (
        <div className={'flex flex-col gap-4 items-center p-2'}>
            <div className={classes.subContainer + ' p-3 rounded-full'}>
                <div className={classes.container + ' p-3 rounded-full'}>
                    {<Icon size={30} className='text-white' />}
                </div>
            </div>
            <div className={classes.text + ' text-center'}>
                <h4 className='uppercase !font-bold'>{title}</h4>
                <h5>{subTitle}</h5>
            </div>
        </div>
    )
}

export default FeatureCard