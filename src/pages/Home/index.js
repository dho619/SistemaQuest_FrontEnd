import React, { Component } from "react";
import Form from './styles'
import { setLinkAtual } from '../../utils/DestacaLink'

export default class Home extends Component {
  componentDidMount(){
    setLinkAtual('nenhum')
  }
  
  render() {
    return (
        <Form> <h2>Bem Vindo!!! Caso não esteja logado, faça o seu login para poder adquirir um de nossos planos!</h2> </Form>
    )
  }
}