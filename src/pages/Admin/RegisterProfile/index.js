import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag"

//Imports de outros arquivos
import api from "../../../services/api";
import { setLinkAtual } from '../../../utils/DestacaLink'
import Logo from "../../../assets/Logo.png";
import { Form, Container } from '../../../componentsCSS/Form_Cadastro01';

class RegisterProfile extends Component {
  state = {
    nome: "",
    rotulo: "",
    message: ""
  };
  async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
      setLinkAtual('RegisterProfile')
  }
  //Cadastrar novo Usuario comum
  handleSignUp = async e => {
    e.preventDefault();
    const { nome, rotulo } = this.state;
    if (!nome || !rotulo) {
      this.setState({ message: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        api.mutate({
          mutation: gql`
            mutation
            (
              $nome: String!
              $rotulo: String!
            )
            {
              novoPerfil(
                dados:{
                  nome: $nome,
                  rotulo: $rotulo, 
                }
              )
            {
              id nome rotulo  
            }
            }
        `,
        variables: {
          nome,
          rotulo,
        }
        }).then(resultado => {
          this.setState({ message: null})
          // this.setState({ nome: null})
          // this.setState({ rotulo: null})
          this.setState({ message: `Perfil "${rotulo}" cadastrado com sucesso!` });
        }).catch(e =>  {
          console.log(e)
          this.setState({ message: 'Nome já Cadastrado!' });}
          )
      } catch (err) {
        console.log(err);
        this.setState({ message: "Ocorreu um erro ao registrar esse rotulo. T.T" });
      }
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo Astek" />
          {this.state.message && <p className='erro'>{this.state.message}</p>}
          <input
            type="text"
            placeholder="Nome"
            onChange={e => this.setState({ nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rotulo"
            onChange={e => this.setState({ rotulo: e.target.value })}
          />
          <button type="submit">Cadastrar Perfil</button>
          <hr />
        </Form>
      </Container> 
    );
  }
}

export default withRouter(RegisterProfile);