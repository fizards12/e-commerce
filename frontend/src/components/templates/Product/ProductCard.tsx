import React from "react";
import { IProduct } from "../../../schemas/product";
import { BsCart3 } from "react-icons/bs";
type ProductCardProps = React.HTMLAttributes<HTMLDivElement> & {
  product: IProduct;
};
const ProductCard: React.FC<ProductCardProps> = ({ product, ...props }) => {
  return (
    <div
      className="card shadow-md border-2 hover:border-primary-container transition-colors border-neutral-200 overflow-hidden group/product min-w-48 max-w-48 w-full flex flex-col p-0"
      {...props}
    >
      <div className="h-40 overflow-hidden bg-gray-100 flex justify-center items-center">
        <img
          className="object-cover duration-500 transition-transform group-hover/product:scale-120 size-24"
          src={
            product.img
              ? typeof product.img === "string"
                ? product.img
                : URL.createObjectURL(product.img)
              : ""
          }
          alt=""
        />
      </div>
      <div className="card-body p-3 text-primary">
        <div className="flex text-lg flex-col gap-1">
          <span className="font-semibold">{product.name}</span>
          <span className="font-bold">${product.price}</span>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-accent btn-wide rounded-full">
            <BsCart3 size={20}/>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
