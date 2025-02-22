import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../stores";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { showToastThunk } from "../../../../stores/app/app";
import { deleteCategoryThunk } from "../../../../stores/categories/categoriesThunk";
import Table, { ColumnProps } from "../../../../components/atoms/Table/Table";
import { ICategory } from "../../../../schemas/category";
import { useFetchDocList } from "../../../../Hooks/useFetchDoc";
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

const columns = (dispatch: AppDispatch): ColumnProps<ICategory>[] => [
  {
    field: "name",
    label: "Category Name",
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
          onClick={deleteCategory(dispatch, row.id || "")}
          className="btn btn-sm btn-circle btn-outline border-0 btn-error"
        >
          <FaTrash />
        </button>
      </div>
    ),
  },
];
const Categories = () => {
  const [categories] = useFetchDocList("category");
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="card">
      <Table
        data={Object.values(categories || {})}
        columns={columns(dispatch)}
      />
    </div>
  );
};

export default Categories;
