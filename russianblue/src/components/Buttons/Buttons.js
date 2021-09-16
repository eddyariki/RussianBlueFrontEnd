import styled from "styled-components";

export const ActionButton = styled.button`
  height: var(--interactive-height);
  padding: var(--padding-s);
  color: var(--color-beige);
  background-color: var(--color-green);
  border: 1px solid var(--color-green);
  border-radius: 5px;
  margin: 0;
  /* font-size: var(--font-size-s); */
`;

export const SubmitButton = styled.button`
  height: var(--interactive-height);
  padding: var(--padding-s);
  background-color: var(--color-green);
  border: 1px solid var(--color-green);
  color: var(--button-color);
  border-radius: 5px;
  margin: 0;
`;

export const BuyButton = styled.button`
  height: var(--interactive-height-l);
  font-size: var(--font-l);
  padding: var(--padding-s);
  color: var(--color-green);
  background-color: var(--color-yellow);
  border: 1px solid var(--color-yellow);
  border-radius: 5px;
  margin: 0;
  box-shadow: var(--shadow-m);
  width: fit-content;
`;
