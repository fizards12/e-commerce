import React, { ReactNode } from 'react'
import Section, { SectionBody, SectionHeader } from '../../molecules/Section'
import { Link } from 'react-router-dom'
import { useFetchDocList } from '../../../Hooks/useFetchDoc'
import { ICategory } from '../../../schemas/category'
import CategoryCard from '../../templates/Category/CategoryCard'

const Categories = () => {
    const [data,error] = useFetchDocList('category')
    const categories: ICategory[] = Object.values(data || {});
    let List: ReactNode = [];
    if (error) throw error
    if (categories.length) {
        List = categories.map((category) => (<CategoryCard key={category.id}>{category.name}</CategoryCard>));
    } else {
        List = [
            <div className='skeleton size-20 rounded-full bg-base-200' key={1} />,
            <div className='skeleton size-20 rounded-full bg-base-200' key={2} />,
            <div className='skeleton size-20 rounded-full bg-base-200' key={3} />,
            <div className='skeleton size-20 rounded-full bg-base-200' key={4} />,
        ]
    }
    return (
        <Section>
            <SectionHeader header="Categories" title="Browse Categories" />
            <SectionBody>
                <div className='overflow-x-auto mx-auto'>
                    <div className='flex gap-4 py-2'>
                        {List}
                    </div>
                </div>
            </SectionBody>
        </Section>
    )
}

export default Categories