import styled from "styled-components";

export const Div = styled.div`
  /* BUGA NO CEL O GRADIENTE */
  /* background-image: -webkit-linear-gradient(135deg, #4682B4, #DCDCDC);
  background-image: linear-gradient(-45deg, #4682B4, #DCDCDC); */
  
  .PagesApp {
    display: flex;
  }

  .Content {
    margin: 8% auto;
    width: 70%;
    min-height: 500px;
  }

  .header{
    width: 100%;
  }

  @media only screen and (max-device-width: 800px) {
    .PagesApp {
      /* width: 500px; */
    }
    
    .Content {
      /* width: 400px;*/
      margin-top: 80px;
      min-height: 800px;
    }
    .Content h1{
      margin-left: -40px;
      text-align: center;
    }
    .footer {
      width: 100%;
    }
  }

`;