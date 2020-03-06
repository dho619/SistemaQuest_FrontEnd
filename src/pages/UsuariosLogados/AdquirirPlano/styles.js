import styled from "styled-components"

const Div = styled.div`
    padding: 20px 60px 60px 60px;

    h1 {
        display: flex;
        justify-content: center;
        text-decoration: underline;
        margin-bottom: 50px;
    }
    .LkEscolher{
        padding: 15px;
        border: 0;
        background: #C0C0C0;
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer; /*Muda a seta do mouse para a maozinha em cima do botao*/
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        cursor: pointer;
        box-shadow: inset 0px 0px 15px #4682B4;
        -moz-box-shadow: inset 0px 0px 15px #4682B4;
        -webkit-box-shadow: inset 0px 0px 15px #4682B4;
    }    
    .LkEscolher:hover {
        opacity: 0.7;
    }
    .planos{
        padding-left: 55px; 
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        list-style: none;    
        header {
            padding: 4px;
            width: 180px;
            h3 {
                font-size: 20px;
                font-style: oblique;
                display: flex;
                justify-content: center;
            }
        }
        .body{
            background-color: #C0C0C0;
            height: 300px;
            width: 180px;
            overflow: auto;
            border-bottom: 1pt solid #696969;
            border-right: 1pt solid #696969;
            border-left: 1pt solid #696969;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            box-shadow: inset 0px 0px 15px #4682B4;
            -moz-box-shadow: inset 0px 0px 15px #4682B4;
            -webkit-box-shadow: inset 0px 0px 15px #4682B4;
        }
        .footer {
            width: 180px;
            margin-top: 10px;
            .centraliza {
                display: flex;
                justify-content: center;
            }
        }
        h4 {
            margin-bottom: 10px;
            font-size: 16px;
            display: flex;
            background-color: #FFF;
        }
        p {
            font-size: 12px;
            margin-left: 10px;
        }
        .esquerda {
            width: 25%;
        }
        .centro {
            width: 25%;
        }
        .direita {
            width: 25%;
        }
    }
    @media only screen and (max-device-width: 800px) {
        width: 450px;
        .planos{
            width: auto;
            grid-template-columns: 1fr;
            justify-content: center;
            float: center;
            .body{
                height: 200px;
            }
        }
    }
`

export default Div