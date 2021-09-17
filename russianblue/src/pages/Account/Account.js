import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserProvider";
import styled from "styled-components";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useReviewDetail } from "../../hooks/ReviewDetailsProvider";
import { useHistory } from "react-router";
import { djangoApiInstance } from "../../axios";
import { ActionButton } from "../../components/Buttons/Buttons";

const review = {
  reviewId: -20,
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
      console.log(res);
      setReviews(res.data);
    };
    fetchReviews();
  }, []);
  const logOut = () => {
    localStorage.clear();
    setUser({
      username: "",
      userId: -1,
      points: 0,
      loggedIn: false,
    });
  };
  return (
    <AccountContainer>
      <ProfileInfoContainer>
        <ActionButtonContainer>
          <ActionButton onClick={logOut} style={{ width: "fit-content" }}>
            log out
          </ActionButton>
        </ActionButtonContainer>
        <ProfileInfo>
          <ProfileUsername>{user.username}</ProfileUsername>
          <ProfilePoints>{user.points}pts</ProfilePoints>
        </ProfileInfo>
      </ProfileInfoContainer>
      <ReviewsContainer>
        <ReviewsSection>Reviews by You</ReviewsSection>
        <ReviewsList>
          {reviews.map((e, idx) => {
            return (
              <div onClick={() => handleClick(e)}>
                <ReviewCard review={e} key={idx} />
              </div>
            );
          })}
        </ReviewsList>
      </ReviewsContainer>
    </AccountContainer>
  );
}

const AccountContainer = styled.div`
  display: grid;
  padding: var(--padding-s);
`;

const ProfileInfoContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-row: 1/2;
`;
const ProfileUsername = styled.div`
  font-family: var(--font-title);
  font-size: var(--font-size-xl);
  justify-self: start;
  color: var(--color-black);
  padding-bottom: var(--padding-s);
`;
const ProfilePoints = styled.div`
  font-family: var(--font-text);
  font-size: var(--font-size-m);
  justify-self: start;
  color: var(--color-orange);
  padding-bottom: var(--padding-m);
`;

const ActionButtonContainer = styled.div`
  grid-column: 2/3;
  justify-self: end;
`;

const ReviewsContainer = styled.div`
  display: grid;
`;

const ReviewsSection = styled.div`
  font-family: var(--font-text);
  font-size: var(--font-size-m);
  justify-self: start;
  color: var(--color-black);
  padding-bottom: var(--padding-s);
  border-bottom: 1px solid var(--color-black);
`;

const ReviewsList = styled.div`
  padding-top: var(--padding-s);
  display: grid;
  grid-row-gap: var(--padding-s);
`;
