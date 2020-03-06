import React, { Component } from 'react';
 
import {DivRadiobox} from './style'

export default class CheckBox extends Component{
 
    render() {
        return (
            <DivRadiobox id={this.props.id}>
                {
                    this.props.opcoes.map(op => (
                        <div key={op.id} className="radiobtn" >
                            <input type="radio" id={`opcao${this.props.chave}_${op.id}`}
                                    name={`CBopcao${this.props.chave}`} 
                                    value={op.id}
                                    onClick={this.props.onClick}
                            />
                            <label htmlFor={`opcao${this.props.chave}_${op.id}`}>
                                {op.descricao}
                            </label>
                        </div>
                    ))
                }
            </DivRadiobox>          
        );
    }
}