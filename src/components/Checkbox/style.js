import styled from "styled-components";

export const DivCheckbox = styled.div`
	position: relative;
	margin: 50px auto 0;
    font-size: 15px;
    .cbGroup {
        position: relative;
        display: block;
        label {
            display: block;
            background: Gainsboro; /*cor dos campos nao selecionados*/ 
            color: #444;
            border-radius: 5px;
            padding: 10px 40px 10px 10px;
            border: 2px solid Gainsboro; /*cor das bordas*/
            margin-bottom: 10px;
            cursor: pointer;
            &:after,
            &:before {
                content: "";
                position: absolute;
                right: 11px;
                top: 11px;
                width: 20px;
                height: 20px;
                border-radius: 3px;
                background: #FFF;/*cor da caixinha antes de selecionar*/
            }
            &:before {
                background: transparent;
                transition: 0.1s width cubic-bezier(0.075, 0.82, 0.165, 1) 0s,
                    0.3s height cubic-bezier(0.075, 0.82, 0.165, 2) 0.1s;
                z-index: 2;
                overflow: hidden;
                background-repeat: no-repeat;
                background-size: 13px;
                background-position: center;
                width: 0;
                height: 0;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS4zIDEzLjIiPiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0LjcuOGwtLjQtLjRhMS43IDEuNyAwIDAgMC0yLjMuMUw1LjIgOC4yIDMgNi40YTEuNyAxLjcgMCAwIDAtMi4zLjFMLjQgN2ExLjcgMS43IDAgMCAwIC4xIDIuM2wzLjggMy41YTEuNyAxLjcgMCAwIDAgMi40LS4xTDE1IDMuMWExLjcgMS43IDAgMCAwLS4yLTIuM3oiIGRhdGEtbmFtZT0iUGZhZCA0Ii8+PC9zdmc+);
            }
        }
        input[type="checkbox"] {
            display: none;
            position: absolute;
            width: 100%;
            appearance: none;
            &:checked + label {
                background: Silver; /*cor do campo selecionado */
                animation-name: blink;
                animation-duration: .5s;
                font-weight: bolder;
                border-color: Silver;/*borda do campo selecionado*/
                &:after {
                    background: #4F4F4F; /*cor da caixinha selecionada*/
                }
                &:before {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
    @keyframes blink { /*transisao*/
        0% {
            font-size: 18px;
        }
        50% {
            font-size: 17px;
        }
        75% {
            font-size: 16px;
        }
        100% {
            font-size: 15px;
        }
    }    
`