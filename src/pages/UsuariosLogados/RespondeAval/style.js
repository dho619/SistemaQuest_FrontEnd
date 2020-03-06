import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    margin-top: 20px;

    @media only screen and (max-device-width: 800px) {
        
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
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1pt solid #000000;
        margin: -20px -30px 10px -30px;
        .InformacoesQuest {
            padding: 10px;
            background-color: #A9A9A9;
            font-size: 10pt;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            box-shadow: inset 0px 0px 15px #FFF;
            -moz-box-shadow: inset 0px 0px 15px #FFF;
            -webkit-box-shadow: inset 0px 0px 15px #FFF;
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

    .navegadores{
        background-color: #DDD;
        height: 30px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        box-shadow: inset 0px 0px 15px #4682B4;
        -moz-box-shadow: inset 0px 0px 15px #4682B4;
        -webkit-box-shadow: inset 0px 0px 15px #4682B4;
        *{
            width: 5%;
            height: 30px;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            background-color: #FFF;
        }
        *[disabled]{
            background-color: #DDD;
            font-weight: bold;
            color: black;
        }
    }
    
    .Slider{
        overflow-y: auto;
        /* width */
        ::-webkit-scrollbar {
            width: 15px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #888; 
            border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    }

    .Slide{
        min-height: 300px;
        /* overflow: auto; */
        * {
            outline-style: none !important;
        }
    }

    .navigationButtons{
      display: flex; 
      justify-content: space-between;
      align-items: center;

        button {
            padding: 10px;
            font-weight: bold;
            width: 20%; 
            color: #fff;
            font-size: 16px;
            background: gray;
            border: 0;
            cursor: pointer;
            margin-top: 25px;
        }
        .myButton {
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            box-shadow: inset 0px 0px 15px #4682B4;
            -moz-box-shadow: inset 0px 0px 15px #4682B4;
            -webkit-box-shadow: inset 0px 0px 15px #4682B4;
        }
        .btFinalizar {
            background: #483D8B;
            width: 18%;
            height: 85px;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            box-shadow: inset 0px 0px 15px #4682B4;
            -moz-box-shadow: inset 0px 0px 15px #4682B4;
            -webkit-box-shadow: inset 0px 0px 15px #4682B4;
        }
        button:hover {
            opacity: 0.7;
        }
        button[disabled] { /*se esta desabilitado*/
            opacity: 0.5;
            cursor: default; /*cursor comum*/
        }
        button[disabled]:hover {
            opacity:  0.5;/*forcar a nao mudar quando desabilitado*/
        }
    }

    .btConfirma {
        width: 100%;
        height: 56px;
    }

    .QuestionField {
        padding: 20px;
        margin-bottom: 25px;
        strong {
            margin-bottom: 10px;
        }
        strong + strong {
            margin-left: 10px;
        }
        .perguntas{
            .titulo{
                text-decoration: underline;
            }
            .pergunta{
                color: black;
                font-style: oblique;
            }
        }
        .respostas{
            .myInputRange {
                margin: 50px 0px 30px 0px;
            }
            .myTextArea {
                width: 100%;
                margin: 50px 0px 30px 0px;
                padding: 10px;
                border: 1px solid black;
                background-color: #D3D3D3;
                box-shadow: inset 0px 0px 50px #FFF;
                -moz-box-shadow: inset 0px 0px 50px #FFF;
                -webkit-box-shadow: inset 0px 0px 50px #FFF;
            }
            .myTextArea:focus {
                border: 1px solid #4682B4;
            }
        }
    }

    .erro {
        color: red;
        font-style: oblique;
        margin-top: 0px;
        margin-bottom: -15px;
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

    

    

    @media only screen and (max-device-width: 800px) {
        width: 490px;
        margin-left: -50px;
        .Group .inputTamanhoMin {
            width: auto;
        }
        .DateFields{
            display: grid;
            grid-template-columns: 50px 2fr;
            gap: 2px;
            list-style: none;
        }

        .navigationButtons .btFinalizar {
            width: 19%;
            height: 80px;
        }
    }
`;

// @media only screen and (max-device-width: 800px) {
//     width: 300px;
//     .Group .inputTamanhoMin {
//         width: 90px;
//     }
//     .DateFields{
//         display: grid;
//         grid-template-columns: 50px 2fr;
//         gap: 2px;
//         list-style: none;
//     }

//     .buttonGroup { 
        
//     }
//     .navigationButtons button {
//         padding: 5px;
//         font-size: 12px;
//         width: 30%; 
//     }
// }