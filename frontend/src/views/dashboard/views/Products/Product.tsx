import { useParams } from "react-router-dom"
import { useFetchDoc } from "../../../../Hooks/useFetchDoc"

const Product = () => {
  const params = useParams();
  const [product,error] = useFetchDoc('product',params.id!);
  if(error?.message){
    throw error
  }
  return (
    <div>
      <h5>Product</h5>
      <div className="p-2">
        <p>{product?.name}</p>
        <p>{product?.description}</p>
        <p>{product?.price}</p>
        <p>{product?.stock}</p>
      </div>
    </div>
  )
}

export default Product