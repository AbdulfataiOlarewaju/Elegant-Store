import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import backgroundImgFour from "../../assets/bg1.avif";
import backgroundImgTwo from "../../assets/shopping-version.webp";
import backgroundImgOne from "../../assets/bg.2.png";
import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  DumbbellIcon,
  Footprints,
  ShirtIcon,
  SparklesIcon,
  Tags,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchFilteredProducts,
  fetchProductsProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "./product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ShoppingHome() {
  const slides = [backgroundImgOne, backgroundImgTwo, backgroundImgFour];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { productList, productDetails, isLoading } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const categories = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: SparklesIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accsessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ];
  const brands = [
    { id: "nike", label: "Nike", icon: Footprints },
    { id: "adidas", label: "Adidas", icon: DumbbellIcon },
    { id: "", label: "Puma", icon: Tags },
    { id: "levi", label: "Zara", icon: SparklesIcon },
    { id: "h&m", label: "H&M", icon: ShirtIcon },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8500); // 2 minutes = 120,000 milliseconds

    return () => clearInterval(interval);
  }, [slides.length]);
  useEffect(() => {
    dispatch(
      fetchFilteredProducts({ filterParams: [], sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails) {
      setOpen(true);
    }
  }, [productDetails]);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

   const recentProducts = productList.slice(0, 5); // Last 5 Products
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId, "getCurrentProductId");
    dispatch(fetchProductsProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    // console.log(getCurrentProductId, 'getCurrentProductId');
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(fetchCartItems({ userId: user?.id }));
      }
    });
  }

  // console.log(productList);
  console.log(productDetails);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/list");
  }

  
  return (
    <div className="w-screen">
      <div className="w-full h-[600px]  bg-center relative flex items-center">
        {/* FADE OVERLAY */}
        <div
          className="absolute inset-0 from-black to-transparent bg-cover overflow-hidden h-[600px]"
          style={{
            backgroundImage: `url(${slides[currentSlideIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <Button
            onClick={nextSlide}
            size="icon"
            className="absolute lg:block hidden top-1/2 right-1 md:right-5  bg-transparent border-none hover:bg-transparent -translate-y-1/2 transition cursor-pointer"
          >
            <ChevronRight
              width={10}
              height={10}
              color="black"
              className="cursor-pointer"
            />
          </Button>
        </div>

        {/* TEXT */}
        <div className="relative z-10 max-w-3xl pl-5 md:pl-20">
          <Button
            onClick={prevSlide}
            size="icon"
            className="absolute lg:block hidden top-1/2 left-[-3px] md:left-5 bg-transparent border-none hover:bg-transparent transform -translate-y-1/2 transition cursor-pointer"
          >
            <ChevronLeft
              width={10}
              height={10}
              color="black"
              className="cursor-pointer"
            />
          </Button>
          <h1 className="lg:text-6xl text-3xl font-bold leading-tight text-yellow-600">
            Discover Style Chosen <br />
            <span className="text-yellow-600">Just For You</span>
          </h1>

          <p className="text-lg text-white mt-4 max-w-md font-semibold">
            Every piece in our collection is hand-selected to bring you comfort,
            confidence, and effortless beauty.
          </p>

          <Button onClick={()=>navigate('/shop/list')} className="mt-6 bg-black text-white text-lg px-7 py-6 rounded-md hover:bg-black cursor-pointer transition font-semibold">
            Explore Collection →
          </Button>
        </div>
      </div>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-xl lg:text-4xl font-bold mb-7 text-white items-center flex justify-center">
            Shop by categories
          </h2>
          <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((categoryItem) => {
              const IconComponent = categoryItem.icon;
              return (
                <div
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  key={categoryItem.id}
                  className="flex flex-col items-center bg-black rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <div className="bg-yellow-600 p-4 rounded-full mb-2">
                    <IconComponent size={32} className="text-black" />
                  </div>
                  <span className="text-white font-medium">
                    {categoryItem.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-xl lg:text-4xl font-bold mb-7 text-white items-center flex justify-center">
            Shop by brands
          </h2>
          <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brands.map((brandItem) => {
              const IconComponent = brandItem.icon;
              return (
                <div
                  onClick={() =>
                    handleNavigateToListingPage(brandItem, "brand")
                  }
                  key={brandItem.id}
                  className="flex flex-col items-center bg-black rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <div className="bg-yellow-600 p-4 rounded-full mb-2">
                    <IconComponent size={32} className="text-" />
                  </div>
                  <span className="text-white font-medium">
                    {brandItem.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-7">
            Feature Products
          </h2> 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {productList && productList.length > 0
              ? recentProducts.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                    isLoading={isLoading}
                  />
                ))
              : null}
          </div>
        </div>
        <ProductDetailsDialog
          productDetails={productDetails}
          open={open}
          setOpen={setOpen}
        />
      </section>
    </div>
  );
}

export default ShoppingHome;
