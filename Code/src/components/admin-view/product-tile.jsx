import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminproductTile({ product, setCurrentEditedId, setOpenCreateproductDialog, setFormData, handleDelete }) {
  return (
    <Card className="w-full max-w-sm mx-auto py-0 border  ">
      <div className="flex flex-col gap-0">
        <div className="relative bg-[#1a1a1a] w-full h-[300px] overflow-hidden rounded-t-lg">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full md:h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <div className="w-full bg-[#000000f2] pt-0 rounded-b-lg">
          <CardContent>
            <h1 className="text-xl font-bold mb-2 mt-2 text-white">{product?.title.length > 20 ? product?.title.substring(0, 20) + '...' : product?.title}</h1>
            <div className="flex justify-between items-center mb-2">
                <span className={`text-lg font-semibold text-white ${product?.salePrice > 0 ? 'line-through' : ''}}`} style={{fontFamily:"Playfair Display",}}><i>${product?.price}</i></span>
                {
                    product?.salePrice > 0 ? 
                    <span className="text-lg font-bold text-white" style={{fontFamily:"Playfair Display",}}><i>${product?.salePrice}</i></span> : 
                    null
                }
            </div>
        </CardContent>
        <CardFooter className='flex justify-between items-center gap-x-4 pb-4'>
            <Button className="cursor-pointer bg-yellow-600 hover:bg-yellow-600 text-black" onClick={()=>{
                setOpenCreateproductDialog(true)
                setFormData(product)
                setCurrentEditedId(product?._id)
            }}>Edit</Button>
            <Button onClick={()=>handleDelete(product?._id)} className="cursor-pointer bg-yellow-600 hover:bg-yellow-600 text-black">Delete</Button>
        </CardFooter>
        </div>
        
      </div>
    </Card>
  );
}

export default AdminproductTile;
