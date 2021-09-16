import { createContext, useState, useContext } from "react";
import { defaultProduct } from "./values/productPlaceholder";

export const selectedProductContext = createContext();

const SelectedProductProvider = (props) => {
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct);

  return (
    <selectedProductContext.Provider
      value={[selectedProduct, setSelectedProduct]}
    >
      {props.children}
    </selectedProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  const [selectedProduct, setSelectedProduct] = useContext(
    selectedProductContext
  );
  return [selectedProduct, setSelectedProduct];
};

export default SelectedProductProvider;
