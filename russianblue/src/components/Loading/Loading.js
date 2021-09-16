import styled, { keyframes } from "styled-components";

const blimpAnimation = keyframes`
 0% { width: 50px; }
 30% {  width: 70px; opacity: 1 }
 40% { width: 105px; opacity: 0.3; }
 100% { width: 50px; opacity: 0.6; }
`;

export const Loading = styled.div`
  border-style: solid;
  border-width: 5px;
  border-color: black;
  animation-name: ${blimpAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export const LoadingContainer = styled.div`
  height: 110px;
  width: 110px;
  justify-self: center;
`;
