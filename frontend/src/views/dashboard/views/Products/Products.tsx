import { useDispatch } from "react-redux";
import store, { AppDispatch } from "../../../../stores";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProductThunk } from "../../../../stores/products/productsThunk";
import { showToastThunk } from "../../../../stores/app/app";
import { IProduct } from "../../../../schemas/product";
import Table, { ColumnProps } from "../../../../components/atoms/Table/Table";
import { useFetchDocList } from "../../../../Hooks/useFetchDoc";
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

const columns = (dispatch: AppDispatch) : ColumnProps<IProduct>[] => [
  {
    field: "name",
    label: "Product Name",
  },
  {
    field: "price",
    label: "Price",
  },
  {
    field: "stock",
    label: "Stock",
  },
  {
    field: "category",
    label: "Category",
    render: (row) => store.getState().categories.data[String(row.category)]?.name || ""
  },
  {
    field: "actions",
    render: (row) => (
      <div className="flex gap-2">
        <Link
          to={`${row.id}`}
          className="btn btn-sm btn-circle btn-primary btn-outline border-0 mr-2"
        >
          <FaEdit />
        </Link>
        <button
          onClick={deleteProduct(dispatch, row.id || "")}
          className="btn btn-sm btn-circle btn-outline border-0 btn-error"
        >
          <FaTrash />
        </button>
      </div>
    ),
  }
]


const Products = () => {
  const [products,error] = useFetchDocList('product');
  const dispatch = useDispatch<AppDispatch>();
  // update categories list
  useFetchDocList('category');
  if(error){
    throw error
  }
  return products && (
    <div className="card">
      <div className="max-md:overflow-x-auto">
        <Table data={Object.values(products)} columns={columns(dispatch)} />
        <Link to="new" className="btn btn-sm w-full btn-primary">New Product</Link>
      </div>
    </div>
  );
};

export default Products;
