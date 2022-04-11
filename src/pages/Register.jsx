import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { register } from "../store/apiCalls";
import { registerClear } from "../store/registerReducer";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  align-self: center;
  margin-left: 20px;
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { isFetching, error, isSuccessful } = useSelector(state => state.register);

  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    register(dispatch, { username, email, password });
  };

  useEffect(() => {
    if (isSuccessful) {
      dispatch(registerClear());
      history("/login");
    }
    return () => {
      dispatch(registerClear());
    };
  }, [isSuccessful]);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
          <Input placeholder="confirm password" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          <Agreement>
            I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b> Already have an account? <Link to="/login">SIGN IN</Link>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            CREATE
          </Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
