import { Separator } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star } from "lucide-react";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addNewReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const dispatch = useDispatch();

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // console.log(getCurrentProductId, 'getCurrentProductId');
    let getCartitems = cartItems.items || [];

    if (getCartitems.length) {
      const indexOfCurrentItem = getCartitems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartitems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getTotalStock} items available in stock`);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(fetchCartItems({ userId: user?.id }));
      }
    });
  }
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setReviewMessage("");
    setRating(0);
  }

  function handleRatingChaneg(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addNewReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMessage,
        reviewValue: rating,
      }),
    ).then((data) => {
      // console.log(data);
      if (data.payload.success) {
        dispatch(getReviews({id: productDetails._id}));
        toast.success(data.payload.message);
          setRating(0)
        setReviewMessage('')
      } else {
        toast.error(data.payload.message);
      
      }
    }).catch((error) => {
      toast.error(error.response?.data?.message || "An error occurred while adding the review");
    });
  }
  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews({ id: productDetails?._id }));
    }
  }, [productDetails]);

  console.log(reviews);
  
  const averageRewview = reviews && reviews.length > 0 ?
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
      reviews.length : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:p-8 max-w-[95vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="relative overflow-hidden rounded-lg h-[300px] lg:h-[400px] flex items-center justify-center">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className=" h-full"
            />
          </div>

          <div className="p-2 sm:p-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-yellow-600">
                {productDetails?.title}
              </h1>

              <p className="mb-3 text-sm sm:text-base">
                {productDetails?.description}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2 mb-4">
              <p
                className={`text-xl font-bold ${
                  productDetails?.salePrice > 0 ? "line-through opacity-70" : ""
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-xl font-bold text-yellow-600">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <StarRatingComponent rating={averageRewview}/>
              <span className="text-sm sm:text-base">({averageRewview.toFixed(1)})</span>
            </div>

            <div className="mt-5 mb-5">
              {productDetails?.totalStock === 0 ? (
                <Button
                  disabled
                  className="w-full bg-yellow-600 opacity-60 cursor-not-allowed hover:bg-yellow-600 text-black font-semibold"
                  onClick={() => handleAddToCart(productDetails?._id)}
                >
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-yellow-600 hover:bg-yellow-600 text-black cursor-pointer font-semibold"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock,
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>

            <Separator orientation="horizontal" className="my-4 bg-gray-700" />

            <div className="max-h-[250px] sm:max-h-[300px] overflow-y-auto p-1 pr-3">
              <h2 className="text-xl font-bold mb-4 sticky top-0 bg-black z-10 p-1 -m-1">
                Reviews
              </h2>
              <div className="grid gap-6">
                {
                  reviews && reviews.length > 0 ?
                  reviews.map(reviewItem => 
                     <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-white text-black font-semibold">
                      {reviewItem.userName.slice(1).toUpperCase().split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">
                        {reviewItem?.userName.toUpperCase()}
                      </h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                    </div>
                    <p className="text-sm">{reviewItem.reviewMessage}</p>
                  </div>
                </div>
                  )
                  : <h1>No reviews</h1>
                }
             
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-0.5">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChaneg={handleRatingChaneg}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMessage}
                onChange={(event) => setReviewMessage(event.target.value)}
                placeholder="Write a review..."
                className="grow bg-gray-900 border-gray-700 focus:ring-yellow-600"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMessage.trim() == ""}
                className="bg-yellow-600 hover:bg-yellow-600 text-black cursor-pointer font-semibold"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
