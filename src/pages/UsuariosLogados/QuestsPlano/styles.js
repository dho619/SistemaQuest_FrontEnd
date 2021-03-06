import styled from "styled-components";

const Div = styled.div`
    max-width: 700px; /*Para nao passar de 700px o bloco de questionarios*/
    margin: 20px auto 0; /*Ficar centralizado*/
    padding: 0 20px; /*margem do lado de dentro, a ordem e cima direita baixo esquerda*/

    .header {
        display: flex; /*Ocupara toda linha*/
        justify-content: space-between; /*esse e o de baixo, para centralizar o botao */
        align-items: flex-end;
        margin-bottom: 20px;
    }
    h1 {
        margin-top: 30px;
    }   
    .blocos {
        background: #FFF;
        border: 1px solid #000000;
        border-radius: 5px; /*Arrendondar as bordas*/
        padding: 20px;
        margin-bottom: 20px;
    }

    .blocos:hover {
        border: 1px solid red;
        transition: all 2s;
    }

    .blocos p {
        font-size: 16px;
        color: #999;
        margin-top: 5px;
        line-height: 24px;
    }   
    .blocos a {
        height: 42px;  
        border-radius:5px; /*Arrendondar as bordas*/
        border: 2px solid gray;
        background: none;
        margin-top: 10px;
        color: gray;
        font-weight: bold;
        font-size: 16px;
        text-decoration: none;
        display: flex; /*Fazer ele ocupar toda a linha*/
        justify-content: center; /*esse e o de baixo, para centralizar o botao */
        align-items: center;        
        transition: all 0.2; /*para as mudancas ao passar o mouse, demore 0.2segundos*/
    }   
    .blocos a:hover {
        background: gray;
        color: #FFF;
    }

    .opcoes{
        font-size: 9pt;
        display: flex;
    }       
    .actions{
        display: flex; /*Ocupara toda linha*/
        justify-content: space-between; /*Um todo a esquerda e outro toda a direita*/
        margin-bottom: 20px; /*Para nao colar na tela*/
    }

    .actions button {
        padding: 10px;
        border-radius: 5px; /*Arrendondar as bordas*/
        border: 0;
        background: gray;
        color: #FFF;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer; /*Muda a seta do mouse para a maozinha em cima do botao*/
    }   
    .actions button[disabled] { /*se esta desabilitado*/
        opacity: 0.5;
        cursor: default; /*cursor comum*/
    }   
    .actions button:hover {
        opacity: 0.7;
    }   
    .actions button[disabled]:hover {
        opacity:  0.5;/*forcar a nao mudar quando desabilitado*/
    }   
    .exibir {
        padding: 0px 4px 0px 4px;
        border-radius: 5px; /*Arrendondar as bordas*/
        border: 1pt solid black;
        margin-bottom: 10px;
        background: gray;
        color: #FFF;
        font-weight: bold;
        cursor: pointer; /*Muda a seta do mouse para a maozinha em cima do botao*/
    }

    .exibir:hover {
        padding: 0px 4px 0px 4px;
        background: #FFF;
        color: gray;
        border: 2px solid #000000;
        transition: all .2s;
    }

    .btIcon {
        margin-top: 10px;
        margin-right: 10px;
        background-color: #FFF;
        border: 2px solid gray;
        border-radius:15px; /*Arrendondar as bordas*/
        height: 40px;
        cursor: pointer; /*Muda a seta do mouse para a maozinha em cima do botao*/
    }   
    .btIcon img  {
        height: 30px;
        margin-top: 2px;    
    }   
    .btIcon:hover {
        background: gray;
        border: 2px solid #000000;
    }
    @media only screen and (max-device-width: 800px) {
        width: 490px;
        margin-left: -50px;
    }
`   

export default Div;