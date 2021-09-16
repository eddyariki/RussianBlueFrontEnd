import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { djangoApiInstance, rakutenApiInstance } from "../../axios";
import { ActionButton, BuyButton } from "../../components/Buttons/Buttons";
import StyledLink from "../../components/Link/StyledLink";
import {
  mock,
  rakutenApiAppID,
  rakutenItemSearchApiURL,
} from "../../constants";
import { useReviewDetail } from "../../hooks/ReviewDetailsProvider";
import { useUser } from "../../hooks/UserProvider";
import { useSelectedProduct } from "../../hooks/SelectedProductProvider";
import { CgArrowRightO } from "react-icons/cg";
import { useQuery } from "../../hooks/useQuery";
export default function Review() {
  const [reviewDetails, setReviewDetail] = useReviewDetail();
  const [submitted, setSubmitted] = useState(0);
  const [bought, setBought] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [user, setUser] = useUser();
  const [selectedProduct, setSelectedProduct] = useSelectedProduct();
  const history = useHistory();
  const location = useLocation();
  const [slideShowIndex, setSlideShowIndex] = useState(0);
  const query = useQuery();
  const handleSlideShow = () => {
    setSlideShowIndex((c) => {
      if (c + 1 === selectedProduct.mediumImageUrls.length) {
        c = 0;
      } else {
        c++;
      }
      return c;
    });
  };
  useEffect(() => {
    if (submitted === 3) {
      setBought(true);
    }
    if (submitted === 4) {
      setDeleted(true);
    }
  }, [submitted]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params.get("reviewId"));
    const queryReviewId = params.get("reviewId");
    const fetchReviews = async () => {
      try {
        let reviewId;
        if (queryReviewId) {
          reviewId = queryReviewId;
        } else {
          reviewId = reviewDetails.reviewId;
        }
        const res = await djangoApiInstance.get(`/api/review/${reviewId}`);
        const reviewData = res.data;
        setReviewDetail({
          reviewId: reviewData.reviewId,
          title: reviewData.title,
          content: reviewData.content,
          itemCode: reviewData.itemCode,
          userId: reviewData.userId,
        });
        const product = await rakutenApiInstance.get(rakutenItemSearchApiURL, {
          params: {
            format: "json",
            itemCode: reviewData.itemCode,
            applicationId: rakutenApiAppID,
          },
        });
        setSelectedProduct(product.data.Items[0].Item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchReviews();
  }, []);

  const handleClick = async () => {
    try {
      setSubmitted(1);
      const res = await djangoApiInstance.put(`/refer/${reviewDetails.userId}`);
      console.log(res.data.message);
      setSubmitted(3);
    } catch (e) {
      console.log(e);
      setSubmitted(2);
    }
  };
  const handleDelete = async () => {
    try {
      setSubmitted(1);
      const res = await djangoApiInstance.delete(
        `/api/review/delete/${reviewDetails.reviewId}`
      );
      console.log(res.data.message);
      setSubmitted(4);
    } catch (e) {
      console.log(e);
      setSubmitted(2);
    }
  };
  return deleted ? (
    <div>
      Deleted Review <Link to="/">Ok</Link>
    </div>
  ) : (
    <ReviewContainer>
      <SlideShowContainer onClick={handleSlideShow}>
        <SlideShow>
          <SlideShowImage
            src={selectedProduct.mediumImageUrls[
              slideShowIndex
            ].imageUrl.replace("128x128", "512x512")}
            alt="item image"
          />
        </SlideShow>
        <ArrowContainer>
          {selectedProduct.mediumImageUrls.length > 1 && <CgArrowRightO />}
        </ArrowContainer>
      </SlideShowContainer>
      <ButtonsContainer>
        <StyledLinkContainer>
          <StyledLink path="/image">Generate Sharable Image</StyledLink>
        </StyledLinkContainer>
        {bought ? (
          <Thanks>Thank you!</Thanks>
        ) : (
          <BuyButton onClick={handleClick}>buy product</BuyButton>
        )}
      </ButtonsContainer>
      {user.loggedIn &&
        parseInt(reviewDetails.userId) === parseInt(user.userId) && (
          <EditContainer>
            <StyledLinkContainer2>
              <StyledLink path="/editreviewform">Edit</StyledLink>
            </StyledLinkContainer2>
            <ActionButton onClick={handleDelete}>Delete</ActionButton>
          </EditContainer>
        )}
      <ReviewContentContainer>
        <ReviewTitle>{reviewDetails.title}</ReviewTitle>
        <ReviewContent>{reviewDetails.content}</ReviewContent>
      </ReviewContentContainer>
    </ReviewContainer>
  );
}

const SlideShowContainer = styled.div`
  padding-top: var(--spacing-s);
  padding-bottom: var(--padding-s);
  display: grid;
  position: relative;
  justify-self: center;
  width: 100vw;
  height: 40vh;
  height: var(--product-slideshow-height);
  justify-items: center;
  /* border-bottom: 1px var(--product-lining) solid; */
  /* box-shadow: var(--shadow-s); */
`;
const ArrowContainer = styled.div`
  position: absolute;
  justify-self: end;
  align-self: center;
  padding-right: var(--padding-m);
  z-index: 2;
  & svg {
    color: var(--product-slideshow-icon-color);
    width: var(--product-slideshow-icon-height);
    height: auto;
  }
`;
const SlideShow = styled.div`
  max-width: 100vw;
`;
const SlideShowImage = styled.img`
  justify-self: center;
  object-fit: cover;
  height: 30vh;
`;
const ReviewContainer = styled.div``;
const ButtonsContainer = styled.div`
  padding-top: var(--spacing-s);
  display: grid;
  justify-items: end;
  grid-row-gap: var(--spacing-s);
`;

const StyledLinkContainer = styled.div`
  justify-self: end;
  height: var(--interactive-height);
  background-color: var(--color-special);
  border-radius: 5px;
  border: 1px solid var(--color-special);
  width: fit-content;
  display: grid;
  align-items: center;
  padding: var(--padding-s);
  box-shadow: 0 0 6px 3px #fff, /* inner white */ 0 0 10px 6px #f0f,
    /* middle magenta */ 0 0 14px 9px #0ff; /* outer cyan */
  & a {
    font-size: var(--font-size-s);

    color: var(--color-yellow);
  }
`;

const StyledLinkContainer2 = styled.div`
  justify-self: start;
  background-color: var(--color-green);
  border-radius: 5px;
  width: fit-content;
  display: grid;
  align-items: center;
  padding: var(--padding-s);
  & a {
    color: var(--color-beige);
  }
`;

const EditContainer = styled.div`
  position: absolute;
  top: 0;
  padding-top: var(--spacing-l);
  display: grid;
  grid-row-gap: var(--padding-s);
  justify-items: start;
`;
const Thanks = styled.div`
  font-family: var(--font-text);
  color: var(--color-orange);
  justify-self: end;
`;

// const BuyProductButton = styled.button``;
const ReviewContentContainer = styled.div`
  padding-top: var(--padding-s);
`;
const ReviewTitle = styled.div`
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  padding-left: var(--padding-s);
`;
const ReviewContent = styled.div`
  font-family: var(--font-text);
  padding-top: var(--padding-s);
  padding-left: var(--padding-m);
`;
