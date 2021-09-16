import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SubmitButton } from "../../components/Buttons/Buttons";
import { djangoApiInstance } from "../../axios";
import { useSelectedProduct } from "../../hooks/SelectedProductProvider";
import { useReviewDetail } from "../../hooks/ReviewDetailsProvider";
import { useHistory } from "react-router";
import { useUser } from "../../hooks/UserProvider";
// Component for writing reviews
// Title, Body, Submit Button

export default function EditReviewForm() {
  const [selectedProduct] = useSelectedProduct();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(0);
  const [reviewDetails, setReviewDetail] = useReviewDetail();
  const [user, setUser] = useUser();
  const history = useHistory();
  useEffect(() => {
    setTitle(reviewDetails.title);
    setContent(reviewDetails.content);
  }, []);
  useEffect(() => {
    if (submitted === 3) {
      console.log("redirecting");
      history.push("/review");
    }
  }, [submitted]);
  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentInputChange = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(1);
    console.log(title, content);
    try {
      const res = await djangoApiInstance.put(
        `/api/review/update/${reviewDetails.reviewId}`,
        {
          title,
          content,
          itemCode: selectedProduct.itemCode,
          userId: user.userId,
        }
      );
      setReviewDetail({
        reviewId: res.data.reviewId,
        title: res.data.title,
        content: res.data.content,
        itemCode: res.data.itemCode,
      });
      setSubmitted(3);
    } catch (e) {
      setSubmitted(2);
    }
  };

  return (
    <FormContainer>
      <Form>
        <ItemName>{selectedProduct.itemName}</ItemName>
        <PageTitle>Edit Your Review</PageTitle>
        <Title
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleTitleInputChange}
        />
        <Content
          type="textfield"
          placeholder="Content"
          name="content"
          value={content}
          onChange={handleContentInputChange}
        />
        <SubmitButton type="submit" onClick={handleSubmit}>
          Save
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: var(--form-width);
  background-color: white;
  margin: auto;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  padding: var(--padding-s);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: var(--padding-s);
`;
const ItemName = styled.h2`
  padding: var(--padding-s);
  border-bottom: solid 1px var(--product-lining);
`;
const Title = styled.input`
  margin: var(--padding-s) 0 var(--padding-s) 0;
  padding: var(--padding-s);
  font-size: var(--font-size-m);
  border: 0;
  font-family: var(--font-family);
`;

const Content = styled.textarea`
  height: 250px;
  padding: var(--padding-s);
  font-size: var(--font-size-m);
  border: 0;
  font-family: var(--font-family);
`;

const PageTitle = styled.h1`
  padding-top: var(--padding-m);
  font-size: var(--font-size-l);
  font-family: var(--font-family);
`;
