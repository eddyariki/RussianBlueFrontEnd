import styled from "styled-components";
import { useHistory } from "react-router";
import React from "react";

export default function StyledLink(props) {
  const history = useHistory();
  const onClickHandler = (e) => {
    e.preventDefault();
    history.push(props.path);
  };
  if (props.hyper) {
    return (
      <NativeLink href={props.path} target="_blank" rel="noopener noreferrer">
        {props.children}
      </NativeLink>
    );
  } else {
    return <NativeLink onClick={onClickHandler}>{props.children}</NativeLink>;
  }
}

const NativeLink = styled.a`
  &:hover {
    cursor: pointer;
    color: var(--link-hover-color);
  }
  &:visited {
    text-decoration: none;
  }
  font-size: var(--font-size-s);
  color: var(--color-black);
  text-decoration: none;
  font-family: var(--font-text);
`;
