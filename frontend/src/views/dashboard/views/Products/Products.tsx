import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../stores";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProductThunk } from "../../../../stores/products/productsThunk";
import { showToastThunk } from "../../../../stores/app/app";
const deleteProduct = (dispatch: AppDispatch, id: string) => async () => {
  await dispatch(deleteProductThunk(id));
  dispatch(
    showToastThunk({
      type: "success",
      message: "Product deleted successfully",
      duration: 2000,
    })
  );
};
const Products = () => {
  const products = useSelector(
    (state: RootState) => state.products.products
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex-1">
      <h4>Products</h4>
      <ul className="list-disc pl-5">
        {products.map((product, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="p-2 flex gap-2 justify-between items-center w-full">
              <span>{product.name}</span>
              <div>
                <Link
                  to={`${product.id}`}
                  className="btn btn-sm btn-circle btn-primary btn-outline border-0 mr-2"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={deleteProduct(dispatch, product.id || "")}
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
}

export default Products