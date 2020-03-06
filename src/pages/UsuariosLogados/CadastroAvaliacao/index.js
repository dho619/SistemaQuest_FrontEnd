import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag"

import api from '../../../services/api'
import {getUsuarioLogado} from '../../../services/auth'

import { DateToInput, InputToDate } from '../../../utils/FormatDate'
import { setLinkAtual } from '../../../utils/DestacaLink'

import { Div, Container } from "../../../componentsCSS/Form_Cadastro02";

class CadastroAvaliacao extends Component {
  state = {
    ExibirCadastro: true,
    Questionarios: [],
    id: 0,
    desc: '',
    questionario_id: 0,
    questionario: '',
    dataInicio: '',
    dataFim: '',
    hoje: '',
    chave: '',
    error: ''
  }

  async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
      setLinkAtual('cadastroAvaliacao')
      window.scrollTo(0,70)
      this.loadQuest()
      this.loadDates()
  }

  loadDates = () => {
      let hoje = DateToInput(new Date())
      let dataInicio = hoje
      let novaData = new Date()
      novaData.setMonth(novaData.getMonth()+1)//pegar um mes pra frente
      let dataFim = DateToInput(novaData)
      
      this.setState({dataInicio, dataFim, hoje})
  }

  loadQuest = async () => {
      await api.query({
          query: gql`
              query{
                listarQuestionarios { id, nome }
              }
          `,
      }).then(response => {
          this.setState({ Questionarios: response.data.listarQuestionarios });
      }).catch(e => {
          console.log(e)
      })       
  };

  handleSalvar = async e => {
    e.preventDefault();

    const {desc, dataInicio, dataFim, questionario_id} = this.state

    if(!desc || !dataInicio || !dataFim || !questionario_id){
      this.setState({error: 'Preencha todos os campos para continuar!'})
    }else{
      if(questionario_id === 'selecione'){
        this.setState({error: 'Escolha um questionário!'})
      } else{
          let usuario_id = getUsuarioLogado().id
          try {
            api.mutate({
              mutation: gql`
                mutation
                (
                  $desc: String!
                  $dataInicio: String!
                  $dataFim: String!
                  $usuario_id: Int!
                  $questionario_id: Int!
                )
                {
                  novoSchedule(
                    dados:{
                      desc: $desc,
                      dataInicio: $dataInicio, 
                      dataFim: $dataFim,
                      questionario_id: $questionario_id,
                      usuario_id: $usuario_id
                    }
                  )
                {
                  id chave dataInicioFormatada dataFimFormatada questionario { nome } 
                }
                }
            `,
            variables: {
              desc,
              dataInicio: InputToDate(dataInicio),
              dataFim: InputToDate(dataFim),
              questionario_id: parseInt(questionario_id),
              usuario_id
            }
            }).then(response => {
              let result = response.data.novoSchedule

              this.setState({
                              chave: result.chave, 
                              id: result.id,
                              questionario: result.questionario.nome,
                              dataInicio: result.dataInicioFormatada,
                              dataFim: result.dataFimFormatada,
                              error: null, 
                              ExibirCadastro: false
                          })
            }).catch(e => {
              console.log(e)
              this.setState({error: 'Encontramos um problema ao salvar sua avaliação, tente novamente em alguns instantes!'})
            })
          } catch (error) {
            console.log(error)
            this.setState({error: 'Encontramos um problema ao salvar sua avaliação, tente novamente em alguns instantes!'})
          }
      }
    }
    
  }
  
  handleVoltar = async e => {
    e.preventDefault();

    this.setState({desc:''})
    // document.getElementById('Quests').value = 'selecione';
    this.loadDates()
    this.setState({ExibirCadastro: true})
  }

   render() {
    const { ExibirCadastro, Questionarios, questionario, 
            id, desc, error, chave, dataInicio, 
            dataFim, hoje } = this.state
    return (
      <Container>
        {!ExibirCadastro &&
          <Div className='Div_Message'>
            <header>
              <h3>Dados da Avaliação:</h3>
            </header>
            <form className='Formulario' onSubmit={this.handleVoltar}>
              <p className='messageOK'>{`Cadastro realizado com sucesso: Acesse "www.teste.com/avaliacao/${chave}" para poder responder esse questionário!`}</p>
              <p className='messageOK'>Veja as informações da Avaliação:</p>
              <div className="Group">
                <strong>No. Avaliação:</strong>
                <strong>{id}</strong>
              </div>
              <div className="Group">
                <strong>Nome da Avaliação:</strong>
                <strong>{desc}</strong>
              </div>
              <div className="Group">
                <strong>Nome do Questionário:</strong>
                <strong>{questionario}</strong>
              </div>
              <div className="Group">
                <strong>Valido de: </strong>
                <strong>{dataInicio}</strong>
                <strong>Até: </strong>
                <strong>{dataFim}</strong>
              </div>
              <div className="Group">
                <strong>Chave de acesso da avaliação:</strong>
                <strong className='inputTamanhoMin'>{chave}</strong>
              </div>
              <button type='submit'>Digitar Nova Avaliação</button>
            </form>
          </Div>
        }
        {ExibirCadastro &&
          <Div>
            <header>
              <h3>Cadastrar Nova Avaliação:</h3>
            </header>
            <form className='Formulario' onSubmit={this.handleSalvar}>
              {error && <p className='erro'>{error}</p>}
              <div className="Group">
                <strong>Identificação da Avaliação:</strong>
                <input 
                  placeholder='Dê um nome para essa avaliação'
                  value={desc}
                  onChange={e => this.setState({ desc: e.target.value })}
                ></input>
              </div>
              <div className="comboBox">
                <strong>Escolha o Questionário:</strong><br/>
                <select 
                  id='Quests'
                  onChange={e => this.setState({ questionario_id: e.target.value })}
                >
                  <option value='selecione'>{'<selecione>'}</option>
                  {
                    Questionarios.map( Quest => (
                      <option key={Quest.id} value={Quest.id}>{Quest.nome}</option>
                    ))
                  } 
                </select>
              </div>
              <div className="Group">
                <strong>Período de Validade:</strong><br/><br/>
                <div className='DateFields'>
                  <>
                    <strong>De: </strong>
                    <input 
                      className='inputTamanhoMin' 
                      type='date'
                      min={hoje}
                      value={dataInicio}
                      onChange={e => this.setState({ dataInicio: e.target.value })}
                    ></input>
                  </>
                  <>
                    <strong>Até: </strong>
                    <input
                      className='inputTamanhoMin' 
                      type='date'
                      min={dataInicio}
                      value={dataFim}
                      onChange={e => this.setState({ dataFim: e.target.value })}
                    ></input>
                  </>
                </div>
              </div>
              <button type='submit'>Salvar</button>
              
            </form>
          </Div>
        }
      </Container>
    );
  }
}

export default withRouter(CadastroAvaliacao);