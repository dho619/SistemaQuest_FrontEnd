import React, { Component } from "react"
import gql from "graphql-tag"

import api from '../../../services/api'
import { getUsuarioLogado } from '../../../services/auth';
import { setLinkAtual } from '../../../utils/DestacaLink'
import Div from './styles'

export default class QuestsPlano extends Component {
    state = { //state e um objeto
        id: 0,
        Questionarios: [],
        page: 0,
        exibirPerg : new Map(),
        exibirOpcPerg : new Map(),
        QuestInfo: {},
        Usuario: {}
    }

    //componentDidMount executa assim que e criado a pagina
    async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        let id = parseInt(this.props.match.params.id);
        setLinkAtual('nenhum')//nenhum e para nao destacar nenhum link
        let Usuario = await getUsuarioLogado()
        this.setState({id, Usuario})
        this.loadQuest();
    }

    loadQuest = async (page = 0) => {
        const { id, Usuario } = this.state
        await api.query({
            query: gql`
                query(
                    $id: Int
                    $usuario_id: Int
                )
                {
                    plano(
                        filtro: { id: $id usuario_id: $usuario_id }
                    ){
                        questionarios { id, nome, perguntas { id descricao opcoes { id descricao }}}
                    }
                }
            `,
            variables: {
                id,
                usuario_id: Usuario.id,
            }
        }).then(response => {
            //Simular uma paginasao, ate eu coloca-la no backend ou retirar
            var Quests = []
            var aux = []
            for(let quest of response.data.plano.questionarios){
                if(aux.length < 10){
                    aux.push(quest)
                }else {
                    Quests.push(aux)
                    aux = []
                    aux.push(quest)
                }
            }
            if (aux.length > 0) Quests.push(aux)
            this.setState({ Questionarios: Quests[page], QuestInfo: {pages: Quests.length-1}});
        }).catch(e => {
            console.log(e)
        })       
    };

    
    exibirPerguntas = (id) => {
        let { exibirPerg } = this.state
        try {
            let exibir = exibirPerg.get(id)
            if(exibir){
                exibirPerg.set(id, false)
            } else {
                exibirPerg.set(id, true)  
            }
        } catch (error) {
            exibirPerg.set(id, true)            
        }
        this.setState({exibirPerg})
    }
    
    exibirOpcPerg = (id) => {
        let { exibirOpcPerg } = this.state
        try {
            let exibir = exibirOpcPerg.get(id)
            if(exibir){
                exibirOpcPerg.set(id, false)
            } else {
                exibirOpcPerg.set(id, true)  
            }
        } catch (error) {
            exibirOpcPerg.set(id, true)            
        }
        this.setState({exibirOpcPerg})
    }

    render(){
        const { Questionarios, page, QuestInfo} = this.state; //desistruturando
        return (
            <Div>
                <div className='header'>
                    <h1>Questionários do plano de id {this.state.id}:</h1>
                </div>
                {//aqui codigo javascript, apos "=> (" volta a ser html
                Questionarios.map(questionario => (
                            <article className= 'blocos' key={questionario.id}>
                                <strong>ID: {questionario.id}</strong>
                                <br/>
                                <strong>Nome do Questionário: {questionario.nome}</strong>
                                <br/>
                                <strong>Perguntas do Questionário: <button className='exibir' onClick={() => {this.exibirPerguntas(questionario.id)}}>Mostrar</button> </strong>
                                <br/>
                                <ul>
                                {   this.state.exibirPerg.get(questionario.id) &&
                                    questionario.perguntas.map(pergunta => (
                                    <article className= 'blocos' key={pergunta.id}>
                                        <br/>
                                        <strong>Pergunta: {pergunta.descricao}</strong>
                                        <br/>
                                        <strong> Opções: <button className='exibir' onClick={() => {this.exibirOpcPerg(pergunta.id)}}>Mostrar</button></strong>
                                        <br/>
                                        <ul>
                                        {   this.state.exibirOpcPerg.get(pergunta.id) &&
                                            pergunta.opcoes.map(opcao => (
                                            <article className='opcoes' key={opcao.id}>
                                                <br/>
                                                <li>{opcao.descricao}</li>
                                                <br/>
                                            </article> 
                                            ))
                                        }
                                        </ul>
                                    </article> 
                                    ))
                                }
                                </ul>                                
                            </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === QuestInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </Div>
        )
    }
}