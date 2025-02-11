import LayoutRoot from "../../../../components/LayoutRoot";
const CategoriesNavList = [
  {
    path: "",
    name: "Categories",
  },
  {
    path: "new",
    name: "New Category",
  },
];
const Root = () => {
  return (
    <LayoutRoot links={CategoriesNavList}/>
  );
};

export default Root;
