import { useParams } from 'react-router-dom';
import { useFetchDoc } from '../../../../Hooks/useFetchDoc';

const Category = () => {
  const { id } = useParams();
  const [category,error] = useFetchDoc('category',id);
  if(error){
    throw error
  }
  if (id && category) {
    return (
      <div>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
    );
  }
};

export default Category;