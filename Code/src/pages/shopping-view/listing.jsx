import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shortOptions } from "@/config";
import { fetchFilteredProducts, fetchProductsProductDetails } from "@/store/shop/products-slice";

import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams))
    if (Array.isArray(value) && value.length > 0) {
      const paraValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paraValue)}`);
    }
  return queryParams.join("&");
}

function ShoppingList() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(state=>state.auth);
  const {cartItems} = useSelector(state=>state.shopCart)
  const categorySearchParams = searchParams.get('category')

  
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  console.log(productList, 'productList');
  // console.log(filters, 'filters');
//   console.log(searchParams);
// console.log(productDetails);
console.log(cartItems, 'cartItems');



  function handleSort(value) {
    console.log(value);
    setSort(value);
  }
  function handleFIlter(getSectionId, getCurrentOption) {
    // console.log(getSectionId, getCurrentOption);

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption], 
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(
          getCurrentOption
        ); 
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    console.log(cpyFilters);
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || []);
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);


  useEffect(()=>{
  if(productDetails !==null) setOpen(true)
  }, [productDetails])

  console.log(productList, 'productList');
  

  function handleGetProductDetails(getCurrentProductId){
    console.log(getCurrentProductId,'getCurrentProductId');
    dispatch(fetchProductsProductDetails(getCurrentProductId))
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFIlter={handleFIlter} />
      <div className="bg-black text-white w-full rounded-lg shadow-sm">
        <div className="px-4 py-3.5 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-yellow-600">
            All Product
          </h2>
          <div className="flex items-center gap-3">
            <span className="">
              {productList?.length}
              {productList?.length > 1 ? " Products" : " Product"}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-1 cursor-pointer bg-yellow-600 hover:bg-yellow-600 text-black"
                  size="sm"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-200px bg-black text-white"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {shortOptions.map((shortItem) => (
                    <DropdownMenuRadioItem
                      className="cursor-pointer list-none"
                      value={shortItem.id}
                      key={shortItem.id}
                    >
                      {shortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 py-10">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile product={productItem} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />
              ))
            : null}
        </div>
      </div>

      //dialoge for productDetails
      <ProductDetailsDialog productDetails={productDetails} open={open} setOpen={setOpen} />
    </div>
  );
}

export default ShoppingList;
