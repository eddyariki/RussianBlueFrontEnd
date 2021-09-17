import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rakutenApiInstance } from "../../axios";
import { rakutenApiAppID, rakutenItemSearchApiURL } from "../../constants";

export default function ReviewCard({ review }) {
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    const getImage = async () => {
      // console.log(review);
      const res = await rakutenApiInstance.get(rakutenItemSearchApiURL, {
        params: {
          format: "json",
          itemCode: review.itemCode,
          applicationId: rakutenApiAppID,
        },
      });
      console.log(res.data.Items[0].Item.mediumImageUrls[0].imageUrl);
      console.log(res.data.Items[0]);
      setImgUrl(res.data.Items[0].Item.mediumImageUrls[0].imageUrl);
    };
    if (review.reviewId !== -20) {
      getImage();
    }
  }, [review.reviewId]);
  return (
    <ReviewCardContainer>
      <Image src={imgUrl} />
      <ReviewCardTitle>
        {review.title.length > 22
          ? review.title.slice(0, 25) + "..."
          : review.title}
      </ReviewCardTitle>
      <ReviewCardContent>
        {review.content.length > 45
          ? review.content.slice(0, 45) + "..."
          : review.content}
      </ReviewCardContent>
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.div`
  display: grid;
  grid-template-columns: 10vh auto;
  grid-column-gap: var(--padding-s);
  grid-template-rows: 1fr 1fr;
  box-shadow: var(--shadow-s);
  background-color: var(--color-green);
`;
const Image = styled.img`
  width: 10vh;
  height: 10vh;
  grid-row: 1/3;
  align-self: center;
`;
const ReviewCardTitle = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  font-size: var(--font-size-m);
  font-family: var(--font-text);
  font-weight: bold;
  color: var(--color-yellow);
`;
const ReviewCardContent = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  font-size: var(--font-size-s);
  font-family: var(--font-text);
`;
