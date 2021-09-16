import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router";
import { useUser } from "../../hooks/UserProvider";

export default function Header() {
  const history = useHistory();
  const [user, setUser] = useUser();
  const handleClick = (name) => {
    switch (name) {
      case "account":
        history.push("/account");
        break;
      case "home":
        history.push("/");
        break;
      default:
        return;
    }
  };
  return (
    <>
      <HeaderSpacer />
      <HeaderContainer>
        <AppTitleContainer
          onClick={() => {
            handleClick("home");
          }}
        >
          <AppTitle>Sharify</AppTitle>
        </AppTitleContainer>
        <UserInfoContainer>
          {user.loggedIn && (
            <>
              <Username>{user.username}</Username>
              <Points>{user.points}pts</Points>
            </>
          )}
        </UserInfoContainer>
        <AccountIconContainer onClick={() => handleClick("account")}>
          <CgProfile
            style={{
              height: "var(--header-content-height)",
              width: "var(--header-content-height)",
            }}
          />
        </AccountIconContainer>
      </HeaderContainer>
    </>
  );
}
const HeaderSpacer = styled.div`
  background: transparent;
  height: var(--header-spacer);
`;
const HeaderContainer = styled.div`
  height: var(--header-height);
  width: 100vw;
  display: grid;
  grid-template-columns: 6fr 1fr 2fr;
  background: var(--header-background);
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const AccountIconContainer = styled.div`
  grid-column-start: 3;
  justify-self: end;
  align-self: center;
  height: var(--header-height);
  width: auto;
  display: grid;
  align-items: center;
  justify-items: center;
  padding-right: var(--padding-s);
  svg {
    color: var(--header-icon-color);
  }
`;

const AppTitleContainer = styled.div`
  grid-column-start: 1;
  justify-self: start;
  height: var(--header-height);
  display: grid;
`;

const AppTitle = styled.h1`
  padding-top: var(--padding-s);
  padding-left: var(--padding-s);
  justify-self: center;
  align-self: top;
  font-size: var(--font-size-l);
  color: var(--header-font-color);
  font-family: var(--font-logo);
  font-style: italic;
`;

const UserInfoContainer = styled.div`
  grid-column-start: 2;
  justify-self: end;
  align-self: center;
  display: grid;
`;

const Username = styled.div`
  justify-self: end;
  color: var(--header-username-color);
  font-size: var(--font-size-m);
  font-family: var(--font-text);
  font-weight: bold;
`;

const Points = styled.div`
  justify-self: end;
  color: var(--header-username-color);
  font-size: var(--font-size-s);
  font-family: var(--font-text);
`;
