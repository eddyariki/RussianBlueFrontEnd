import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledLink from "../../components/Link/StyledLink";
import { useSelectedProduct } from "../../hooks/SelectedProductProvider";
import { CgArrowRightO } from "react-icons/cg";
import { AiFillShop } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
export default function Product() {
  const [selectedProduct] = useSelectedProduct();
  const [slideShowIndex, setSlideShowIndex] = useState(0);

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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <ProductContainer>
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
      <TitleContainer>
        <Title>{selectedProduct.itemName}</Title>
      </TitleContainer>
      <MainContent>
        <StyledLinkContainer>
          <StyledLink path="/reviewform">Write a Review</StyledLink>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <StyledLink path={selectedProduct.itemUrl} hyper={true}>
            Go to Product Site
          </StyledLink>
        </StyledLinkContainer>

        <MoreDetails>
          <Detail>Scroll below for product details</Detail>
          <DropdownContainer>
            <IoIosArrowDropdown />
          </DropdownContainer>
        </MoreDetails>
      </MainContent>

      <PriceTag>{selectedProduct.itemPrice}円</PriceTag>
      <ShopName
        href={selectedProduct.shopUrl}
        target="_blank"
        rel="noopener noreffer"
      >
        <AiFillShop /> {selectedProduct.shopName}
      </ShopName>
      <Caption>{selectedProduct.itemCaption}</Caption>
    </ProductContainer>
  );
}
const ProductContainer = styled.div`
  display: grid;
  grid-row-gap: var(--padding-s);
  width: 100vw;
`;

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
const TitleContainer = styled.div`
  box-shadow: var(--shadow-m);
  padding-bottom: var(--padding-s);
  background-color: var(--color-orange);
`;
const Title = styled.h1`
  font-size: var(--font-size-m);
  padding-top: var(--padding-s);
  padding-left: var(--padding-s);
  padding-right: var(--padding-s);
  font-family: var(--font-japanese);
  color: var(--color-beige);
  font-weight: 100;
  max-width: 95vw;
  /* box-shadow: var(--shadow-m); */
  /* border-bottom: 1px solid var(--product-lining); */
`;
const PriceTag = styled.h2`
  padding-left: var(--padding-s);
  font-size: var(--font-size-m);
  color: var(--item-price-color);
`;
const Caption = styled.p`
  font-size: var(--font-size-m);
  padding-top: var(--spacing-m);
  padding-left: var(--padding-m);
  padding-right: var(--padding-s);
  padding-bottom: var(--padding-s);
  max-width: 100vw;
  overflow-x: scroll;
`;

const ShopName = styled.a`
  padding-left: var(--padding-s);
  font-size: var(--font-size-m);
  &:visited {
    text-decoration: none;
  }
`;
const MainContent = styled.div`
  padding-top: var(--padding-m);
  height: 35vh;
  width: 100vw;
  display: grid;
`;

const StyledLinkContainer = styled.div`
  font-size: var(--font-size-s);
  border-radius: 5px;
  border: solid 1px var(--color-black);
  padding: var(--padding-s);
  background-color: var(--color-yellow);
  justify-self: center;
  width: fit-content;
  height: fit-content;
  box-shadow: var(--shadow-m);
`;

const MoreDetails = styled.div`
  padding-top: var(--spacing-m);
  justify-self: center;
  display: grid;
`;
const Detail = styled.div`
  justify-self: center;
  font-family: var(--font-japanese);
`;

const DropdownContainer = styled.div`
  justify-self: center;
`;
