import React, { Component } from 'react';
 
import {DivCheckbox} from './style'

export default class CheckBox extends Component{   
    render() {
        return (
            <DivCheckbox id={this.props.id}>
                {
                    this.props.opcoes.map(op => (
                        <div key={op.id} className="cbGroup">
                            <input type="checkbox" id={`opcao${this.props.chave}_${op.id}`}
                                    name={`CBopcao${this.props.chave}`} 
                                    value={op.id}//apenas temporario
                                    onClick={this.props.onClick}
                            />
                            <label htmlFor={`opcao${this.props.chave}_${op.id}`}>
                                {op.descricao}
                            </label>
                        </div>
                    ))
                }
            </DivCheckbox>          
        );
    }
}