import React, { useEffect, useState } from "react";
import { rakutenApiAppID, rakutenItemSearchApiURL } from "../../constants";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import styled from "styled-components";
import { ActionButton } from "../../components/Buttons/Buttons";
import { Loading, LoadingContainer } from "../../components/Loading/Loading";
import { useProductQuery } from "../../hooks/ProductQueryProvider";
import { rakutenApiInstance } from "../../axios";

// Component for searching for products
export default function ProductSearch() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [productQuery, setProductQuery] = useProductQuery();
  const [failed, setFailed] = useState(false);
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (productQuery.length > 0) {
      setItems(productQuery);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItems([]);
    try {
      const res = await rakutenApiInstance.get(rakutenItemSearchApiURL, {
        params: { format: "json", keyword, applicationId: rakutenApiAppID },
      });
      setItems(res.data.Items);
      setProductQuery(res.data.Items);
      setLoading(false);
      setFailed(false);
    } catch (e) {
      setLoading(false);
      setFailed(true);
    }
  };

  return (
    <SearchContainer>
      <Form>
        <SearchBox
          type="text"
          placeholder="search keyword"
          name="searchbox"
          value={keyword}
          onChange={handleChange}
        />
        <ActionButton
          type="submit"
          onClick={handleSubmit}
          style={{
            boxShadow: "var(--shadow-s)",
          }}
        >
          search
        </ActionButton>
      </Form>
      <LoadingContainer>{loading ? <Loading /> : null}</LoadingContainer>
      {items.length > 0 ? (
        <ItemsContainer>
          {failed ? <Error>No Result</Error> : null}

          {items.length > 0
            ? items.map((obj, idx) => {
                return <ProductCard key={idx} item={obj.Item} />;
              })
            : null}
        </ItemsContainer>
      ) : null}
    </SearchContainer>
  );
}
const SearchContainer = styled.div`
  display: grid;
  height: var(--search-container-height);
  width: var(--search-container-width);
`;

const Form = styled.form`
  justify-self: start;
  position: fixed;
  z-index: 10;
  padding-left: var(--padding-s);
`;

const SearchBox = styled.input`
  height: var(--interactive-height);
  width: var(--search-box-width);
  padding-left: var(--padding-s);
  border-radius: var(--search-box-border-radius);
  border: solid 1px var(--color-black);
  box-shadow: var(--shadow-s);
`;

const ItemsContainer = styled.div`
  display: grid;
  align-self: top;
  justify-self: center;
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--product-card-container-size), 1fr)
  );
  row-gap: var(--spacing-m);
  justify-items: center;
`;

const Error = styled.div``;
