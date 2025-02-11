import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../stores";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteCategoryThunk } from "../../../../stores/products/productsThunk";
import { showToastThunk } from "../../../../stores/app/app";
const deleteCategory = (dispatch: AppDispatch, id: string) => async () => {
  await dispatch(deleteCategoryThunk(id));
  dispatch(
    showToastThunk({
      type: "success",
      message: "Category deleted successfully",
      duration: 2000,
    })
  );
};
const Categories = () => {
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex-1">
      <h4>Categories</h4>
      <ul className="list-disc pl-5">
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="p-2 flex gap-2 justify-between items-center w-full">
              <span>{category.name}</span>
              <div>
                <Link
                  to={`${category.id}`}
                  className="btn btn-sm btn-circle btn-primary btn-outline border-0 mr-2"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={deleteCategory(dispatch, category.id || "")}
                  className="btn btn-sm btn-circle btn-outline border-0 btn-error"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
