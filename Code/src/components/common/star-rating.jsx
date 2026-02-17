import { Star } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChaneg }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      variant=""
      size="icon"
      onClick={handleRatingChaneg ? ()=> handleRatingChaneg(star) : null}
      className={`bg-transparent hover:bg-transparent p-2 rounded-full trransition-colors ${star <= rating ? "text-yellow-500 hover:bg-black" : "text-white hover:bg-black/50"}`}
    >
      <Star className={`w-5 h-5 ${star <= rating ? "fill-yellow-600" : "fill-white"}`} />
    </Button>
  ));
}

export default StarRatingComponent;



