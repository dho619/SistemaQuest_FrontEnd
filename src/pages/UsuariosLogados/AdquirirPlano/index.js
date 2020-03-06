import React, { Component } from "react"
import { Link } from 'react-router-dom'

import Div from './styles'
import { setLinkAtual } from '../../../utils/DestacaLink'

export default class AdquirirQuest extends Component {
  state = { //state e um objeto
    essencial: [],
    basico: [],
    completo: [],
  }

  //componentDidMount executa assim que e criado a pagina
  async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
      setLinkAtual('adquirirPlano')
      this.loadQuest();
  }

  loadQuest = async () => {
      let essencial = [{id: 1, nome: 'DISC'}, {id: 2, nome: 'Chefe ou Líder'}, {id: 3, nome: 'Estilo de Liderança'}]       
      let basico = [{id: 4, nome: 'MBTI - Completo'}, {id: 5, nome: 'Inteligência Emocional'}, {id: 6, nome: 'Gestão de Tempo'}]      
      let completo = [{id: 7, nome: 'Motivação'}, {id: 8, nome: 'Nível Negociador'}, {id: 9, nome: 'Estilo de negociação'}]      
      
      this.setState({essencial, basico, completo})
  };

  render() {
    const { essencial, basico, completo } = this.state;
    return (
        <Div>
          <h1>
            Qual dos 3 planos você deseja?
          </h1>
          <div className='planos'>
            <div className='esquerda'>
              <header>
                <h3>Essencial</h3>
              </header>
              <div className='body'>
                <h4>Grupo 1:</h4>
                {
                  essencial.map(quest => (
                    <article key={quest.id}>
                      <p>{quest.nome}</p>
                    </article>
                  ))
                }
              </div>
              <div className='footer'>
                <div className='centraliza'>                
                  <h2>R$ 9,99/mês</h2>
                </div>
                <div className='centraliza'>
                  <Link to='/' className='LkEscolher'>Escolho: Essencial</Link>
                </div>
              </div>

            </div> {/*Fim da classe esquerda*/}

            <div className='centro'>
              <header>
                <h3>Básico</h3>
              </header>
              <div className='body'>
                <h4>Grupo 1:</h4>
                {
                  essencial.map(quest => (
                    <article key={quest.id}>
                      <p>{quest.nome}</p>
                    </article>
                  ))
                }
                <br/>
                <h4>Grupo 2:</h4>
                {
                  basico.map(quest => (
                    <article key={quest.id}>
                      <p>{quest.nome}</p>
                    </article>
                  ))
                }
              </div>
              <div className='footer'>
                <div className='centraliza'>
                  <h2>R$ 99,99/mês</h2>
                </div>
                <div className='centraliza'>
                  <Link to='/' className='LkEscolher'>Escolho: Basico</Link>
                </div>
              </div>
            </div> {/*Fim da classe centro*/}


            <div className='direita'>
              <header>
                <h3>Completo</h3>
              </header>
              <div className='body'>
              <h4>Grupo 1:</h4>
                {
                  essencial.map(quest => (
                    <article key={quest.id}>
                      <p>{quest.nome}</p>
                    </article>
                  ))
                }
                <br/>
                <h4>Grupo 2:</h4>
                {
                  basico.map(quest => (
                    <article key={quest.id}>
                      <p>{quest.nome}</p>
                    </article>
                  ))
                }
                <br/>
                <h4>Grupo 3:</h4>
                {
                  completo.map(quest => (
                    <article key={quest.id}>
                      <p>{quest.nome}</p>
                    </article>
                  ))
                }  
              </div>
              <div className='footer'>
                <div className='centraliza'>
                  <h2>R$ 299,99/mês</h2>
                </div> 
                <div className='centraliza'>
                  <Link to='/' className='LkEscolher'>Escolho: Completo</Link>
                </div>             
              </div>
            </div>{/*Fim da classe direita*/}

          </div> {/*Fim da classe planos*/}

        </Div>

    )
  }
}