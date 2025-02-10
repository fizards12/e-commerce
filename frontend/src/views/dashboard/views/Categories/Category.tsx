import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../stores';
import { fetchCategories } from '../../../../stores/products/productsThunk';

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.products.categories);
  const category = categories.find(cat => cat.id === id);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  if (id && category) {
    return (
      <div>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category;