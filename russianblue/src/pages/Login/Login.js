import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserProvider";
import styled from "styled-components";
import { ActionButton } from "../../components/Buttons/Buttons";
import { Loading, LoadingContainer } from "../../components/Loading/Loading";
import axios from "axios";
import { djangoApiInstance } from "../../axios";
import { useHistory } from "react-router";
import { useRedirect } from "../../hooks/RedirectProvider";
import { mock } from "../../constants";

export default function Login() {
  const [user, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [submitted, setSubmitted] = useState(0);
  const [redirect, setRedirect] = useRedirect();
  const [error, setError] = useState({ status: "", message: "" });
  const history = useHistory();

  useEffect(() => {
    if (submitted === 3) {
      // successful login
      history.push(redirect);
    }
  }, [submitted]);

  const changeHandler = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (isRegister) {
      submit("register");
    } else {
      submit("login");
    }
  };
  const submit = async (req) => {
    setSubmitted(1);
    try {
      console.log(username, password);

      const res = await djangoApiInstance.post(`/user/${req}/`, {
        username,
        password,
      });
      console.log(res);
      setUser({
        username: res.data.data.username,
        userId: res.data.data.userId,
        points: res.data.data.points,
        loggedIn: true,
      });
      localStorage.setItem("userId", res.data.data.userId);
      setSubmitted(3);
    } catch (e) {
      console.log(e);
      setSubmitted(2);
    }
  };
  const handleReset = () => {
    setSubmitted(0);
    setError({ status: "", message: "" });
  };
  const handleToggle = () => {
    setIsRegister((c) => !c);
  };
  const renderHelper = () => {
    switch (submitted) {
      case 1:
        return (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        );

      case 2:
        return (
          <Error>
            Error: {error.status} - {error.message}
            <Toggle onClick={handleReset}>back</Toggle>
          </Error>
        );
      default:
        return (
          <>
            <UserNameInput
              type="text"
              name="username"
              value={username}
              onChange={changeHandler}
            />
            <PasswordInput
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
            />

            <ActionButton type="submit" onClick={submitHandler}>
              {isRegister ? "Sign Up" : "Login"}
            </ActionButton>

            <Toggle onClick={handleToggle}>
              {isRegister ? "Already have an account?" : "Create account"}
            </Toggle>
          </>
        );
    }
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginInputContainer>
          <Header>{isRegister ? "Create an Account" : "Login"}</Header>
          {renderHelper()}
        </LoginInputContainer>
      </LoginFormContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  height: 100vh;
  grid-row-gap: var(--padding-s);
`;

const LoginFormContainer = styled.div`
  display: grid;
  border: 1px solid black;
  border-radius: 25px;
  justify-items: center;
  align-items: center;
  height: 250px;
  width: 250px;
  grid-row-gap: var(--padding-s);
`;
const LoginInputContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: var(--padding-s);
`;
const Header = styled.h1`
  font-size: var(--font-size-m);
  /* font-size: var(--font-size-l); */
  font-family: var(--font-text);
`;

const UserNameInput = styled.input`
  height: var(--interactive-height-s);
`;

const PasswordInput = styled.input`
  height: var(--interactive-height-s);
`;

const Toggle = styled.a`
  height: var(--interactive-height);
  font-size: var(--font-size-s);
  &:hover {
    color: var(--link-hover-color);
    cursor: pointer;
  }
  color: var(--color-green);
  font-family: var(--font-text);
`;

const Error = styled.div`
  color: red;
  font-family: var(--font-text);
`;
