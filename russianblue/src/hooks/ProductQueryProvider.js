import { createContext, useState, useContext } from "react";

export const productQueryContext = createContext();

const ProductQueryProvider = (props) => {
  const [productQuery, setProductQuery] = useState([]);

  return (
    <productQueryContext.Provider value={[productQuery, setProductQuery]}>
      {props.children}
    </productQueryContext.Provider>
  );
};

export const useProductQuery = () => {
  const [productQuery, setProductQuery] = useContext(productQueryContext);
  return [productQuery, setProductQuery];
};

export default ProductQueryProvider;
