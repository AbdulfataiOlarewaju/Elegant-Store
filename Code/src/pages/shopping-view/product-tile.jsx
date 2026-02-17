import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto py-0 border shadow-sm shadow-neutral-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer ">
      <div className="flex flex-col gap-0">
        <div
          onClick={() => handleGetProductDetails(product?._id)}
          className="relative bg-[#1a1a1a] w-full h-[300px] overflow-hidden rounded-t-lg"
        >
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full md:h-[300px] object-cover rounded-t-lg transform hover:scale-110 transition-transform duration-300"
          />
          {product.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of Stock
            </Badge>
          ) : product.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Only {product.totalStock} left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <div className="w-full bg-[#000000f2] pt-0 rounded-b-lg">
          <CardContent>
            <h1 className="text-xl font-bold mt-2 text-white">
              {product?.title.length > 30
                ? product?.title.substring(0, 23) + "..."
                : product?.title}
            </h1>
            <div className="flex justify-between items-center mt-2 mb-1">
              <span className="text-sm text-yellow-600">
                {product?.category}
              </span>
              <span className="text-sm text-yellow-600">{product?.brand}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-lg font-semibold text-white ${product?.salePrice > 0 ? "line-through" : ""}`}
                style={{ fontFamily: "Playfair Display" }}
              >
                <i>${product?.price}</i>
              </span>
              {product?.salePrice > 0 ? (
                <span
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  <i>${product?.salePrice}</i>
                </span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center gap-x-4 pb-4">
            {product.totalStock === 0 ? (
              <Button
                disabled
                className="w-full cursor-not-allowed opacity-60 bg-yellow-600 hover:bg-yellow-600 text-black"
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddToCart(product?._id, product.totalStock)}
                className="w-full cursor-pointer bg-yellow-600 hover:bg-yellow-600 text-black"
              >
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
