import styled from "styled-components";

export const Range = styled.input.attrs(props => ({
    type: 'range',
    min: props.min? props.min : 0,
    max: props.max? props.max : 100,
    step: props.step? props.step : 1,
    defaultValue: props.defaultValue.step? props.defaultValue.step: 0
  }))`
   height: 60px;
    -webkit-appearance: none;
    width: 100%; 

    :focus {
        outline: none;
    }
    ::-webkit-slider-runnable-track {
        width: 100%;
        height: 12px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
        border-radius: 4px;
        border: 2px solid #4169E1;
    }
    ::-webkit-slider-thumb {
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
        border: 2px solid #4169E1;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: SlateGray;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -11px;
    }
    :focus::-webkit-slider-runnable-track {
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
    }
    ::-moz-range-track {
        width: 100%;
        height: 12px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
        border-radius: 4px;
        border: 2px solid #4169E1;
    }
    ::-moz-range-thumb {
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
        border: 2px solid #4169E1;
        height: 30px;
        width: 30px;
        border-radius: 0px;
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
        cursor: pointer;
    }
    ::-ms-track {
        width: 100%;
        height: 12px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    ::-ms-fill-lower {
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
        border: 2px solid #4169E1;
        border-radius: 8px;
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
    }
    ::-ms-fill-upper {
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
        border: 2px solid #4169E1;
        border-radius: 8px;
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
    }
    ::-ms-thumb {
        margin-top: 1px;
        box-shadow: 2px 2px 4px ${props => props.bgSlider? props.bgSlider: '#1C1C1C'};
        border: 2px solid #4169E1;
        height: 30px;
        width: 30px;
        border-radius: 0px;
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
        cursor: pointer;
    }
    :focus::-ms-fill-lower {
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
    }
    :focus::-ms-fill-upper {
        background: ${props => props.bgFaixa? props.bgFaixa: '#D3D3D3'};
    }
`