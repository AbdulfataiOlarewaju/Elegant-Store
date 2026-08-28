import { Input } from "@/components/ui/input";
import { getSearchResult, resetSeachResult } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "./product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { fetchProductsProductDetails } from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams()
  const {searchResults} = useSelector((state) => state.shopSearch)
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.auth);
    const {cartItems} = useSelector(state=>state.shopCart)
    const { productDetails } = useSelector((state) => state.shoppingProducts);
    const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
        setTimeout(()=>{
            setSearchParams(new  URLSearchParams(`?keyword=${keyword}`))
            dispatch(getSearchResult(keyword)).then((data)=>{
                console.log(data, 'data from search');
            })
        }, 1000)
    } else {
      
        dispatch(resetSeachResult())
        setSearchParams(new  URLSearchParams(`?keyword=${keyword}`))
      
    }
  }, [keyword])

  useEffect(()=>{
    if(productDetails){
      setOpen(true)
    }
  }, [productDetails])

  console.log(searchResults, 'searchResults');
  console.log(open, 'open');
  

   function handleAddToCart(getCurrentProductId, getTotalStock){
  // console.log(getCurrentProductId, 'getCurrentProductId');
  console.log(cartItems, 'cartItems');

  let getCartitems = cartItems.items || [];
   
  if(getCartitems.length) {
    const indexOfCurrentItem = getCartitems.findIndex((item)=> item.productId === getCurrentProductId);
    if(indexOfCurrentItem > -1){
      const getQuantity = getCartitems[indexOfCurrentItem].quantity;
      if(getQuantity + 1 > getTotalStock){
        toast.error(`Only ${getTotalStock} items available in stock`);
        return;
      }
    }
  }
  
  dispatch(addToCart({userId : user?.id, productId:getCurrentProductId, quantity:1})).then((data)=>{
    console.log(data);
    if(data?.payload?.success){
      toast.success(data?.payload?.message)
      dispatch(fetchCartItems({userId:user?.id}))
    }
    
  })
  
 }

  function handleGetProductDetails(getCurrentProductId){
     console.log(getCurrentProductId,'getCurrentProductId');
     dispatch(fetchProductsProductDetails(getCurrentProductId))
   }
  

  return (
    <div className="container mx-auto md:px-6 px-4 py-8 h-screen">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for products..."
            className="w-full text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
            searchResults && searchResults.length > 0 ? searchResults.map((item)=>(
                <ShoppingProductTile key={item._id} product={item}  handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart}/>
            )) : <p className="text-center col-span-full"><h1 className="text-5xl font-bold text-white">No products found!</h1></p>
        }
      </div>
      <ProductDetailsDialog productDetails={productDetails} open={open} setOpen={setOpen} />
    </div>
  );
}

export default SearchPage;
