import React from "react";
import { useSelectedProduct } from "../../hooks/SelectedProductProvider";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
export default function ProductCard(props) {
  let history = useHistory();
  const [, setSelectedProduct] = useSelectedProduct();
  const onClickHandler = (e) => {
    e.preventDefault();
    setSelectedProduct(props.item);
    history.push("/product");
  };
  return (
    <CardContainer>
      <CardInfoContainer>
        <CardImage
          src={
            props.item.mediumImageUrls[0] &&
            props.item.mediumImageUrls[0].imageUrl.replace("128x128", "512x512")
          }
          alt="product image"
        />
        <ItemLink onClick={onClickHandler}>
          <Text>
            {props.item.itemName.slice(0, 60)}
            <hr />
            <ItemPrice>{props.item.itemPrice}円</ItemPrice>
          </Text>
        </ItemLink>
      </CardInfoContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  position: relative;
  display: grid;
  height: var(--card-height);
  width: var(--card-width);
  box-shadow: var(--shadow-m);
  justify-items: center;
  background-color: var(--color-yellow);
`;
const CardInfoContainer = styled.div`
  display: grid;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`;

const CardImage = styled.img`
  height: auto;
  width: 100%;
  position: absolute;
  z-index: 0;
`;

const ItemLink = styled.a`
  color: var(--card-text-color);
  font-family: var(--font-japanese);
  position: absolute;
  z-index: 1;
  height: var(--card-textbox);
  align-self: end;
  background-color: var(--card-textbox-background);
  &:hover {
    cursor: pointer;
    color: var(--card-text-color-secondary);
  }
  width: 100%;
`;

const ItemPrice = styled.div`
  color: var(--color-yellow);
`;

const Text = styled.div`
  padding: var(--padding-s);
`;
