import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag"

//Imports de outros arquivos
import api from "../../../services/api";
import { setLinkAtual } from '../../../utils/DestacaLink'
import Logo from "../../../assets/Logo.png";

//CSS
import { Label } from "./styles";
import { Form, Container } from "../../../componentsCSS/Form_Cadastro01";

class SignupAdmin extends Component {
  state = {
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    senha2: "",
    perfis: [],
    perfil: "",
    menssage: null
  };

  componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
    setLinkAtual('signupAdmin')
    this.carregaPerfis()
  }
  carregaPerfis = async () => {
    await api.query({
      query: gql`{perfis { id nome rotulo }}`
    }).then(resultado => {
        this.setState({perfis: resultado.data.perfis})
        this.erros = null
    }).catch(e => {
        this.erros = e
    })
  }
  //Cadastrar novo Usuario pela conta admin
  handleSignUp = async e => {
   
    e.preventDefault();
    const { nome, telefone, email, senha, senha2, perfil } = this.state
    if (!nome || !telefone || !email || !senha|| !senha2|| !perfil || perfil === 'selecione' ) {
      this.setState({ menssage: "Preencha todos os dados para se cadastrar" })
    } else if (senha !== senha2){
      this.setState({ menssage: "O campo de senha e confirmar senha, estão diferentes!" });
    } else {
      try {
        const perfis = [{nome: perfil}]//como o frontend por ora so aceita um perfil...
        api.mutate({
          mutation: gql`
            mutation
            (
              $nome: String!
              $email: String!
              $telefone: String!
              $senha: String!
              $perfis: [PerfilFiltro]
            )
            {
              novoUsuario(
                dados:{
                  nome: $nome,
                  telefone: $telefone,
                  email: $email, 
                  senha: $senha,
                  perfis: $perfis
                }
              )
            {
              id nome email telefone
              ativo created_at updated_at
              perfis { rotulo }
            }
            }
        `,
        variables: {
          nome,
          email,
          telefone,
          senha,
          perfis,
        }
        }).then(resultado => {
          console.log(resultado.data.novoUsuario)
          this.setState({ nome: '', telefone: '', email: '', senha: '', senha2: ''})
          this.setState({ menssage: 'Usuario Cadastrado com sucesso!'})
        }).catch(e =>  {
          console.log(e)
          this.setState({ menssage: 'Email Já Cadastrado!' })}
          )
      } catch (e) {
        console.log(e);
        this.setState({ menssage: "Ocorreu um erro ao registrar o novo usuario. T.T" });
      }
    }
  }

  render() {
    const {perfis, nome, email, telefone, senha, senha2} = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo" />
          {this.state.menssage && <p className='erro'>{this.state.menssage}</p>}
          <input
            type="text"
            value={nome}
            placeholder="Nome Completo"
            onChange={e => this.setState({ nome: e.target.value })}
          />
          <input 
            type="tel" 
            value={telefone}
            placeholder="Telefone ex: 35 99999-8888"
            title="Formato: 35 99999-8888"
            pattern="^\d{2} \d{4,5}-\d{4}$"
            onChange={e => this.setState({ telefone: e.target.value })}
           />
          <input
            type="email"
            value={email}
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            value={senha}
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <input
            type="password"   
            value={senha2}
            placeholder="Confirmar Senha"
            onChange={e => this.setState({ senha2: e.target.value })}
          />
          <Label>
            <p>Escolha o perfil desse usuario:</p>
            <select onChange={e => this.setState({ perfil: e.target.value })}>
            <option value='selecione'>{'<selecione>'}</option>
              {
                perfis.map( perfil => (
                  <option key={perfil.id} value={perfil.nome}>{perfil.rotulo}</option>
                ))
              } 
            </select>
          </Label>
          <button type="submit">Cadastrar Novo Usuario</button>
          <hr /> 
        </Form>
      </Container> 
    );
  }
}

export default withRouter(SignupAdmin);