import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserProvider";
import styled from "styled-components";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useReviewDetail } from "../../hooks/ReviewDetailsProvider";
import { useHistory } from "react-router";
import { djangoApiInstance } from "../../axios";

const review = {
  reviewId: 0,
  title: "TESTER",
  content: "CONTTTT",
  itemCode: "itemcode",
};
const mockReviews = [
  review,
  review,
  review,
  review,
  review,
  review,
  review,
  review,
  review,
  review,
  review,
  review,
];
export default function Account() {
  const [user, setUser] = useUser();
  const [reviewDetails, setReviewDetail] = useReviewDetail();
  const [reviews, setReviews] = useState(mockReviews);
  const history = useHistory();
  const handleClick = (e) => {
    console.log("clicked");
    setReviewDetail(e);
    history.push("/review");
  };
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await djangoApiInstance.get(
        `/api/review/list/${user.userId}`
      );
      setReviews(res.data);
    };
    fetchReviews();
  }, []);
  return (
    <div>
      <div>
        <h2>{user.username}</h2>
        <h3>{user.points}</h3>
      </div>

      <div>
        {reviews.map((e, idx) => {
          return (
            <div onClick={() => handleClick(e)}>
              <ReviewCard review={e} key={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
