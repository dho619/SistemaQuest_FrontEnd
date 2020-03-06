import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag"

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import api from '../../../services/api'
import { descriptografar } from '../../../utils/criptografia'
import { setLinkAtual } from '../../../utils/DestacaLink'
import { Div, Container } from "./style"
import Radiobox from "../../../components/Radiobox"
import Checkbox from "../../../components/Checkbox"
import RangeInput from "../../../components/RangeInput"

class RespondeAval extends Component {
    state = {
        error: '',
        Pesquisa:{},
        ListaPerg: [],
        Respostas: new Map(),
        valorRange: 0,
        valorRadioBox: '',
        valorCheckBox: []
    }

    async componentDidMount() { 
        setLinkAtual('nenhum')
        window.scrollTo(0,110)
        await this.criarNovaPesquisa()
    }

    criarNovaPesquisa = async() => {
        try {
            const obj = descriptografar(this.props.match.params.chave)
            const chave = obj.CH
            const pesquisado_id = obj.PI

            await api.mutate({
                mutation: gql`
                mutation (
                    $pesquisado_id: Int!
                    $chave: String!
                ) {
                    novaPesquisa(
                    dados: {
                        pesquisado_id: $pesquisado_id
                        chave: $chave
                    }
                    ){
                    id chave pesquisado_id questionario {id nome, perguntas { id descricao opcoes { id descricao }}}
                    }
                }
                `,
                variables:{
                    pesquisado_id,
                    chave,
                }
            }).then( response => {
                this.setState({
                    Pesquisa: response.data.novaPesquisa,
                    ListaPerg: response.data.novaPesquisa.questionario.perguntas
                })

                console.log(response.data.novaPesquisa)
            }).catch(e => {
                console.log(e)
            })
        } catch (error) {
            alert('Ops...Achou que os parâmetros passados estão incorretos...')
            window.location.href= `/cadastroPesquisado/`;
        }
        
        
    }

    handleRange = (e, idPerg) => {
        let {Respostas} = this.state
        let valorRange = e.target.value
        Respostas.set(idPerg, valorRange)
        this.setState({Respostas})
    }

    handleText = (e, idPerg) => {
        let {Respostas} = this.state
        let valorText = e.target.value
        if(valorText.length){
            Respostas.set(idPerg, valorText)
        } else {
            Respostas.delete(idPerg)
        }
        this.setState({Respostas})
    }

    handleCheckBox = (e, idPerg, lim=null) => {
        let {Respostas} = this.state
        //Pegando o elemento pai
        let divCheckbox = document.getElementById(`cbGroup${idPerg}`)
        let checkbox = divCheckbox.getElementsByTagName('input') 
        let count = 0
        let valorCheckBox = []
        for (let i = 0; i < checkbox.length; i += 1) {
            if (checkbox[i].checked) {
                count = count + 1
                valorCheckBox.push(checkbox[i].value)
            }
        }
        if(lim && count > lim){
            e.preventDefault()
            valorCheckBox.pop()
            e.checked = false
        }
        if(valorCheckBox.length){
            Respostas.set(idPerg, valorCheckBox.join(', '))
        }else{//se nenhum selecionado, apaga das respostas
            Respostas.delete(idPerg)
        }
        this.setState({Respostas}) 
    }

    handleRadioBox = (e, idPerg) => {
        let {Respostas} = this.state
        //Pegando o elemento pai
        let divRadiobox = document.getElementById(`rdGroup${idPerg}`)
        let radiobox = divRadiobox.getElementsByTagName('input') 

        let valorRadioBox = ''
        for (let i = 0; i < radiobox.length; i += 1) {
            if (radiobox[i].checked) {
                valorRadioBox = radiobox[i].value
            }
        }
        Respostas.set(idPerg, valorRadioBox)
        this.setState({Respostas})
    }

    handleBtFinalizar = async () => {
        let {Respostas, ListaPerg, Pesquisa} = this.state
        // const chave = this.props.match.params.id
        if(ListaPerg.length !== Respostas.size){
            this.setState({error: 'Responda todas as perguntas, para continuar!'})
            return null
        }else{
            this.setState({error: null})
        }
        const RespOrganizadas =  new Map([...Respostas.entries()].sort())

        for(let [key, value] of RespOrganizadas){
            try {
                await api.mutate({
                    mutation: gql`
                        mutation (
                            $pesquisa_id: Int!
                            $pergunta_id: Int!
                            $resposta: String!
                        ) 
                        {
                            novaResposta(
                            dados: {
                                pesquisa_id: $pesquisa_id
                                pergunta_id: $pergunta_id
                                resposta: $resposta
                            }
                            ){
                                id pesquisa_id pergunta_id resposta valor
                            }
                        }
                        `,
                        variables:{
                            pesquisa_id: Pesquisa.id,
                            pergunta_id: key,
                            resposta: value,
                        }
                }).then( response => {
                    console.log(response.data.novaResposta)
                }).catch(e => {
                    console.log(e)
                })
            } catch (error) {
                alert('Teve um problema ao gravar as respostas, por favor, tente novamente!')
                return null
            }
        }
        alert('Obrigado por responder, as perguntas do questionário!')
        window.location.href= `/cadastroPesquisado/`;
    }

    ajustarScroll = () => {
        var element = document.getElementById('Slider')
        element.scrollTop = 0;
        this.setState({error: null})
    }

   render = () => {
    const { ListaPerg, Pesquisa, Respostas, error } = this.state
    let id = 1;
    return (
      <Container>
        <Div>
            <header>
                <h3>Responda as perguntas:</h3>
                {
                    Pesquisa.questionario &&
                    <div className='InformacoesQuest'>
                        <p>Chave: {Pesquisa.chave}</p>
                        <p>Questionario: {Pesquisa.questionario.nome}</p>
                    </div>
                }
            </header>
            <CarouselProvider
                naturalSlideWidth={'100px'}
                naturalSlideHeight={'100px'}
                dragEnabled={false}
                touchEnabled={false}
                totalSlides={ListaPerg.length}
            >
                <div onClick={() => this.ajustarScroll()}>{/*Para ativar o onClick*/}
                    {/*SUPORTA numero limitado de perguntas */}
                    <DotGroup className='navegadores' dotNumbers={true}/>
                </div>
                <Slider className='Slider' id='Slider'>
                    {
                        ListaPerg.map(p => (
                            <Slide key={p.id} className='Slide'>
                                <div className="QuestionField" >
                                    <div className='perguntas' align="justify">
                                        <strong className='titulo'>Questão {id++}:</strong>
                                        <strong className='pergunta'> 
                                        { p.descricao }
                                        </strong>
                                    </div>{/*fim da div pergunta*/}
                                    <div className='respostas'>
                                        {(id-1)%2===0 && (id-1)!==6 && 
                                            <>
                                                <Radiobox 
                                                    chave={p.id} 
                                                    opcoes={p.opcoes}
                                                    id={`rdGroup${p.id}`}
                                                    onClick={e => this.handleRadioBox(e, p.id)}
                                                />
                                                <strong>Id da opção selecionada: {Respostas.get(p.id)}</strong>
                                            </> 
                                        }
                                        {(id-1)%2===1 && (id-1)!==5 &&
                                            <>
                                                <Checkbox 
                                                    chave={p.id+99} 
                                                    opcoes={p.opcoes}
                                                    id={`cbGroup${p.id}`}
                                                    onClick={e => this.handleCheckBox(e, p.id, 2)}
                                                />
                                                <strong>Id das opções selecionadas: {Respostas.get(p.id) && Respostas.get(p.id)}</strong>
                                            </>
                                        }
                                        {(id-1)===6 && 
                                            <>
                                                <RangeInput 
                                                    min={0} 
                                                    max={100} 
                                                    step={20} 
                                                    className= 'myInputRange'
                                                    id='myInputRange'
                                                    onChange={e => this.handleRange(e, p.id)}
                                                />
                                                <strong>Sua Avaliação: {Respostas.get(p.id)}%</strong>
                                            </>
                                        }
                                        {(id-1)===5 &&
                                            <textarea 
                                                className='myTextArea' 
                                                rows='5'
                                                placeholder='Digite aqui sua resposta:'
                                                onChange={e => this.handleText(e, p.id)}
                                            />
                                        }
                                    </div>{/*fim da div respostas*/}
                                </div>{/*fim da div QuestionFields*/}
                            </Slide>   
                        ))
                    }
                </Slider>
                {error && <p className='erro'>{error}</p>}
                <div className='navigationButtons'>
                    <ButtonBack 
                        className='myButton'
                        onClick={() => this.ajustarScroll()}
                    >
                        Anterior
                    </ButtonBack>

                    <button 
                        className='btFinalizar'
                        onClick={() => this.handleBtFinalizar()}
                    >
                        Finalizar
                    </button>

                    <ButtonNext 
                        className='myButton'
                        onClick={() => this.ajustarScroll()}
                    >
                        Próxima
                    </ButtonNext>
                </div>
            </CarouselProvider>  
        </Div>
      </Container>
    );
  }
}

export default withRouter(RespondeAval);