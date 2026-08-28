import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloud, X } from "lucide-react"; // Added X as XIcon
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
function ProductImageUpload({
  imageFile,
  setImageFile,
  uplaodedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  console.log(imageFile);

  async function handleImageUpLoad() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );
    console.log(response.data);
    console.log(response?.data?.data?.url);

    if (response?.data?.success) {setUploadedImageUrl(response?.data?.data?.url);
    setImageLoadingState(false);}
    else if(response.data.error){
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    if (imageFile !== null) handleImageUpLoad();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <label
        htmlFor=""
        className="text-lg font-semibold mb-2
             block"
      >
        Upload Image
      </label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-black ${!imageFile ? "bg-gray-100" : ""} ${imageLoadingState && "animate-pulse"} ${uplaodedImageUrl && "bg-green-100"} ${isEditMode && "opacity-70 pointer-events-none"}`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${isEditMode && "cursor-not-allowed"}`}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" color="black" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-baseline">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p>{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
