// import ProductImageUpload from "@/components/admin-view/image-upload";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminproductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
// import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { adproductFromElement } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AdminProducts() {
  const initialFormdata = {
    image: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [openCreateproductDialog, setOpenCreateproductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormdata);
  const [imageFile, setImageFile] = useState(null);
  const [uplaodedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  function onSubmit(event) {
    event.preventDefault();
    currentEditId !== null
      ? dispatch(
          editProduct({
            id: currentEditId,
            formData: formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setFormData(initialFormdata);
            setOpenCreateproductDialog(false);
            setCurrentEditedId(null);
            toast.success(data?.payload?.message)
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uplaodedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data.payload.success) {
            dispatch(fetchAllProduct());
            setImageFile(null);
            setFormData(initialFormdata);
            toast.success(data.payload.message);
            setOpenCreateproductDialog(false);
          }
        });
  }
  console.log(formData);
  console.log(productList, uplaodedImageUrl, "productList");
  // console.log(uplaodedImageUrl);

 function isFormvalid() {
  const requiredFields = ['title', 'description', 'category', 'brand', 'price', 'totalStock'];
  return requiredFields.every(key => formData[key] !== '');
}

function handleDelete(getProductId){
  console.log(getProductId);
  dispatch(deleteProduct({id : getProductId})).then((data)=>{
    if(data?.payload?.success){
      dispatch(fetchAllProduct());
      toast.success(data?.payload?.message)
    }
  }) 
}

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button
          onClick={() => setOpenCreateproductDialog(true)}
          className="cursor-pointer bg-yellow-600 text-black hover:bg-yellow-600"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-8 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminproductTile
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateproductDialog={setOpenCreateproductDialog}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateproductDialog}
        onOpenChange={() => {
          setOpenCreateproductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormdata);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-[#0d0c0cfd] text-white">
          <SheetHeader>
            <SheetTitle className='text-white'>
              {currentEditId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            setUploadedImageUrl={setUploadedImageUrl}
            uplaodedImageUrl={uplaodedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditId !== null}
          />
          <div className="py-6 px-3">
            <CommonForm
              formControls={adproductFromElement}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentEditId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormvalid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
