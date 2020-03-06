import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import gql from "graphql-tag"

//Imports de outros arquivos
import api from "../../services/api";
import { login } from "../../services/auth";
import Logo from "../../assets/Logo.png";
import { setLinkAtual } from '../../utils/DestacaLink'

//CSS
import { Form, Container } from "../../componentsCSS/Form_Cadastro01";

class SignUp extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senha2: "",
    telefone: "",
    error: ""
  };

  componentDidMount(){
    setLinkAtual('signUp')
    window.scrollTo(0,3)
  }

  //Cadastrar novo Usuario comum
  handleSignUp = async e => {
    e.preventDefault();
    const { nome, telefone, email, senha, senha2 } = this.state;
    if (!nome || !telefone || !email || !senha || !senha2) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else if (senha !== senha2){
      this.setState({ error: "O campo de senha e confirmar senha, estão diferentes!" });
    } else {
      try {
        api.mutate({
          mutation: gql`
            mutation
            (
              $nome: String!
              $telefone: String!
              $email: String!
              $senha: String!
            )
            {
              registrarUsuario(
                dados:{
                  nome: $nome,
                  telefone: $telefone,
                  email: $email, 
                  senha: $senha
                }
              )
            {
              id nome email 
              ativo created_at updated_at
              perfis { rotulo }
            }
            }
        `,
        variables: {
          nome,
          email,
          telefone,
          senha
        }
        }).then(resultado => {
          login(resultado.data.registrarUsuario)
          this.setState({ error: null})

          window.location.href = "/adquirirPlano";
        }).catch(e =>  {
          console.log(e)
          this.setState({ error: 'Email Já Cadastrado!' });}
          )
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p className='erro'>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome Completo"
            onChange={e => this.setState({ nome: e.target.value })}
          />
          <input 
            type="tel" 
            placeholder="Telefone ex: 35 99999-8888"
            title="Formato: 35 99999-8888"
            pattern="^\d{2} \d{4,5}-\d{4}$"
            onChange={e => this.setState({ telefone: e.target.value })}
           />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            title="Enviaremos um email de confirmação para esse email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <input
            type="password"            
            placeholder="Confirmar Senha"
            onChange={e => this.setState({ senha2: e.target.value })}
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link 
            to="/signIn"
          >
            Fazer login
          </Link>
        </Form>
      </Container> 
    );
  }
}

export default withRouter(SignUp);