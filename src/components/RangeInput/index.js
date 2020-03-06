import React, { Component } from 'react';
 
import {Range} from './style'

export default class RangeInput extends Component{
 
    render() {
        return (
            <Range
                type="range" 
                min={this.props.min} 
                max={this.props.max} 
                step={this.props.step}
                defaultValue={0}
                className= {this.props.className}
                id= {this.props.id}
                onChange={this.props.onChange}
                /*ESTILIZACOES*/
                bgSlider= {this.props.bgSlider}
                bgFaixa= {this.props.bgFaixa}
            />
           
        );
    }
}