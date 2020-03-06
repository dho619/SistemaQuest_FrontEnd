import styled from "styled-components";


export const Div = styled.div`
    header{
        display: flex; /*Ocupara toda linha*/
        justify-content: space-between; /*esse e o de baixo, para centralizar o botao */
        align-items: flex-end;
        padding: 10px;
        .btVoltarAval{
            color: black;
            padding: 2px;
            display: flex;
            align-items: center;
            font-size: 16px;
            border: 1pt solid black;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            cursor: pointer;
        }
        .btVoltarAval:hover{
            opacity: 0.7;
        }
    }
    @media only screen and (max-device-width: 800px) {
        header{
            width: 450px;
            .btVoltarAval{
                margin-right: 20px;
            }
            h1{
                font-size: 17pt;
            }
        }
    }
`