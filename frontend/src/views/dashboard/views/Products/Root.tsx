import LayoutRoot from "../../../../components/LayoutRoot";
const productsNavList = [
  {
    path: "",
    name: "Products",
  },
  {
    path: "new",
    name: "New Product",
  },
];
const Root = () => {
  return (
    <LayoutRoot links={productsNavList} />
  );
};

export default Root;
