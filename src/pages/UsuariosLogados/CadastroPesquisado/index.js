import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag"

import api from '../../../services/api'
import { getUsuarioLogado, } from '../../../services/auth'
import { Div, Container } from "../../../componentsCSS/Form_Cadastro02";
import { setLinkAtual } from '../../../utils/DestacaLink'
import { criptografar } from '../../../utils/criptografia'

class CadastroPesquisado extends Component {
  state = {
    error: '',
    error2: '',
    nome: '',
    telefone: '',
    email: '',
    chave: '',
    chaveTemp: '',
    avaliacoes: [],
    questionario: {}
  }

  componentDidMount() { 
    window.scrollTo(0,70)
    setLinkAtual('cadastroPesquisado')
    this.loadAvaliacoes()
  }

  loadAvaliacoes = async () => {
    const { id } = await getUsuarioLogado()
    api.query({
      query: gql`
        query(
          $id: Int
        ){
          schedulesUsuario(filtro: {id: $id}){id chave dataInicio dataFim dataInicioFormatada dataFimFormatada questionario { nome }}
        }
      `,
      variables: {
        id,
      }
    }).then(response => {
      let avaliacoes = response.data.schedulesUsuario
      this.setState({avaliacoes})
    }).catch(e => console.log(e))
  }

  handleContinuar = async e => {
    e.preventDefault();
    const {nome, email, telefone, chave, chaveTemp } = this.state

    if(!nome || !email || !telefone || !chaveTemp){
      this.setState({error: 'Preencha todos os campos para continuar!', error2: null})
    } else if(!chave){
      this.setState({error: 'Digite uma chave correta para o questionário!', error2: null})
    } else{

      api.mutate({
        mutation: gql`
          mutation (
            $nome: String!
            $telefone: String!
            $email: String!
          ) {
            novoPesquisado(
              dados: {
                nome: $nome
                email: $email
                telefone: $telefone
              }
            ){
              id nome email telefone inicioAvaliacao
            }
          }
        `,
        variables:{
          nome,
          email,
          telefone
        }
      }).then( response => {
        let obj={CH:chave,PI:response.data.novoPesquisado.id}

        window.location.href= `/RespondeAval/${criptografar(obj)}`;
      }).catch(e => {
        console.log(e)
    })
    }
  }

  verificaChave = () => {
    const { chaveTemp, avaliacoes } = this.state
    var chave = chaveTemp.toUpperCase()
    var avaliacao = avaliacoes.filter(av => av.chave === chave)

    if(avaliacao.length){//se existe essa chave
      let dataFim = new Date(avaliacao[0].dataFim)
      let dataInicio = new Date(avaliacao[0].dataInicio)

      //caso a primeira forma de erro na hora de criar a data
      if (isNaN(dataFim)) dataFim = new Date(parseInt(avaliacao[0].dataFim))
      if (isNaN(dataInicio)) dataInicio = new Date(parseInt(avaliacao[0].dataInicio))

      if (dataFim < new Date()) {
        this.setState({error2: `Chave "${chave}" expirada em ${avaliacao[0].dataFimFormatada}!`,
                       chave: null, error: null})
      } 
      else if (dataInicio > new Date()) {
        this.setState({error2: `Chave "${chave}", terá validade apenas a partir de ${avaliacao[0].dataInicioFormatada}!`,
                       chave: null, error: null})
      } 
      else {
        this.setState({chave: chave, error2: null, questionario: avaliacao[0].questionario})
      }
    }
    else {
      this.setState({error2: `Chave "${chave}" é inválida!`,
                     chave: null, error: null})
    } 
  }

   render() {
    const { telefone, chaveTemp, nome, email, error, error2, chave, questionario } = this.state
    return (
      <Container>
        <Div>
          <header>
            <h3>Preencha os dados para responder o questinario:</h3>
          </header>
          <form className='Formulario' onSubmit={this.handleContinuar}>
            {error && <p className='erro'>{error}</p>}
            <div className="Group">
              <strong>Chave de Acesso:</strong>
              <input 
                onBlur={this.verificaChave}
                value={chaveTemp}
                style={{"textTransform": "uppercase"}}
                onChange={e => this.setState({ chaveTemp: e.target.value })}
                placeholder='Chave de acesso do Questionário'
              ></input>
            </div>
            {error2 && <p className='erro'>{error2}</p>}
            {chave && <p className='messageOK'>{questionario.nome}</p>}
            <div className="Group">
              <strong>Identificação:</strong>
              <input 
                value={nome}
                placeholder='Seu Nome'
                onChange={e => this.setState({ nome: e.target.value })}
              ></input>
            </div>
            <div className="Group">
              <strong>Formas de Contato:</strong>
              <input
                type='email'
                value={email}
                placeholder='Digite seu melhor email'
                onChange={e => this.setState({ email: e.target.value })}
              ></input>
              <input 
                type="tel" 
                value={telefone}
                placeholder="Seu telefone ex: 35 99999-8888"
                title="Formato: 35 99999-8888"
                pattern="^\d{2} \d{4,5}-\d{4}$"
                onChange={e => this.setState({ telefone: e.target.value })}
              />
            </div>

            <button type='submit'>Continuar</button>
            
          </form>
        </Div>
      </Container>
    );
  }
}

export default withRouter(CadastroPesquisado);