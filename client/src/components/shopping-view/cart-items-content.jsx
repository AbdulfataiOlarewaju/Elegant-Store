import { Minus, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItemQty } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productList} = useSelector((state) => state.shoppingProducts);
  const {cartItems: cartState} = useSelector((state)=> state.shopCart)  

  function handleQtyUpdate(getCartItem, typeOfAction) {
    if(typeOfAction === 'add' ) {
        let getCartitems = cartState.items || [];
         
        if(getCartitems.length) {
          const indexOfCurrentCartItem = getCartitems.findIndex((item)=> item.productId === getCartItem.productId);
          const getCurrentProductIndex = productList.find(product=> product._id === getCartItem.productId);
          const getTotalStock = getCurrentProductIndex?.totalStock;
          if(indexOfCurrentCartItem > -1){
            const getQuantity = getCartitems[indexOfCurrentCartItem].quantity;
            if(getQuantity + 1 > getTotalStock){
              toast.error(`Only ${getTotalStock} items available in stock`);
              return;
            }
          }
        }
    }

    if(typeOfAction === 'minus' && getCartItem?.quantity === 1) return; //no need for using dsiable again in the minus button downn.
    
    dispatch(
      updateCartItemQty({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "add"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.action) {
        toast.success("Cart item is updated successfully");
      }
    });
  }
  function handleDeleteCartItem(getDeletedCart) {
    console.log(getDeletedCart);
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getDeletedCart?.productId })
    );
    dispatch(fetchUserCart({ userId: user?.id })).then((data) => {
      if (data?.payload?.action) {
        toast.success("Cart item deleted successfully");
      }
    });
  }
  return (
    <div className="text-white flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-24 h-25 rounded-sm object-cover border"
      />
      <div className="flex-1">
        <h3 className="font-extrabold text-yellow-600">{cartItems?.title}</h3>
        <div className="flex items-center mt-2">
          <ButtonGroup
            orientation="horizontal"
            aria-label="Media controls"
            className="h-fit bg-white rounded-lg border justify-between"
          >
            <Button
              onClick={() => handleQtyUpdate(cartItems, "minus")}
              variant="outline"
              size="icon"
              // disabled={cartItems?.quantity === 1}
              className=" bg-white text-black hover:bg-white border-none cursor-pointer"
            >
              <MinusIcon />
              <span className="sr-only">decrease quantity</span>
            </Button>
            <p className="flex items-center py-2 px-3 bg-black font-semibold rounded">
              {cartItems?.quantity}
            </p>
            <Button
              onClick={() => handleQtyUpdate(cartItems, "add")}
              variant="outline"
              size="icon"
              className=" bg-white text-black hover:bg-white border-none cursor-pointer"
            >
              <PlusIcon />
              <span className="sr-only">increase quantity</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="flex flex-col items-end gap-5">
        <p className="font-semibold">
          $
          {(cartItems?.salePrice > 0
            ? cartItems?.salePrice
            : cartItems?.price) * cartItems.quantity.toFixed(2)}
        </p>
        <TrashIcon
          onClick={() => handleDeleteCartItem(cartItems)}
          fill="white"
          size={17}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
