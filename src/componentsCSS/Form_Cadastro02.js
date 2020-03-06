import styled from "styled-components";

export const Container = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .Div_Message {
    box-shadow: 1px 1px 25px rgba(30, 144, 255, 0.5);
    border: 4px solid #1E90FF;
  }

`;

export const Div = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  cursor: auto;
  background: #fff;
	padding: 30px;
	margin: 50px auto;
	box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.35);
	border-radius: 10px;
	border: 6px solid #305A72;
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-bottom: 1pt solid #000000;
    margin: 0px -30px 10px -30px;
  }

  .erro {
    color: red;
    font-style: oblique;
    margin-top: -10px;
    margin-bottom: 10px;
    border: 1pt solid red;
    padding: 5px;
  }

  .messageOK {
    color: black;
    font-style: oblique;
    margin: -10px 0px 10px 0px;
    /* border: 1pt solid black;
    padding: 5px; */
  }

  .Formulario {
    padding: 20px;
  }

  .Group {
    margin-bottom: 25px;
    strong {
      margin-bottom: 10px;
    }
    strong + strong {
      margin-left: 10px;
    }
  }

  input {
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    margin-top: 5px;
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

  input:read-only{
    height: 25px;
    flex: 30%;
    width: 20%;
    margin-left: 10px;
    background-color: #ddd;
    box-shadow: inset 0px 0px 15px #1C1C1C;
    -moz-box-shadow: inset 0px 0px 15px #1C1C1C;
    -webkit-box-shadow: inset 0px 0px 15px #1C1C1C;
  }

  .comboBox {
    margin-bottom: 25px;
    select {
      height: 30px;
      margin-top: 3px;
      cursor: pointer;
      border-radius: 10px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      margin-top: 5px;
      border: 1px solid #696969;
      padding: 5px 10px;
      background: #FFF;
      box-shadow: inset 0px 0px 15px #4682B4;
      -moz-box-shadow: inset 0px 0px 15px #4682B4;
      -webkit-box-shadow: inset 0px 0px 15px #4682B4;
    }
  }

  .DateFields{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-left: 20px;
    input {
      flex: 0.4;
      padding: 2px;
    }
  }

  button {
    color: #fff;
    font-size: 16px;
    background: gray;
    height: 56px;
    border: 0;
    width: 100%;
    cursor: pointer;
    margin-top: 25px;
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

  @media only screen and (max-device-width: 800px) {
    width: 490px;
    margin-left: -50px;
    .Group .inputTamanhoMin {
      width: 90px;
    }
    .DateFields{
      display: grid;
      grid-template-columns: 50px 2fr;
      gap: 2px;
      list-style: none;
    }
    .navigationButtons button {
        padding: 5px;
        font-size: 12px;
        width: 30%; 
    }
  }
  
`;