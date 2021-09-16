import { createContext, useContext, useState } from "react";
import { reviewPlaceHolder } from "./values/reviewPlaceholder";
export const reviewDetailContext = createContext();

const ReviewDetailProvider = (props) => {
  const [reviewDetail, setReviewDetail] = useState(reviewPlaceHolder);

  return (
    <reviewDetailContext.Provider value={[reviewDetail, setReviewDetail]}>
      {props.children}
    </reviewDetailContext.Provider>
  );
};

export const useReviewDetail = () => {
  const [reviewDetail, setReviewDetail] = useContext(reviewDetailContext);
  return [reviewDetail, setReviewDetail];
};

export default ReviewDetailProvider;
