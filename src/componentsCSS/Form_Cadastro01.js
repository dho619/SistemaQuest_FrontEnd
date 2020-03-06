import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-top: 20px;

  @media only screen and (max-device-width: 800px) {
    width: 400px;
  }
`;

export const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: auto;
  background: #fff;
  padding: 30px;
	margin: 50px auto;
	box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.35);
	border-radius: 10px;
	border: 6px solid #305A72;
  img {
    width: 300px;
    margin: 10px 0 40px;
  }
  .erro {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #696969;
    padding: 5px 10px;
    background: #FFF;
    box-shadow: inset 0px 0px 15px #4682B4;
    -moz-box-shadow: inset 0px 0px 15px #4682B4;
    -webkit-box-shadow: inset 0px 0px 15px #4682B4;
    color: #777;
    width: 100%;
    flex: 1;
    &::placeholder {
      color: #999;
      text-transform: initial;
    }
  }
  
  input:focus {
      border: 2px solid #4682B4;
      box-shadow: inset 0px 0px 15px #DCDCDC;
      -moz-box-shadow: inset 0px 0px 15px #DCDCDC;
      -webkit-box-shadow: inset 0px 0px 15px #DCDCDC;
  }

  button {
    color: #fff;
    font-size: 16px;
    background: gray;
    height: 56px;
    border: 0;
    width: 100%;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    cursor: pointer;
    box-shadow: inset 0px 0px 15px #4682B4;
    -moz-box-shadow: inset 0px 0px 15px #4682B4;
    -webkit-box-shadow: inset 0px 0px 15px #4682B4;
  }
  
  button:hover {
      opacity: 0.7;
  }
  
  .navigationButtons{
      display: flex; 
      justify-content: space-between;
  }

  .navigationButtons button {
      padding: 10px;
      font-weight: bold;
      width: 20%; 
  }

  .navigationButtons button[disabled] { /*se esta desabilitado*/
      opacity: 0.5;
      cursor: default; /*cursor comum*/
  }

  .navigationButtons button[disabled]:hover {
      opacity:  0.5;/*forcar a nao mudar quando desabilitado*/
  }

  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
  @media only screen and (max-device-width: 800px) {
    margin-top: -80px;
    padding: 80px;
  }

  @media only screen and (max-device-width: 580px) {
    margin-top: 0px;
    width: auto;
    img {
      width: 230px;
    }
  }
`;